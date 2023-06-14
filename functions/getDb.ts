import { createClient } from '@supabase/supabase-js'

export default function getDb(){
    const supabaseUrl = process.env.SUPABASE_URL!
    const supabaseKey = process.env.SUPABASE_KEY!

    return createClient(supabaseUrl, supabaseKey)
}