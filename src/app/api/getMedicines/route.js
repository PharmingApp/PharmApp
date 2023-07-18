import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(req) {

    let limit = parseInt(req.nextUrl.searchParams.get('limit'))
    let skip = parseInt(req.nextUrl.searchParams.get('skip'))
    const allMedicines = await prisma.medicines.findMany({
        take: limit,
        skip: skip
    }) 
    return NextResponse.json(allMedicines, {
        status: 200
    })  
}