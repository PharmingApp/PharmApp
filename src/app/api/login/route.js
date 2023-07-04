// https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/querying-the-database-node-planetscale
// run: npx prisma db pull to get the latest schema

import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
import password from 'password-hash-and-salt';
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

export async function POST(req){
    let { email, password: pass } = await req.json();

    const User = await prisma.users.findFirst({
        where: {
            Email: email
        }
    })

    let data = {}

    return new Promise((resolve, reject) => {
        password(pass).verifyAgainst(User.Password, async function(error, verified) {
            if(verified){
                let token = jwt.sign(User, process.env.JWT_TOKEN_SECRET, { expiresIn: '1h' })

                cookies().set('pharm-app-jwt', token)

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
