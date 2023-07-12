import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';
import speakeasy from'speakeasy';

export default async function validatetoken(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();
    try {
        const user = await prisma.user.findUnique({
          where: {
            id: req.body.id,
          },
        })
        if (!user?.id) {
          return res.status(401).json({ message: 'Use ID not found.' });
  
        }
        
        var tokenCode = req.body.otpcode;
        var secretCode = user.secretkey;
        var verified = speakeasy.totp.verify({
          secret: secretCode,
          encoding: 'base32',
          token: tokenCode,
          window: 1
        })
        if (verified) {
            return res.status(200).json({ statuscode: 200,message: 'Validation Successfull.', username: user.username});
        } else {
            return res.status(404).json({ statuscode: 404,message: 'Invalid OTP Code.'});
        }

    } catch(e: any) {
        return res.status(404).json({ statuscode: 404, message: e.message});
    }


}