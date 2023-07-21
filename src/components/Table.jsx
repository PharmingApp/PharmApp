"use client"


import clone from "@/functions/clone"
import { useState } from "react"
import config from '../config'

// Data variables

let changes = {}
let deletions = new Set()
let inputType = config.inputType
let limit = 50
let skip = 0

function convertRowsToData(rows, primaryKey) {
    let tempData = {}
    rows.forEach(row => {
        let tempRow = clone(row)
        delete tempRow[primaryKey]
        tempData[row[primaryKey]] = tempRow
    })
    return tempData
}

function addEmptyRow(data, setData, columns){
    let max = Math.max(...Object.keys(data).map(key => parseInt(key)))
    let rowExists = true

    columns.map(column => {
        if((column !== 'Del') && (data[max][column] !== "")) rowExists = false
    })
    if(rowExists) return 

    let tempData = clone(data)
    let tempRow = {}
    columns.forEach(column => {
        if(column !== 'Del') tempRow[column] = ""
    })
    tempData[String(max + 1)] = tempRow
    setData(tempData)
}

export default function Table({ rows, primaryKey }){
    const [data, setData] = useState(rows)

    let columns = ['Del'].concat(Object.keys(data[Object.keys(data)[0]]))
    addEmptyRow(data, setData, columns)
    return (
        <>
            <table>
                <thead>
                    <tr>
                        {
                            columns.map(column => <th key={column}>{column}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(data).map(key => {
                            let row = data[key]
                            return (
                                <tr key={key}>
                                    {
                                        columns.map(column => {
                                            return (
                                                column === "Del" ? (
                                                    <td key={`${key}-del`}>
                                                        <button onClick={(e) => {
                                                            if (key in changes) delete changes[key]
                                                            else deletions.add(key)

                                                            delete data[key]
                                                            setData(clone(data))
                                                        }}>
                                                            ❌
                                                        </button>
                                                    </td>
                                                ) : 
                                                <td key={`${key}-${column}`}>
                                                    {
                                                        inputType[column] ? (
                                                            <input type={inputType[column]} 
                                                            defaultValue={row[column]} 
                                                            className={"text-center text-zinc-900 rounded-md"} 
                                                            onChange={(e) => {
                                                                data[key][column] = e.target.value
                                                                changes[key] = data[key]
                                                                setData(clone(data))
                                                            }}/>
                                                        ) : (
                                                            <input type={"text"} 
                                                            defaultValue={row[column]} 
                                                            className={"text-center text-zinc-900 rounded-md"} 
                                                            onChange={(e) => {
                                                                data[key][column] = e.target.value
                                                                changes[key] = data[key]
                                                                setData(clone(data))
                                                            }}/>
                                                        )
                                                    }
                                                    
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

            {
                (Object.keys(changes).length > 0) || (deletions.size > 0) ? <button onClick={
                    async (e) => {
                        if (Object.keys(changes).length > 0){
                            let append = []
                            for (let id in changes){
                                let temp = {}
                                temp[primaryKey] = id
                                for (let column in changes[id]){
                                    temp[column] = changes[id][column]
                                }
                                append.push(temp)
                            }
                            
                            let res = await fetch(`/api/updateMedicines`, {
                                method: 'POST',
                                credentials: "include",
                                headers: {cookie: cookieStore},
                                body: JSON.stringify(append)
                            })

                            let { error: upsertError } = await res.json()

                            if (upsertError){
                                console.log(upsertError)
                            }
                            else {
                                changes = {}
                            }
                        }
                        if(deletions.size > 0){
                            let deleteRes = await fetch(`/api/deleteMedicines`, {
                                method: 'POST',
                                credentials: "include",
                                headers: {cookie: cookieStore},
                                body: JSON.stringify(Array.from(deletions))
                            })
    
                            let { error: deleteError } = await deleteRes.json()
    
                            if (deleteError){
                                console.log(deleteError)
                            }
                            else {
                                deletions = new Set()
                            }
                        }

                        setData(clone(data))
                    }
                }>Save Changes</button> : null
            }

            <div>
                <button className="bg-white rounded-[25px] px-[29px] py-[9px] text-zinc-900 text-[18px] font-bold" onClick={async (e) => {
                    skip += limit
                    let allMedicines = await fetch(`/api/getMedicines?limit=${limit}&skip=${skip}`, {
                                            method: 'GET',
                                            credentials: "include",
                                            headers: {
                                                cookie: cookieStore,
                                            }
                                        }) 
                    let tempData = await allMedicines.json()
                    if(tempData.length == 0) return skip -= limit
                    tempData = convertRowsToData(tempData, primaryKey)
                    setData(tempData)

                }}>Next</button>
                <button className="bg-white rounded-[25px] px-[29px] py-[9px] text-zinc-900 text-[18px] font-bold" onClick={async (e) => {
                    if (skip < limit) return skip = 0
                    skip -= limit
                    let allMedicines = await fetch(`/api/getMedicines?limit=${limit}&skip=${skip}`, {
                                            method: 'GET',
                                            credentials: "include",
                                            headers: {
                                                cookie: cookieStore, 
                                            }
                                        }) 
                    
                                        let tempData = await allMedicines.json()
                    if(tempData.length == 0) return
                    tempData = convertRowsToData(tempData, primaryKey)
                    setData(tempData)
                }}>Prev</button>
            </div>
        </>
    )
}