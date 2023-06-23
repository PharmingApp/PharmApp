'use client' 


import React from 'react';
import { useState } from 'react';

function LoginPage() {
  const [emailInput,setEmailInput] = useState("")
  const [passInput,setPassInput] = useState("")
  const handleEmailChange = (e) => {
    setEmailInput(e.target.value)
  }
  const handlePassChange = (e) => {
    setPassInput(e.target.value) 
  } 

  const onLoginButtonClick = async (e) => {
    console.log(passInput) 
    const res = await fetch(`/api/login`, {
      method: 'PUT',
      cache: 'no-cache',
      body: JSON.stringify({
        email: emailInput,
        pass: passInput  
      })
      
    })
     
  }

  return (
    <div className="bg-zinc-900">
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-xs py-4">
          <div className="flex items-center">
            <p className="text-white mx-r mb-3 font-sans text-2xl font-semibold">Mattakara Jan Aushadi</p>
            <img className="mb-3 ml-6 w-12 h-12 " src="https://res.cloudinary.com/pumpkin517/image/upload/c_scale,h_128/v1651385416/624dd0a951a1e8a118215b1b24a0da59-pharmacy-logo_daskjg.png" alt = ""></img>
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
