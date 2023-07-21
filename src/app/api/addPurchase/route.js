import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import config from '../../../config'

const prisma = new PrismaClient()

export async function POST(req) {
    let { Price } = config.Medicines
    let { primaryKey: invoicePrimaryKey, SubTotal } = config.Invoices
    let { InvoiceID, MedicineID, Quantity, FormerPrice} = config.Purchases

    try{
        let { receipt, netTotal} = await req.json();

        let rows = []
        Object.keys(receipt).map((key) => {
            rows.push({
                [MedicineID] : parseInt(key),
                [Quantity] : receipt[key]['quantity'],
                [FormerPrice] : receipt[key][Price]
            })
        })


        let transaction = await prisma.$transaction(async (tx) => {
            let invoice = await tx.invoices.create({
                data: {
                    [SubTotal]: parseFloat(netTotal)
                }
            })

            let id = invoice[invoicePrimaryKey]

            rows.map((row) => row[InvoiceID] = id)

            return await tx.purchases.createMany({
                data: rows
            })
        })

        if(transaction[count] > 0) {
            return NextResponse.json({
                error: false
            },{
                status: 200
            })
        }
        else {
            return NextResponse.json({
                error: err
            },{
                status: 400
            })
        }
    }
    catch (err) {
        return NextResponse.json({
            error: err
        },{
            status: 400
        })
    }
    
}