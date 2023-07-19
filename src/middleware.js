
import { NextResponse } from 'next/server';
import verify from '@/functions/verify';

export default async function middleware(req){
    if (req.nextUrl.pathname.includes(".")) return NextResponse.next();
    
    let serverToken = req.cookies.get('server-token')

    if(serverToken){
        serverToken = serverToken.value
        if(serverToken === process.env.SERVER_PASS){
            return NextResponse.next()
        }
    }
    

    let token = req.cookies.get('pharm-app-jwt')
    let refreshToken = req.cookies.get('pharm-app-ref')
    if((req.nextUrl.pathname !== '/login') && (req.nextUrl.pathname !== '/api/login') && (req.nextUrl.pathname !== '/api/refreshToken')){
        console.log(req.nextUrl.pathname)
        if((!token) || (!refreshToken)){
            return NextResponse.redirect(new URL('/login', req.url))
        }
        else{
            token = token.value
            refreshToken = refreshToken.value

            try{
                let decoded = await verify(token, process.env.JWT_TOKEN_SECRET)
                return NextResponse.next()
            }
            catch(err){
                if(err.name === 'JWTExpired'){
                    try{
                        let decodedRef = await verify(refreshToken, process.env.JWT_REFRESH_SECRET, true)

                        let resRefToken = await fetch(new URL("/api/refreshToken", req.url), {
                            method: 'POST',
                            body: JSON.stringify({
                                ID: decodedRef.ID,
                                refreshToken: refreshToken
                            })
                        })
                        let refToken = await resRefToken.json()
                        
                        req.cookies.set({
                            name: 'pharm-app-jwt', 
                            value: refToken,
                            httpOnly: true
                        })
                        
                        const response = NextResponse.redirect(new URL(req.nextUrl.pathname, req.url))
                        response.cookies.set({
                            name: 'pharm-app-jwt', 
                            value: refToken,
                            httpOnly: true
                        });
                        return response

                    }
                    catch(err){
                        return NextResponse.redirect(new URL('/login', req.url))
                    }
                }
                else{
                    return NextResponse.redirect(new URL('/login', req.url))
                }
            }
        }
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
      '/((?!_next).*)',
    ],
  }