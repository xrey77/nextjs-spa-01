import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';
import speakeasy from 'speakeasy';
import QRCode from "qrcode";

export default async function activatemfa(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    var qrcodebase64: any;
    if (req.body.isactivate === true) {

        const secret =speakeasy.generateSecret({
            name: req.body.fullname,        
        });
    
        QRCode.toDataURL(secret.otpauth_url || '', async function(err: any,data: any) {

            await prisma.user.update({
                where: {
                    id: req.body.id
                },
                data: {
                    qrcodeurl: data,
                    secretkey: secret.base32,
                }
            });

        });

        return res.status(200).json({statuscode: 200, message: "2-Factor Authenticator has been activated."})
        
    } else {
        let qr: any = '';
        await prisma.user.update({
            where: {
                id: req.body.id
            },
            data: {
                qrcodeurl: qr,
            }
        });
        res.status(200).json({statuscode: 200, message: "2-Factor Authenticator has been de-activated."})

    }

}