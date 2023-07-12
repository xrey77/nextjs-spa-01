import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getbyid(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    const { query } = req;
    try {

        const user = await prisma.user.findUnique({
            where: {
                id: query.id?.toString()
            }
        })
        return res.status(200).json(user);
        
    } catch(e: any) {
        console.log(e);
        res.status(404).json({statuscode: 404, message: "User ID not found."});    
    }

}