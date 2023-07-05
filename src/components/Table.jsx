// Data should be an array of objects
// Keys in the format of itemId-ColumnName has been assigned to each cell

// [{id: "1", name: blah, price: 10}, 
// {id: "2", name: blah, price: 10}] data

// ["id", "name", "price"] keys


"use client"

import React, { useState } from "react"
import clone from "@/functions/clone"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Possible types are all html types mentioned here at https://www.w3schools.com/html/html_form_input_types.asp
// If not mentioned, it is assumed to be text

let inputType = {
    "price": "number"
}

let changes = {}
let deletions = []

function addEmptyRow(data, primaryKey){
    let temp = clone(data[data.length - 1])
    let columns = Object.keys(data[0])

    for (let i = 0; i < columns.length; i++) {
        if (columns[i] == primaryKey){
        temp[columns[i]] = parseInt(temp[columns[i]]) + 1
        }
        else{
        temp[columns[i]] = ""
        }
    }
    data.push(temp)
}

function addChange(key, value, action){
    let [id, column] = key.split('-')
    if (!changes[id]){
        changes[id] = {}
    }
    changes[id][column] = value;

}

let inputCss = "text-center text-zinc-900 rounded-md"

export function DataRow({ item, data, setData, primaryKey }){
    return(
        <>
            {
                Object.keys(item).map((column) => {
                    if (column === primaryKey){
                        return (
                            <React.Fragment key={`${item[primaryKey]}-ids`}>
                                <td key={`${item[primaryKey]}-del`}>
                                    <button onClick=
                                        {
                                            (event) => {
                                                event.preventDefault()
                                                if(changes[item[primaryKey]]){
                                                    delete changes[item[primaryKey]]
                                                }
                                                else{
                                                    if ((!deletions.includes(item[primaryKey]) && item[primaryKey] != data[data.length - 1][primaryKey])){
                                                            deletions.push(item[primaryKey])

                                                    }
                                                    else{
                                                        return
                                                    }
                                                }
                                                setData(clone(data.filter((element) => element[primaryKey] != item[primaryKey])))
                                            }       
                                        }>
                                        ❌
                                    </button>
                                </td>
                                <td className="p-4" key={`${item[primaryKey]}-${column}`}>
                                    {item[column]}
                                </td>
                            </React.Fragment>
                        ) 
                    }
                    else {
                        return(
                            <td className="p-4" key={`${item[primaryKey]}-${column}`}>
                                {
                                    inputType[column] ? (
                                        <input type={inputType[column]} defaultValue={item[column]} className={inputCss} onChange={
                                            (event) => {
                                                event.preventDefault()
                                                item[column] = event.target.value
                                                addChange(`${item[primaryKey]}-${column}`, event.target.value, "update")
                                                setData(clone(data))
                                            }
                                        }/>
                                    ) : (
                                        <input type="text" defaultValue={item[column]} className={inputCss} onChange={
                                            (event) => {
                                                event.preventDefault()
                                                item[column] = event.target.value
                                                addChange(`${item[primaryKey]}-${column}`, event.target.value, "update")
                                                setData(clone(data))
                                            }
                                        }/>
                                    )
                                }
                                
                            </td>
                        )
                    }
                })  
            }
        </>
    )
}



export function DataRows({ data, setData, primaryKey }){
    return (
        <>
            {
                data.map((item) => {
                    return(
                        <tr className="text-white" key={item[primaryKey]}>
                            <DataRow item={item} 
                            data={data} 
                            setData={setData} 
                            primaryKey={primaryKey} />
                        </tr>
                    )
                })
            }
        </>
    )
}

export function TableHeaders({ columns }){
    return(
        <>
            <th key={"Del"}> Del</th>
            {
                columns.map((column) => {
                    return(
                        <th className="p-4" key={column}>{column}</th>
                    )
                })
            }
        </>
    )
}

export default function Table({ name, rows, primaryKey }){
    let supabase = createClientComponentClient()
    const [data, setData] = useState(clone(rows))

    let temp = clone(data[data.length - 1])

    let columns = Object.keys(temp)
    
    for (let i = 0; i < columns.length; i++){
        if ((columns[i] != primaryKey) && (temp[columns[i]] != "")){
            addEmptyRow(data, primaryKey)
            break
        }
    }
    

    return(
        <>
            <table>
                <tbody>
                    <tr>
                        <TableHeaders columns={Object.keys(temp)} />
                    </tr>
                    
                    <DataRows 
                    data={data} 
                    setData={setData}
                    primaryKey={primaryKey} />
                </tbody>
            </table>

            {
                Object.keys(changes).length > 0 || deletions.length > 0 ? <button onClick={
                    async (e) => {

                        let append = []
                        for (let id in changes){
                            let temp = {}
                            temp[primaryKey] = id
                            for (let column in changes[id]){
                                temp[column] = changes[id][column]
                            }
                            append.push(temp)
                        }

                        let { data: upsertData, error: upsertError } = await supabase
                        .from('medicines')
                        .upsert(append, { onConflict: 'id'})
                        .select()

                        if (upsertError){
                            console.log(upsertError)
                        }
                        else {
                            changes = {}
                        }

                        let { data: deleteData, error: deleteError } = await supabase
                        .from('medicines')
                        .delete()
                        .in(primaryKey, deletions)

                        if (deleteError){
                            console.log(deleteError)
                        }
                        else {
                            deletions = []
                        }
                        setData(clone(data))
                    }
                }>Save Changes</button> : null
                
            }
        
        </>
        
    )
}

// Tbody error: https://github.com/vercel/next.js/discussions/36754 react do be shit