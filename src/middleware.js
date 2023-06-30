import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/_next")) return NextResponse.next();
  const res = NextResponse.next()
  let cookiesList = req.cookies.getAll()


  if(!(req.nextUrl.pathname == '/login')){
    if(cookiesList.length == 0){
      return NextResponse.redirect(new URL('/login', req.url))
    }
    else {

      for(let i = 0; i < cookiesList.length; i++){
        if(!cookiesList[i]['name'].includes('auth-token')){
          return NextResponse.redirect(new URL('/login', req.url))
          flag = true
        }
      }
    }
  }

  const supabase = createMiddlewareClient({ req, res })
  let { data, error } = await supabase.auth.getSession()
  return res
}

