import getDb from '@/functions/getDb'
import { NextResponse } from 'next/server'

export const revalidate = 0

export async function GET() {
    let supabase = getDb() 
    let {data, error} = await supabase 
    .from('medicines')
    .update([{name:'James'}])
    .eq('id', 3)

    if (error) {
        console.log(error)
        return new Response('Error') 
    }

    return NextResponse.json(data) 
}