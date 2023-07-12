import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function deletebyid(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    const { query } = req;
    try {
        const user = await prisma.user.delete({
            where: {
                id: query.id.toString()
            }
        })
        res.status(200).json({statuscode: 200, message: "User ID has been deleted."})
    } catch(e) {
        res.status(4004).json({statuscode: 400, message: "User Id not found."});
    }
}