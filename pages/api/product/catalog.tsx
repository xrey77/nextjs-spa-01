import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function catalog(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    
}