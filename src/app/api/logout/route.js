
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export async function GET(req) {
    cookies().set({
        name: 'pharm-app-jwt', 
        value: "",
        httpOnly: true
    });
    cookies().set({
        name: 'pharm-app-ref', 
        value: "",
        httpOnly: true
    });
    return NextResponse.json("Success")
}