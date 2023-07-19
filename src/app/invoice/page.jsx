import InvoiceTable from "../../components/InvoiceTable";
import { cookies } from 'next/headers'
import clone from "@/functions/clone"
import config from '../../config'

function convertRowsToData(rows, primaryKey) {
    let tempData = {}
    rows.forEach(row => {
        let tempRow = clone(row)
        delete tempRow[primaryKey]
        tempData[row[primaryKey]] = tempRow
    })
    return tempData
}

export default async function Page(){
    const cookieStore = cookies()
    let { primaryKey } = config.Medicines

    const res = await fetch(`${process.env.HOST}/api/getMedicines?skip=0&limit=undefined`, {
        method: 'GET',
        credentials: "include",
        headers: {
          cookie: cookieStore
        },
    })

    let rows = await res.json()
    let data = convertRowsToData(rows, primaryKey)

    return(
        <InvoiceTable data={data}/>
    )
}

