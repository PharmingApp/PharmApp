"use client"

import Link from "next/link";


export const runtime = 'edge'

async function signOutHandle(e){
    let res = await fetch('/api/logout', {
        method: 'GET'
    })
    console.log(await res.json())
}

export default function Dashboard(){
    return (
        <div className=" h-screen w-screen p-2.5 bg-zinc-900 flex-col justify-center items-center inline-flex">
            <div className="self-stretch px-[29px] py-[18px] justify-end items-start gap-[147px] inline-flex">
                <div className="px-[29px] py-[9px] bg-white rounded-[25px] justify-center items-center gap-2.5 flex">
                    <div className="text-center text-zinc-900 text-[18px] font-bold">
                        <Link href="/login" onClick={signOutHandle}>
                            Sign Out
                        </Link>

                    </div>
                </div>
            </div>
            <div className="self-stretch grow shrink basis-0 justify-center items-center gap-[230px] inline-flex">
                <div className="w-[300px] h-[200px] bg-zinc-700 shadow-black shadow-2xl rounded-[25px] justify-center items-center gap-2.5 flex">
                    <Link className="text-center text-zinc-100 text-[24px] font-bold" href="/medicines">Medicines</Link>
                </div>
                <div className="w-[300px] h-[200px] bg-zinc-700 shadow-black shadow-2xl rounded-[25px] justify-center items-center gap-2.5 flex">
                    <Link className="text-center text-zinc-100 text-[24px] font-bold" href="/invoice">Invoice</Link>
                </div>
                <div className="w-[300px] h-[200px] bg-zinc-700 shadow-black shadow-2xl rounded-[25px] justify-center items-center gap-2.5 flex">
                    <div className="text-center text-zinc-100 text-[24px] font-bold">Records</div>
                </div>
            </div>
        </div>

    )
}