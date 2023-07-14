import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const revalidate = 0 
const prisma = new PrismaClient()

export async function GET(req) {
    console.log("Here")

    let limit = parseInt(req.nextUrl.searchParams.get('limit'))
    let skip = parseInt(req.nextUrl.searchParams.get('skip'))
    const allMedicines = await prisma.medicines.findMany({
        take: limit,
        skip: skip
    }) 
    console.log(allMedicines)
    return NextResponse.json(allMedicines)  
}