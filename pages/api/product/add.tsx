import { PrismaClient } from "@prisma/client";
// import { NextApiRequest, NextApiResponse } from 'next';

export default async function add(req: any, res: any) {
    const prisma = new PrismaClient();
    const data: any = await req.body;
    let desc: any = data.descriptions;
    let qty: any = data.qty;
    let unit: any = data.unit;
    let cost: any = data.cost_price;
    let sell: any = data.sell_price;
    let sale: any = data.sale_price;
    let alert: any = data.alert_level;
    let critical: any = data.critical_level;
    let prodpic: any = data.prod_pic;
    try {

        const description = await prisma.product.findUnique({
            where: {
              descriptions: desc,
            },
          })
          if (description !== null) {
            res.status(200).json({ statuscode: 201,message: 'Description is taken.'});           
          }

        await prisma.product.create({
            data: {
                descriptions: desc,
                qty: qty,
                unit: unit,
                cost_price: cost,
                sell_price: sell,
                sale_price: sale,
                alert_level: alert,
                critical_level: critical,
                prod_pic: prodpic
            }
        });
        res.status(200).json({statuscode: 200, message: "New products has been added."});
    } catch(e: any) {
        res.status(404).json({statuscode: 200, message: e.message});
    }
    
}