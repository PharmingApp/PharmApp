import Table from "@/src/components/Table.js";
import clone  from "@/functions/clone";


export default async function Page() {
  const res = await fetch(`${process.env.HOST}/api/getElements`, {
    method: 'GET',
    cache: 'no-cache'
  })

  let primaryKey = "id"

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  let data = await res.json()
  console.log(data)
  
  return (
    <div>
      <Table name={"Medicines"} rows={data} primaryKey={primaryKey}/>
    </div>
  );
}