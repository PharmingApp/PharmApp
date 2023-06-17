import Input from "../../components/Input";

export default function Page() {
  return (
    <>
    <div>
    <h1 class = "text-center font-bold">
        <Input title = {"Email"} placeholder={"example@gmail.com"}/>
    </h1>
    <button class= "bg-blue-500 hover:bg-blue-700 text-white py-2 px-3">
    Login
    </button>
    </div>
    </>
  );
}