// [ { ID: '14', Name: 'uhh', Price: '123', quantity: '456' } ]

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import config from '../../../config'
import clone from "@/functions/clone"

const prisma = new PrismaClient()

export async function POST(req) {
    let primaryKey = config.Medicines.primaryKey
    let inputType = config.inputType

    try {
        let append = await req.json();
        let upsertedItems = []

        for (let i = 0; i < append.length; i++){
            let rowClone = clone(append[i])
            delete rowClone[primaryKey]

            Object.keys(rowClone).map(column => {
                if (inputType[column] == 'number'){
                    rowClone[column] = parseInt(rowClone[column])
                }
            })

            upsertedItems.push(rowClone)
        }

        await prisma.$transaction(async (tx) => {
            for (let i = 0; i < append.length; i++){
                await tx.medicines.upsert({
                    where: {
                        [primaryKey]: parseInt(append[i][primaryKey])
                    },
                    update: upsertedItems[i],
                    create: upsertedItems[i]
                })
            }
        })


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