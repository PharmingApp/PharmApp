import getDb from '@/functions/getDb'
import { NextResponse } from 'next/server'

export const revalidate = 0

export async function PUT(req) {
    let supabase = getDb() 

    let {primaryKey, id, column, value} = await req.json()
    let updates = {}
    updates[column] = value

    let {data, error} = await supabase 
    .from('medicines')
    .update([updates])
    .eq(primaryKey, id)

    if (error) {
        console.log(error)
        return new Response('Error') 
    }

    return NextResponse.json(data) 
} 