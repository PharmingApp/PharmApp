// Data should be an array of objects
// Keys in the format of itemId-ColumnName has been assigned to each cell

// [{id: "1", name: blah, price: 10}, 
// {id: "2", name: blah, price: 10}] data

// ["id", "name", "price"] keys


"use client"

import { useState } from "react"
import clone from "@/functions/clone"

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

export function DataRow({ item, data, setData, primaryKey }){
    return(
        <>
            {
                Object.keys(item).map((column) => {
                    if (column === primaryKey){
                        return (
                            <>
                                <td key={`${item[primaryKey]}-del`}>
                                    <button onClick=
                                        {
                                            (event) => {
                                                console.log(deletions)
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
                            </>
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
                        let error = false
                        let res = {}
                        console.log(JSON.parse(JSON.stringify({
                            primaryKey: primaryKey,
                            changes: changes
                        })))
                        if (Object.keys(changes).length > 0){
                            res = await fetch(`/api/updateElements`, {
                                method: 'PUT',
                                cache: 'no-cache',
                                body: JSON.stringify({
                                    primaryKey: primaryKey,
                                    changes: changes
                                })
                            })
    
                            res = await res.json()
    
                            if (res['error']){
                                error = true
                                console.log(res['message'])
                            }
                            else {
                                changes = {}
                            }
                        }
                        else if(!error && deletions.length > 0){
                            
                            console.log(primaryKey)
                            console.log(deletions)
                            res = await fetch(`/api/deleteElements`, {
                                method: 'PUT',
                                cache: 'no-cache',
                                body: JSON.stringify({
                                    primaryKey: primaryKey,
                                    deletions: deletions
                                })
                            })
    
                            res = await res.json()
    
                            if (res['error']){
                                console.log(res['message'])
                            }
                            else{
                                deletions = []
                            }
                        }
                        setData(clone(data))
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