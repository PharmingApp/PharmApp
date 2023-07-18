"use client"


import clone from "@/functions/clone"
import { useState } from "react"

// Data variables

let changes = {}
let deletions = new Set()

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
                                                <input defaultValue={row[column]} className={"text-center text-zinc-900 rounded-md"} onChange={(e) => {
                                                    data[key][column] = e.target.value
                                                    changes[key] = data[key]
                                                    setData(clone(data))
                                                }}/>
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
    )
}