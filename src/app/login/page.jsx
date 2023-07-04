'use client' 
import React, { use } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import password from 'password-hash-and-salt';



function LoginPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()


  const [emailInput,setEmailInput] = useState("")
  const [passInput,setPassInput] = useState("")
  const [wrongPass,setWrongPass] = useState(false) 


  const handleEmailChange = (e) => {
    setEmailInput(e.target.value)
  }
  const handlePassChange = (e) => {
    setPassInput(e.target.value) 
  } 

  const onLoginButtonClick = async (e) => {
    // let { data, error } = await supabase.auth.signInWithPassword({
    //   email: emailInput,
    //   password: passInput 
    // })
    // router.refresh()

    let res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email: emailInput,
        password: passInput
      })
    })

    let { data, error } = await res.json()
    
    console.log(data, error)

    if (error) {
      if (error.status == 401) {
        setWrongPass(true) 
      }
      
      else {
        router.replace("/dashboard")
      }
    } 
    
  }

  return (
    <div className="bg-zinc-900">
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-xs py-4">
          <div className="flex items-center">
            <p className="text-white mx-r mb-3 font-sans text-2xl font-semibold">Mattakara Jan Aushadi</p>
            <Image className="mb-3 ml-6 w-12 h-12 " src="/logo.png" alt = "" width={200} height={200} />
          </div>
            <form className="bg-zinc-700 shadow-black shadow-2xl rounded-xl px-8 py-6">
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2 " htmlFor="Email Address">
                  Email Address
                </label>
                <input onChange={handleEmailChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Enter Email Address" />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input onChange={handlePassChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********" />
              </div>
              {
                wrongPass ? <div><p>Wrong Password!</p></div> : null             
              }
              
              <div className="flex items-center justify-between">
                <button onClick={onLoginButtonClick} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  Sign In
                </button>
              </div>
            </form>
        </div>
      </div>
    </div> 
  );
}

export default LoginPage;
