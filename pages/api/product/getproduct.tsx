import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getproduct(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    const { query } = req;
    try {

        const product = await prisma.product.findUnique({
            where: {
                id: query.id?.toString()
            }
        })
        return res.status(200).json({statuscode: 200, message: 'Product has been retrieved.', product: product});
        
    } catch(e: any) {
        console.log(e);
        res.status(404).json({statuscode: 404, message: "Product ID not found."});    
    }    
    
}