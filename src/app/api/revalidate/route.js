import { NextResponse } from "next/server";
import { revalidateTag, revalidatePath  } from 'next/cache'

export async function GET(req) {
    revalidatePath('/api/getMedicines')
    return NextResponse.json({ revalidated: true, now: Date.now() })
}