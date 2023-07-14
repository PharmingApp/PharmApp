import { NextResponse } from "next/server";
import { revalidateTag } from 'next/cache'

export async function GET(req) {
    let tag = req.nextUrl.searchParams.get('tag')
    revalidateTag(tag)
    return NextResponse.json({ revalidated: true, now: Date.now() })
}