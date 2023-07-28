// [ { ID: '14', Name: 'uhh', Price: '123', quantity: '456' } ]

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import config from '../../../config'
import clone from "@/functions/clone"

const prisma = new PrismaClient()

function currentTime() {
    let date = new Date();
    return date.toISOString()

}

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
                    rowClone[column] = parseFloat(rowClone[column])
                }
            })
 
            upsertedItems.push(rowClone)
        }
        console.log(upsertedItems[0])
        await prisma.$transaction(async (tx) => {
            let edits = []
            for (let i = 0; i < append.length; i++){
                let medicineUpdate = await tx.medicines.upsert({
                    where: {
                        [primaryKey]: parseInt(append[i][primaryKey])
                    },
                    update: upsertedItems[i],
                    create: upsertedItems[i]
                })
                
                let time = currentTime()

                // medicineUpdate = await tx.logs.create({
                //     data: {
                //         Date: time,
                //         Edits: {
                //             create: {
                //                 data: {
                //                     Changes: {

                //                     }
                //                 }
                //             }
                //         }
                //     }
                // })

                console.log(medicineUpdate)


                edits.push({
                    ChangeID: parseInt(append[i][primaryKey]),
                    Action: 'Upsert'
                })
            }
            
            let time = currentTime()

            let { ID: logsID } = await tx.logs.create({
                data: {
                    Date: time
                },
                select: {
                    ID: true
                }
            })

            edits.map((edit) => {
                edit['LogsID'] = logsID
            })

            await tx.edits.createMany({
                data: edits
            })
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