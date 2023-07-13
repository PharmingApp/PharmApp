// https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/querying-the-database-node-planetscale
// run: npx prisma db pull to get the latest schema

import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
import password from 'password-hash-and-salt';
import { cookies } from 'next/headers'
import random from 'random'
import sign from '@/functions/sign'

const prisma = new PrismaClient()


export async function POST(req){
    let accessTokenExpiry = 60 * 60 * 24;

    let { email, password: pass } = await req.json();

    const User = await prisma.users.findFirstOrThrow({
        where: {
            Email: email
        }, 
        select: {
            ID: true,
            Password: true,
            Role: true
        }
    })

    let data = {}

    return new Promise((resolve, reject) => {
        password(pass).verifyAgainst(User.Password, async function(error, verified) {
            if(verified){
                delete User.Password
                User["Random"] = random.int(0, 1_000_000)
                let token = await sign(User, process.env.JWT_TOKEN_SECRET, accessTokenExpiry)

                cookies().set({
                    name: 'pharm-app-jwt', 
                    value: token,
                    httpOnly: true
                })

                let rand = random.int(0, 100_000_000)

                let refreshToken = await sign({ ID: User.ID, Random: rand }, process.env.JWT_REFRESH_SECRET, accessTokenExpiry * 365)

                const updateRefToken = await prisma.users.update({
                    where : {
                        ID: User.ID
                    },
                    data : {
                        userRefreshToken: refreshToken
                    }
                })

                cookies().set({
                    name: 'pharm-app-ref', 
                    value: refreshToken,
                    httpOnly: true
                })

                data = {
                    data: "success",
                    error: "undefined"
                }
            }
            else{
                 data = {
                    data: "undefined",
                    error: {
                        status: 401,
                        message: 'Invalid password'
                    }
                }
            }
            resolve(NextResponse.json(data)) 
        })
    })
}
