import React, { useState } from 'react'
import { signin } from '../lib/auth';
import getUser  from '../lib/other';
import { Link, useNavigate } from 'react-router-dom'
import "./Signup.css"


function Login() {
const navigate = useNavigate();
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');

async function checklogIn() {
  if (email === "admin1234") {
    if (password === "admin1234") {
      navigate("/adminDashboard");
      return;
    } else {
      console.log("Password is wrong");
    }
  }
  const response = await signin({Email:email,Password:password})
  console.log(response)
  if(response){
    const user = await getUser();
      console.log(response);
      localStorage.setItem("currentSession", JSON.stringify(response.session));
      
      console.log(user.email);
      console.log(user.id);
        console.log(user.user_metadata.first_name);
      setEmail("");
      setPassword("");
      const currentUser = {
        name: user.user_metadata.first_name,
        email: user.email,
        userId: user.id,

  }
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

      if (user) {
        navigate("/dashboard");
      }
    } else {
      console.log("User can not get");
      setEmail("");
      setPassword("");
    }
  
}



  return (
    <div className='main'>
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
  <div className="space-y-6">
    <h5 className="text-xl font-medium text-gray-900 dark:text-white">
      Sign in to our platform
    </h5>
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
          htmlFor="remember"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Remember me
        </label>
      </div>
      <a
        href="#"
        className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
      >
        Lost Password?
      </a>
    </div>
    <button
      onClick={checklogIn}
      type="button"
      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Login to your account
    </button>
    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
      Not registered?{" "}
      {/* <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">
        Create account
      </a> */}
      <Link to="/signup" className='option'>create account</Link>

    </div>
  </div>
</div>

    </div>
  )
}

export default Login