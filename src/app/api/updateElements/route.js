import getDb from '@/functions/getDb'
import { NextResponse } from 'next/server'

export const revalidate = 0

export async function PUT(req) {
    let supabase = getDb() 

    let { primaryKey, changes, lastId } = await req.json()
    let id = Object.keys(changes)[0]
    let append = changes[id]
    append[primaryKey] = id

    console.log(append)
    const { data, error } = await supabase
    .from('medicines')
    .upsert(append, { onConflict: 'id'})
    .select()


    if (error) {
        console.log(error)
        return new NextResponse.json({
            error: true,
            id: id,
            message: error
        })
    }

    console.log(data)
    return NextResponse.json({
        error: false,
        id: id,
        message: data
    })
} 