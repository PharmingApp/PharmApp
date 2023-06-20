import getDb from '@/functions/getDb'
import { NextResponse } from 'next/server'
export const revalidate = 0

export async function PUT(req) {
    let supabase = getDb() 
    let {email, pass} = await req.json() 
    
    
    let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: pass 
  })
   
    if (error) {
        console.log(error.status)
        if (error.status>=400 && error.status<=499) {
            return NextResponse.json(error)  
        }  
    }

    return NextResponse.json(data) 
}