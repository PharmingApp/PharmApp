import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient()

export async function GET(req) {
    

    let limit = req.nextUrl.searchParams.get('limit')
    if(limit !== 'undefined'){
        limit = parseInt(limit)
    }
    else {
        limit = undefined
    }

    let skip = parseInt(req.nextUrl.searchParams.get('skip'))
    const allMedicines = await prisma.medicines.findMany({
        take: limit,
        skip: skip
    }) 
    return NextResponse.json(allMedicines, {
        status: 200
    })  
}