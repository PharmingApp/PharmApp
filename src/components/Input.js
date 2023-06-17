

export default function Input({ title, placeholder }){
    return (
        <>
            <div className="p-2">
                <h1 className="pl-2">{title}</h1>
                <input 
                type = "email" placeholder = {placeholder}
                className="text-2xl rounded-lg bg-gray-300 text-green-900 h-12
                indent-4">

                </input>
            </div>
            
        </>
    )
}
