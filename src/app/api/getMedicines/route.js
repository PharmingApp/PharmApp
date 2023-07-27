import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const revalidate = 1;

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
    const allMedicines = await prisma.medicineStatus.findMany({
        where: {
            Deleted: false
        },
        select: {
            Medicines: true
        },
        take: limit,
        skip: skip
    })

    allMedicines.map((medicine, index) => {
        allMedicines[index] = medicine['Medicines']
    })
    
    return NextResponse.json(allMedicines, {
        status: 200
    })  
}