// Data should be an array of objects
// Keys in the format of itemId-ColumnName has been assigned to each cell

// [{id: "blah", name: blah, price: blah}, 
// {id: "blah", name: blah, price: blah}] data

// ["id", "name", "price"] keys


export default function TableHead({ name, data }){
    const columns = Object.keys(data[0])

    return(
        <>
            <table>
                <tbody>
                    <tr>
                        {
                            columns.map((column) => {
                                return(
                                    <th className="p-4" key={column}>{column}</th>
                                )
                            })
                        }
                    </tr>
                    
                    {
                        data.map((item) => {
                            return(
                                <tr key={item.id}>
                                    {
                                        columns.map((column) => {
                                            return(
                                                <td className="p-4" key={`${item.id}-${column}`}>{item[column]}</td>
                                            )
                                        })  
                                    }
                                    
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <p>
                {name}
            </p>
        </>
        
    )
}

// Tbody error: https://github.com/vercel/next.js/discussions/36754 react do be shit