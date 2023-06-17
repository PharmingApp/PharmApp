
export default function TableHead({ name }){
    return(
        <>
            <table>
                <tbody>
                    <tr>
                        <th className="p-4">Company</th>
                        <th className="p-4">Contact</th>
                        <th className="p-4">Country</th>
                    </tr>
                    <tr>
                        <td className="p-4">Alfreds Futterkiste</td>
                        <td className="p-4">Maria Anders</td>
                        <td className="p-4">Germany</td>
                    </tr>
                    <tr>
                        <td className="p-4">Centro comercial Moctezuma</td>
                        <td className="p-4">Francisco Chang</td>
                        <td className="p-4">Mexico</td>
                    </tr>
                </tbody>
            </table>

            <h1>
                {name}
            </h1>
        </>
        
    )
}

// Tbody error: https://github.com/vercel/next.js/discussions/36754 react do be shit