
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import config from '../../../config'


const prisma = new PrismaClient()

export async function POST(req){
    let primaryKey = config.Medicines.primaryKey

    try{
        let deletions = await req.json();
        console.log(deletions)

        let del = await prisma.medicines.deleteMany({
            where: {
                [primaryKey]: {
                    in: deletions.map(elem => parseInt(elem))
                }
            }
        })

        if(del['count'] == 0) {
            return NextResponse.json({
                error: 'Error'
            },{
                status: 400
            })
        }

        fetch(`${process.env.HOST}/api/getMedicines?limit=${50}&skip=${0}`, {
            method: 'GET',
            credentials: "include",
            headers: {
                cookie: `server-token=${process.env.SERVER_PASS}`
            },
            next: { 
                tags: ['medicines']
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