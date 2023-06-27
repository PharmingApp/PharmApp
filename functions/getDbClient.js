import { createClient } from '@supabase/supabase-js'
import data from './publicKeys.json' assert { type : 'json' }  

export default function getDbClient(){
    const supabaseUrl = data.supabasePublicUrl
    const supabaseKey = data.supabasePublicKey
    
    return createClient(supabaseUrl, supabaseKey) 
}

