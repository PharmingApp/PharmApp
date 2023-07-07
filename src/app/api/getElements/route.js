import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const revalidate = 0 
const prisma = new PrismaClient()

export async function GET(req) {
    const allMedicines = await prisma.medicines.findMany() 
    return NextResponse.json(allMedicines)  
}