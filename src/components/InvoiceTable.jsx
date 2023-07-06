"use client"

import { useState } from "react"
import clone from "@/functions/clone"

let inpLength = 0;

export function InvoiceSearch({ searchObjs, receipt, setReceipt, data }){
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
                                    receipt[searchResults[name]] = data[searchResults[name]]
                                    setReceipt(clone(receipt))
                                    delete searchResults[name]
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



export default function InvoiceTable({ data, searchFor, primaryKey, totalQuantity, itemPrice }){
    let searchObjs = {}


    let ids = Object.keys(data)
    let columns = Object.keys(data[ids[0]]).filter((column) => column != primaryKey && column != totalQuantity && column != "total")


    ids.map((id) => {
        searchObjs[data[id][searchFor].toLowerCase()] = id
        data[id]["quantity"] = 0
        data[id]["total"] = 0
    })
    const [receipt, setReceipt] = useState({})
    let netTotal = 0

    return(
        <>
            <InvoiceSearch searchObjs={searchObjs} receipt={receipt} setReceipt={setReceipt} data={data}/>

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
                        <th>
                            Quantity
                        </th>
                        <th>
                            Total
                        </th>
                    </tr>
                    {
                        Object.keys(receipt).map((id) => {
                            let item = receipt[id]
                            return(
                                <tr key={id}>
                                    {
                                        columns.map((column) => {
                                            return(
                                                <td key={`${id}-${column}`}>
                                                    {item[column]}
                                                </td>
                                            )
                                        })
                                    }
                                    <td>
                                        <input type="number" defaultValue={0} className="text-center text-zinc-900 rounded-md" onChange={(e) => {
                                            item["quantity"] = parseInt(e.target.value)
                                            item["total"] = (item["quantity"] * item[itemPrice]).toFixed(2)
                                            setReceipt(clone(receipt))
                                            console.log(receipt)
                                        }} />
                                    </td>
                                    <td>
                                        {item["total"]}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td>Net Total</td>
                        <td></td>
                        <td></td>
                        {
                            Object.keys(receipt).map(id => {
                                netTotal += parseFloat(receipt[id]["total"])
                            })
                        }
                        <td>{netTotal.toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>
            
        </>
        
    )
}