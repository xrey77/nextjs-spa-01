import { PrismaClient } from "@prisma/client";

export default async function getall(req: any, res: any) {
    const prisma = new PrismaClient();
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);    
    } catch(e: any) {
        res.status(494).json({statuscode: 404, message: e.message});
    }
}