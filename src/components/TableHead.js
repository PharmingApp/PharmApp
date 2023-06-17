export default function TableHead({ name, data }){
    return(
        <>
            <table>
                <tbody>
                    <tr>
                        {
                            Object.keys(data[0]).map((item) => {
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
                                    <td className="p-4">{item.id}</td>
                                    <td className="p-4">{item.name}</td>
                                    <td className="p-4">{item.price}</td>
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