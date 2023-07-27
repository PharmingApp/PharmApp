
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import config from '../../../config'


const prisma = new PrismaClient()

function currentTime() {
    let date = new Date();
    return date.toISOString()

}

export async function POST(req){
    let primaryKey = config.Medicines.primaryKey

    try{
        let deletions = await req.json();

        let del = await prisma.$transaction(async (tx) => {
            await tx.medicines.deleteMany({
                where: {
                    [primaryKey]: {
                        in: deletions.map(elem => parseInt(elem))
                    }
                }
            })
            
            let time = currentTime()

            let { ID: logsID } = await tx.logs.create({
                data: {
                    Date: time
                },
                select: {
                    ID: true
                }
            })

            deletions.map((elem, index) => {
                deletions[index] = {
                    MedicineID: parseInt(append[i][primaryKey]),
                    LogsID: logsID,
                    Action: 'Delete'
                }
            })

            console.log(deletions)

            await tx.edits.createMany({
                data: deletions
            })
        })


        if(del['count'] == 0) {
            return NextResponse.json({
                error: 'Error'
            },{
                status: 400
            })
        }

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