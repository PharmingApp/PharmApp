import Table from "@/src/components/Table.js";


export default async function Page() {
  const res = await fetch(`${process.env.HOST}/api/getElements`, {
    method: 'GET',
    cache: 'no-cache'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  let data = await res.json()
  
  return (
    <div>
      <Table name={"Medicines"} data={data} primaryKey={"id"}/>
    </div>
  );
}