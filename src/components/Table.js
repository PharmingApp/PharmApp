// Data should be an array of objects
// Keys in the format of itemId-ColumnName has been assigned to each cell

// [{id: "1", name: blah, price: 10}, 
// {id: "2", name: blah, price: 10}] data

// ["id", "name", "price"] keys

export function DataRow({ item, columns }){
    return(
        <>
            {
                columns.map((column) => {
                    if (column === "id"){
                        return (
                            <td className="p-4" key={`${item.id}-${column}`}>
                                {item[column]}
                            </td>
                        ) 
                    }
                    else {
                        return(
                            <td className="p-4" key={`${item.id}-${column}`}>
                                <input type="text" defaultValue={item[column]} className=" text-center" />
                            </td>
                        )
                    }
                })  
            }
        </>
    )
}

export function DataRows({ data, columns }){
    return (
        <>
            {
                data.map((item) => {
                    return(
                        <tr key={item.id}>
                            <DataRow item={item} columns={columns} />
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

export default function Table({ name, data }){
    const columns = Object.keys(data[0])

    return(
        <>
            <table>
                <tbody>
                    <tr>
                        <TableHeaders columns={columns} />
                    </tr>
                    
                    <DataRows data={data} columns={columns} />
                </tbody>
            </table>

            <p>
                {name}
            </p>
        </>
        
    )
}

// Tbody error: https://github.com/vercel/next.js/discussions/36754 react do be shit