import getDb  from '@/functions/getDb';

export async function GET (request){
    let supabase = getDb();

    let { data, error } = await supabase
    .from('medicines')
    .delete()
    .eq("id", 1)

    if(error){
        console.log(error)
    }

    return new Response(JSON.stringify(data))
}