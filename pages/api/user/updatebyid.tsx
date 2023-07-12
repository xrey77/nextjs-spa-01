import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

export default async function updatebyid(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    // const { query } = req;
    
    try {
        if (req.body.password !== null) {
        
            await prisma.user.update({
                where: {
                    id: req.body.id.toString()
                },
                data: {
                    lastname: req.body.lastname,
                    firstname: req.body.firstname,
                    mobile: req.body.mobile,
                    password: bcrypt.hashSync(req.body.password, 10)
                }
            });

        } else {

            await prisma.user.update({
                where: {
                    id: req.body.id,
                },
                data: {
                    lastname: req.body.lastname,
                    firstname: req.body.firstname,
                    mobile: req.body.mobile                
                }
            })
            res.status(200).json({statuscode: 200, message: "Profile was updated successfully."});

        }
    } catch(e) {
        res.status(404).json({statuscode: 404, message: "User ID not found."});
    }

}