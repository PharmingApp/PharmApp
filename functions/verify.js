import { jwtVerify } from 'jose';

export default async function verify(token, secret, refresh=false) {
    const {payload} = await jwtVerify(token, new TextEncoder().encode(secret));
    // run some checks on the returned payload, perhaps you expect some specific values

    if(refresh){
        if(Number.isInteger(payload.Random)){
            return true;
        }
    }
    else{
        return payload;
    }

    // if its all good, return it, or perhaps just return a boolean
    
}