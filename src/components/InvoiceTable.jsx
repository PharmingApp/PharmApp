"use client"

import { useState } from "react"
import clone from "@/functions/clone"

let inpLength = 0;

export function InvoiceSearch({ searchObjs, receipt, setReceipt }){
    const [searchResults, setSearchResults] = useState(clone(searchObjs))

    return(
        <>
            <div>
                <input 
                    type="text" 
                    placeholder="Medicine Search" 
                    className="w-[300px] h-[50px] rounded-[25px] px-5"
                    onChange={
                        (event) => {
                            let inp = event.target.value
                            
                            if((inp.length < inpLength)){
                                let temp = clone(searchObjs)
                                Object.keys(temp).map((key) => {
                                    if(!key.includes(inp)){
                                        delete temp[key]
                                    }
                                })
                                setSearchResults(clone(temp))
                            }
                            else {
                                inpLength = inp.length

                                Object.keys(searchResults).map((key) => {
                                    if(!key.includes(inp)){
                                        delete searchResults[key]
                                    }
                                })
                                setSearchResults(clone(searchResults))
                            }
                        }
                    }
                />
                {
                    Object.keys(searchResults).map((name) => {
                        return (
                            <button key={name} 
                            className="flex flex-row justify-between items-center"
                            onClick={
                                (e) => {
                                    setReceipt(clone(receipt).concat(searchResults[name]))
                                    delete searchResults[name]
                                    console.log(receipt)
                                }
                            }>
                                <p className="text-zinc-900">{name}</p>
                            </button    >
                        )
                    })
                }
            </div>
            
            
        </>
    )
}



export default function InvoiceTable({ data, searchFor, primaryKey }){
    let searchObjs = {}

    const [receipt, setReceipt] = useState([])

    let ids = Object.keys(data)
    let columns = Object.keys(data[ids[0]])

    ids.map((id) => {
        searchObjs[data[id][searchFor].toLowerCase()] = id
    })

    return(
        <>
            <InvoiceSearch searchObjs={searchObjs} receipt={receipt} setReceipt={setReceipt}/>

            <table>
                <tbody>
                    <tr>
                        {
                            columns.map((column) => {
                                return(
                                    <th key={column}>
                                        {column}
                                    </th>
                                )
                            })
                        }
                    </tr>
                    {
                        receipt.map((item) => {
                            item = data[item]
                            return(
                                <tr key={item[primaryKey]}>
                                    {
                                        columns.map((column) => {
                                            return(
                                                <td key={`${item[primaryKey]}-${column}`}>
                                                    {item[column]}
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            
        </>
        
    )
}