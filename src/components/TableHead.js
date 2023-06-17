// Data should be an array of objects
// Keys in the format of itemId-ColumnName has been assigned to each cell

export default function TableHead({ name, data }){
    const keys = Object.keys(data[0])

    return(
        <>
            <table>
                <tbody>
                    <tr>
                        {
                            keys.map((item) => {
                                return(
                                    <th className="p-4" key={item}>{item}</th>
                                )
                            })
                        }
                    </tr>
                    
                    {
                        data.map((item) => {
                            return(
                                <tr key={item.id}>
                                    {
                                        Object.keys(item).map((key) => {
                                            return(
                                                <td className="p-4" key={`${item.id}-${key}`}>{item[key]}</td>
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