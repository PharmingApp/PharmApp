import getDb from "../../functions/getDb";

export default async function handler(req, res) {
    let supabase = getDb()

    let { data, error } = await supabase
    .from('medicines')
    .select('*')

    res.send(data)
}