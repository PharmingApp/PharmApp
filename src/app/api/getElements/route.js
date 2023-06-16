import getDb  from '@/functions/getDb';

export const revalidate = 0

export async function GET (request){
    let supabase = getDb();

    let { data, error } = await supabase
    .from('medicines')
    .select('*')

    if(error){
        console.log(error)
    }

    return new Response(JSON.stringify(data))
}