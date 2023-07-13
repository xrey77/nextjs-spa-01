import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import speakeasy from 'speakeasy';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    let fname = req.body.firstname;
    let lname = req.body.lastname;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let usrname = req.body.username;
    let passwd = bcrypt.hashSync(req.body.password, 10);

    const umail = await prisma.user.findUnique({
        where: {
          email: email,
        },
      })

      if (umail !== null) {
        res.status(200).json({ 
            statuscode: 201,
            message: 'Email Address is taken.'
        });           
      }


    const uname = await prisma.user.findUnique({
        where: {
          username: usrname,
        },
      })
      if (uname !== null) {
        res.status(200).json({ 
            statuscode: 201,
            message: 'Username is taken.'
        });           
      }
      // Create Secret
      const secret =speakeasy.generateSecret({
        name: uname?.id
      });

    await prisma.user.create({
        data: {
            lastname: lname,
            firstname: fname,
            email: email,
            mobile: mobile,
            username: usrname,
            password: passwd,
            secretkey: secret.base32,
            qrcodeurl: "",
            profilepic: "/users/pix.jpg"
        }
    });
    
    res.status(200).json({ 
         statuscode: 200,
         message: 'You have registered successfully.'
     });
  }