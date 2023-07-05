import Table from "@/src/components/Table.jsx";
import { redirect } from 'next/navigation'
import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Page() {
  // const res = await fetch(`${process.env.HOST}/api/getElements`, {
  //   method: 'GET',
  //   cache: 'no-cache', 
  // })


  // if (!res.ok) {
  //   throw new Error('Failed to fetch data')
  // }

  // let data = await res.json()
  // console.log(data)

  // let cookiesList = cookies().getAll()

  // if(cookiesList.length == 0){
  //   redirect('/login')
  // }

  // for(let i = 0; i < cookiesList.length; i++){
  //   if(!cookiesList[i]['name'].includes('auth-token')){
  //     redirect('/login')
  //   }
  // }
  
  let supabase = createServerComponentClient({ cookies })
  let {data, error} = await supabase.from("medicines").select("*")

  if(data.length == 0){
    data = [{id: 1, name: 'undefined'}]
  }
  
  let primaryKey = "id"
  
  return (
    <div className="w-screen h-screen p-2.5 bg-zinc-900 justify-start items-start gap-2.5">
      <div className="grow shrink basis-0 h-[100px] py-5 px-5 bg-zinc-900 justify-start items-start gap-2.5 flex rounded-[25px]">
      <div className="w-screen h-[124px] pl-36 pb-5 text-center text-white text-[53px] pt-2 font-bold">Database</div>
        <div className="px-[29px] py-[9px] bg-white rounded-[25px] justify-center items-center gap-2.5 flex">
          <div className="text-center text-zinc-900 text-[18px] font-bold">
            <Link href="/dashboard">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-fit h-fit justify-center text-white py-5">
          <Table name={"Medicines"} rows={data} primaryKey={primaryKey}/>
      </div>
    </div>

  );
}


// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config