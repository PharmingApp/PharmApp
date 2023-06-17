import getDb  from '@/functions/getDb';
import { NextResponse } from 'next/server';

export async function GET (request){
    let supabase = getDb();

    let { data, error } = await supabase
    .from('medicines')
    .delete()
    .eq("id", 1)

    if(error){
        console.log(error)
    }

    return NextResponse.json(JSON.stringify(data))
}