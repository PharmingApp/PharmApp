// Data should be an array of objects
// Keys in the format of itemId-ColumnName has been assigned to each cell

// [{id: "1", name: blah, price: 10}, 
// {id: "2", name: blah, price: 10}] data

// ["id", "name", "price"] keys


"use client"

import { useState } from "react"
import clone from "@/functions/clone"

let changes = {}

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
    changes[key] = {
        value: value,
        action: action
    };
}

export function DataRow({ item, data, setData, primaryKey }){
    return(
        <>
            {
                Object.keys(item).map((column) => {
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
                                    (event) => {
                                        event.preventDefault()
                                        item[column] = event.target.value
                                        addChange(`${item[primaryKey]}-${column}`, event.target.value, "update")
                                        setData(clone(data))
                                        console.log(changes)
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

export function DataRows({ data, setData, primaryKey }){
    return (
        <>
            {
                data.map((item) => {
                    return(
                        <tr key={item[primaryKey]}>
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
                Object.keys(changes).length > 0 ? <button onClick={
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
                }>Save Changes</button> : null
                
            }

            

            <p>
                {name}
            </p>
        </>
        
    )
}

// Tbody error: https://github.com/vercel/next.js/discussions/36754 react do be shit