
import { NextResponse } from 'next/server';
import verify from '@/functions/verify';

export default function middleware(req){
    if (req.nextUrl.pathname.startsWith("/_next")) return NextResponse.next();
    if (req.nextUrl.pathname.includes(".")) return NextResponse.next();

    let token = req.cookies.get('pharm-app-jwt')
    let refreshToken = req.cookies.get('pharm-app-ref')
    if((req.nextUrl.pathname !== '/login') && (req.nextUrl.pathname !== '/api/login')){
        console.log(req.nextUrl.pathname)
        if((!token) || (!refreshToken)){
            console.log(1)
            return NextResponse.redirect(new URL('/login', req.url))
        }
        else{
            token = token.value
            refreshToken = refreshToken.value

            try{
                let decoded = verify(token, process.env.JWT_TOKEN_SECRET)
                return NextResponse.next()
            }
            catch(err){
                if(err.name === 'TokenExpiredError'){
                    try{
                        let decodedRef = verify(refreshToken, process.env.JWT_REFRESH_SECRET)
                        return NextResponse.next()
                    }
                    catch(err){
                        console.log(2)
                        return NextResponse.redirect(new URL('/login', req.url))
                    }
                }
                else{
                    console.log(err)
                    return NextResponse.redirect(new URL('/login', req.url))
                }
            }
        }
    }

    return NextResponse.next()
}