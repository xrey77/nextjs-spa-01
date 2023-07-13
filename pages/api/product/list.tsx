import { PrismaClient } from '@prisma/client';
// import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function list(req: NextApiRequest, res: NextApiResponse) {
    const { query } = req;
    try {

        // let perpage: any = 5;
        // let recs = await prisma.product.findMany();
        // let totrecs: any = recs?.length;
        // let totpage: any = Math.ceil(totrecs / perpage);
        // let page: any = query?.page;
        // let offset = (page -1) * perpage;

        let perpage: any = 5;
        let offset: any = 0;
        let totpage: any = 0;
        let page: any = 0;
        await prisma.product.findMany()
        .then((recs) => recs?.json())
        .then((json) => {
            let totrecs: any = json.length;
            totpage = Math.ceil(totrecs / perpage);
            page = query?.page;
            offset = (page -1) * perpage;
        })

        const products = await prisma.product.findMany({
            skip: offset,
            take: perpage
        });
        res.status(200).json({totpages: totpage, page: parseInt(page), products: products});    

    } catch(e: any) {
        res.status(404).json({statuscode: 404, message: e.message});
    }
}