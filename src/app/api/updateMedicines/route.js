import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import config from '../../../config'
import clone from "@/functions/clone"

const prisma = new PrismaClient()

export async function POST(req) {
    let primaryKey = config.Medicines.primaryKey

    try {
        let append = await req.json();
        let upsertedItems = []

        for (let i = 0; i < append.length; i++){
            let rowClone = clone(append[i])
            delete rowClone[primaryKey]
            upsertedItems.push(rowClone)
        }

        const upsertMedicines = await prisma.$transaction(
            append.map((row, index) => {
                console.log(upsertedItems[index])
                prisma.medicines.upsert({
                    where: {
                        [primaryKey]: row[primaryKey]
                    },
                    update: upsertedItems[index],
                    create: upsertedItems[index]
                })
            })
        )

        return NextResponse.json({
            error: false
        },{
            status: 200
        })
    }
    catch(err){

        console.log(err)
        return NextResponse.json({
            error: err
        },{
            status: 400
        })
    }
    
}