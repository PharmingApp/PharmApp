import { useRouter } from "next/router"

export default function Route(){
    const router = useRouter()


    return (
        <h1>
            {router.query.blah}
        </h1>
    )
}