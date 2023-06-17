import TableHead from "../../components/TableHead.js";


export default async function Page() {
  const res = await fetch(`${process.env.HOST}/api/getElements`, {
    method: 'GET',
    cache: 'no-cache'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  let data = await res.json()

  console.log(data)
  return (
    <div>
      <TableHead name={"Jay"}/>
    </div>
  );
}