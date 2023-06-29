import { createClient } from '@supabase/supabase-js'
import data from './publicKeys.json' assert { type : 'json' }  
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function getDbClient(){
    const supabaseUrl = data.supabasePublicUrl
    const supabaseKey = data.supabasePublicKey
    
    return createClientComponentClient(supabaseUrl, supabaseKey) 
}

