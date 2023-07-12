import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import getConfig from 'next/config'
import { NextApiRequest, NextApiResponse } from 'next';


export default async function signin(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  const { serverRuntimeConfig } = getConfig()

  const usrname = req.body.username;
  const pword = req.body.password;

  try {
      const user = await prisma.user.findUnique({
        where: {
          username: usrname,
        },
      })
      if (!user?.username) {
        return res.status(401).json({ message: 'Username not found.' });

      }
        let token = jwt.sign({ email: user?.email, _id: user?.id != null ? user?.id : "" }, serverRuntimeConfig.secret, {expiresIn: '55s'});
        const passwordValid = await bcrypt.compare(pword,  user?.password != null ? user?.password : "")

        if (!passwordValid) {
          return res.status(401).json({ message: 'Invalid Password.' });
        }
        
        return res.status(200).json({ 
          statuscode: 200,
          message: 'Successful login.', 
          id: user?.id,
          firstname: user?.firstname,
          lastname: user?.lastname,
          email: user?.email,
          username: user?.username,
          isactivated: user?.isactivated,
          isblocked: user?.isblocked,
          profilepic: user?.profilepic,
          qrcodeurl: user.qrcodeurl,
          token: token});
      
      } catch(e) {
        return res.status(404).json({ statuscode: 404, message: "Username not found, please register first."});
      }
}