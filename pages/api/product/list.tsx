// import { PrismaClient } from "@prisma/client";
import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function list(req: NextApiRequest, res: NextApiResponse) {
    // const prisma = new PrismaClient();
    const { query } = req;
    try {

        const recs = await prisma.product.findMany();
        let perpage: any = 5;
        let totrecs: any = recs.length;
        let totpage: any = Math.ceil(totrecs / perpage);
        let page: any = query.page;
        let offset = (page -1) * perpage;

        const products = await prisma.product.findMany({
            skip: offset,
            take: perpage
        });
        res.status(200).json({totpages: totpage, page: parseInt(page), products: products});    

    } catch(e: any) {
        res.status(404).json({statuscode: 404, message: e.message});
    }
}