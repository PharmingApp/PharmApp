"use client"

export default function LogsTable({ primaryKey, data }) {
    let columns = Object.keys(data[0])

    return(
        <table>
            <tbody>
                <tr>
                    {
                        columns.map((column) => {
                            return (
                                <th key={column}>
                                    {column}
                                </th>
                            )
                        })
                    }
                </tr>

                {
                    data.map((item) => {
                        return (
                            <tr key={`${item[primaryKey]}-row`}>
                                
                                {
                                    columns.map((column) => {
                                        return (
                                            <td key={`${item[column]}-item`}>
                                                <button onClick={
                                                    (e) => {
                                                        console.log("Prob fetching data or smth.. idfk figure it out for urself")
                                                    }
                                                }>
                                                    {item[column]}
                                                </button>
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