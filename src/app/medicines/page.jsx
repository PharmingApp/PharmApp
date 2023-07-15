import Table from "@/src/components/Table.jsx";
import React from 'react';
import { cookies } from 'next/headers'
import Link from "next/link";
import config from '../../config'

export const dynamic = "force-dynamic"; 


export default async function Page() {
  const cookieStore = cookies()

  let allMedicines = await fetch(`${process.env.HOST}/api/getMedicines?limit=${50}&skip=${0}`, {
    method: 'GET',
    credentials: "include",
    headers: {
      cookie: cookieStore
    },
    next: { 
      tags: ['medicines']
    }
  }) 
  
  let data = await allMedicines.json()

  if(data.length == 0){
    data = [{id: 1, name: 'undefined'}]
  }

  let primaryKey = config.Medicines.primaryKey

  
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
      <div className="flex w-full h-fit justify-center  text-white py-5">
          <Table rows={data} primaryKey={primaryKey}/>
      </div>
    </div>
    
  );
}


// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config