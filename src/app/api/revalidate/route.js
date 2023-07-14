import { NextResponse } from "next/server";
import { revalidateTag, revalidatePath  } from 'next/cache'

export async function GET(req) {
    let tag = req.nextUrl.searchParams.get('tag')
    revalidateTag(tag)
    revalidatePath('/medicines')
    return NextResponse.json({ revalidated: true, now: Date.now() })
}