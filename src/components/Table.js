// Data should be an array of objects
// Keys in the format of itemId-ColumnName has been assigned to each cell

// [{id: "1", name: blah, price: 10}, 
// {id: "2", name: blah, price: 10}] data

// ["id", "name", "price"] keys

export function DataRow({ item, columns, primaryKey }){
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
                                <input type="text" defaultValue={item[column]} className=" text-center" />
                            </td>
                        )
                    }
                })  
            }
        </>
    )
}

export function DataRows({ data, columns, primaryKey }){
    return (
        <>
            {
                data.map((item) => {
                    return(
                        <tr key={item[primaryKey]}>
                            <DataRow item={item} columns={columns} primaryKey={primaryKey} />
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

export default function Table({ name, data, primaryKey }){
    const columns = Object.keys(data[0])

    return(
        <>
            <table>
                <tbody>
                    <tr>
                        <TableHeaders columns={columns} />
                    </tr>
                    
                    <DataRows data={data} columns={columns} primaryKey={primaryKey} />
                </tbody>
            </table>

            <p>
                {name}
            </p>
        </>
        
    )
}

// Tbody error: https://github.com/vercel/next.js/discussions/36754 react do be shit