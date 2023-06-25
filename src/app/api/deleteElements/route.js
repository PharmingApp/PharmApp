import getDb  from '@/functions/getDb';
import { NextResponse } from 'next/server';

export async function PUT (req){
    let supabase = getDb();

    let { primaryKey, deletions } = await req.json()

    if (Object.keys(deletions).length == 0){
        return NextResponse.json({
            error: false,
            id: null,
            message: "No changes to update"
        })
    }

    let { data, error } = await supabase
    .from('medicines')
    .delete()
    .in(primaryKey, deletions)

    if(error){
        console.log(error)
    }

    console.log(data)
    return NextResponse.json(JSON.stringify(data))
}