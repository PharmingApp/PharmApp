import Table from "@/src/components/Table.js";
import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'


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
  
  let supabase = createServerComponentClient({ cookies })
  let {data, error} = await supabase.from("medicines").select("*")

  
  let primaryKey = "id"
  
  return (
    <div className="w-[1920px] h-[1080px] bg-white flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="self-stretch h-[84px] py-[22px] bg-cyan-600 flex-col justify-start items-start gap-2.5 flex">
      <div className="self-stretch h-10 text-center text-white text-[39px] font-bold">Database</div>
    </div>
      <div className="flex mx-auto my-auto">
        <Table name={"Medicines"} rows={data} primaryKey={primaryKey}/>
      </div>
  </div>
  );
}







