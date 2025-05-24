import React, { useState } from 'react'
import "./Signup.css"
import { SignUp } from '../lib/auth'
import { Link } from 'react-router-dom'
import { insertuser } from '../lib/other'
// import Login from './login'
import { useNavigate } from 'react-router-dom'


 function Signup() {
  const [name , setName] = useState('')
  const [email, setEmail]= useState('')
  const [password, setPassword]= useState('')
  
  const navigate = useNavigate();
  async function usersignup(){
    console.log('starting signup with :',name,email,password)
    const response=await SignUp({Name:name,Email:email,Password:password});
    console.log('response of auth:', response)
    if(response){
      insertuser(response.data.user.user_metadata.first_name,response.data.user.email,response.data.user.id)

      navigate('/signin')

    }else{
      console.log("Confirm Error");
      
    }
  }


    
 

  return (
    <div className='main'>
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
  <div className="space-y-6" >
    <h5 className="text-xl font-medium text-gray-900 dark:text-white">
      Sign up to our platform
    </h5>
    <div>
      <label
        htmlFor="name"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Your name
      </label>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        placeholder="enter your name"
        required=""
      />
    </div>
    <div>
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Your email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        placeholder="name@company.com"
        required=""
      />
    </div>
    <div>
      <label
        htmlFor="password"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Your password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        placeholder="••••••••"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        required=""
      />
    </div>
    <div className="flex items-start">
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            defaultValue=""
            className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            required=""
          />
        </div>
        <label
          htmlFor="remember" style={{color:"skyblue"}}
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Accept all terms and conditions
        </label>
      </div>
      {/* <a
        href="#"
        className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
      >
        Lost Password?
      </a> */}
    </div>
    <button
      type="button"
      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    onClick={usersignup}
    >
      signup to your account
    </button>
    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
       registered?{" "}
      {/* <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">
        Already have an account
      </a> */}
      <Link to="/signin" className='option'>Already have an account</Link>
    </div>
  </div>
</div>

    </div>
  )
}

export default Signup