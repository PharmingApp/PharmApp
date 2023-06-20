'use client' 
import React from 'react';
import { useState } from 'react';
const md5 = require('md5')  

function LoginPage() {
  const [emailInput,setEmailInput] = useState("")
  const [passInput,setPassInput] = useState("")
  const handleEmailChange = (e) => {
    setEmailInput(e.target.value)
  }
  const handlePassChange = (e) => {
    setPassInput(e.target.value) 
  }
  console.log(emailInput) 
  console.log(passInput) 

  const onLoginButtonClick = async (e) => {
    console.log(md5(passInput)) 
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
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 py-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input onChange={handleEmailChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Enter your username" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input onChange={handlePassChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********" />
          </div>
          <div className="flex items-center justify-between">
            <button onClick={onLoginButtonClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
