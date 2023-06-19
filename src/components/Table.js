// Data should be an array of objects
// Keys in the format of itemId-ColumnName has been assigned to each cell

// [{id: "1", name: blah, price: 10}, 
// {id: "2", name: blah, price: 10}] data

// ["id", "name", "price"] keys


"use client"

import { useState } from "react"
import clone from "@/functions/clone"

let changes = {}

function addChange(key, value){
    changes[key] = value;
}

export function DataRow({ item, data, setData, columns, primaryKey }){
    return(
        <>
            {
                columns.map((column) => {
                    if (column === primaryKey){
                        return (
                            <td className="p-4" key={`${item[primaryKey]}-${column}`}>
                                {item[column]}
                            </td>
                        ) 
                    }
                    else {
                        return(
                            <td className="p-4" key={`${item[primaryKey]}-${column}`}>
                                <input type="text" defaultValue={item[column]} className=" text-center" onChange={
                                    function handleChange(event) {
                                        for (let i = 0; i < data.length; i++){
                                            if (data[i][primaryKey] === item[primaryKey]){
                                                event.preventDefault()
                                                data[i][column] = event.target.value
                                                setData(clone(data))
                                                addChange(`${item[primaryKey]}-${column}`, event.target.value)
                                                console.log(changes)
                                                break
                                            }
                                        }
                                    }
                                }/>
                            </td>
                        )
                    }
                })  
            }
        </>
    )
}

export function DataRows({ data, setData, columns, primaryKey }){
    return (
        <>
            {
                data.map((item) => {
                    return(
                        <tr key={item[primaryKey]}>
                            <DataRow item={item} data={data} setData={setData} columns={columns} primaryKey={primaryKey} />
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
    const [data, setData] = useState(rows)

    const columns = Object.keys(data[0])

    return(
        <>
            <table>
                <tbody>
                    <tr>
                        <TableHeaders columns={columns} />
                    </tr>
                    
                    <DataRows data={data} setData={setData} columns={columns} primaryKey={primaryKey} />
                </tbody>
            </table>

            <button onClick={
                async (e) => {
                    const keys = Object.keys(changes)
                    for (let i = 0; i < keys.length; i++){
                        const key = keys[i]
                        let [id, column] = key.split("-")

                        const res = await fetch(`/api/updateElements`, {
                            method: 'PUT',
                            cache: 'no-cache',
                            body: JSON.stringify({
                                primaryKey: primaryKey,
                                id: id,
                                column: column,
                                value: changes[key]
                        })
                    })
                    }
                }
            }>Save Changes</button>

            <p>
                {name}
            </p>
        </>
        
    )
}

// Tbody error: https://github.com/vercel/next.js/discussions/36754 react do be shit