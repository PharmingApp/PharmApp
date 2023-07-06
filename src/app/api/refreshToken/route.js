import random from 'random'
import sign from '@/functions/sign'
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req) {
    let accessTokenExpiry = 60 * 60 * 24;
    let { ID, refreshToken } = await req.json();

    let User = await prisma.users.findFirst({
        where : {
            ID: ID
        },
        select : {
            ID: true,
            userRefreshToken: true,
            Role: true
        }
    })

    if (User.userRefreshToken === refreshToken){
        delete User.userRefreshToken
        User["Random"] = random.int(0, 1_000_000)
        let token = await sign(User, process.env.JWT_TOKEN_SECRET, accessTokenExpiry)

        return NextResponse.json(token)
    }
}