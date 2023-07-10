import LogsTable from "../../components/LogsTable"
import config from '../../config'

const data = [
    {
        id: 1,
        provider: "test1",
        date: '1-01-2023'
    },
    {
        id: 2,
        provider: "test2",
        date: '2-01-2023'
    },
    {
        id: 3, 
        provider: "test3",
        date: '3-01-2023'
    },
    {
        id: 4, 
        provider: "test4",
        date: '4-01-2023'

    }
]

export default function Page(){
    let primaryKey = config.Medicines.primaryKey

    return (
        <LogsTable primaryKey={primaryKey} data={data}/>
    )
}