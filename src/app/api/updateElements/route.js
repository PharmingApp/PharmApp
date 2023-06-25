import getDb from '@/functions/getDb'
import { NextResponse } from 'next/server'

export const revalidate = 0

export async function PUT(req) {
    let supabase = getDb() 

    let { primaryKey, changes } = await req.json()

    if (Object.keys(changes).length == 0){
        return NextResponse.json({
            error: false,
            id: null,
            message: "No changes to update"
        })
    }

    let append = []
    for (let id in changes){
        let temp = {}
        temp[primaryKey] = id
        for (let column in changes[id]){
            temp[column] = changes[id][column]
        }
        append.push(temp)
    }

    const { data, error } = await supabase
    .from('medicines')
    .upsert(append, { onConflict: 'id'})
    .select()


    if (error) {
        console.log(error)
        return NextResponse.json({
            error: true,
            message: error
        })
    }

    console.log(data)
    return NextResponse.json({
        error: false,
        message: data
    })
} 