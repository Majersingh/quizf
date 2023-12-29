import React, { useState , useContext, memo  } from 'react';
import {Link  , useNavigate} from 'react-router-dom';
import { UserContext } from "../App";

const Login = () => {
  const { isAuthenticated , apiUrl} = useContext(UserContext);
  const[ email , setEmail]=useState('');
  const[ password , setPassword]=useState('');
  const[ isLoggedin , setLoggedin]=useState(0); //-1 for wrong idpass  -2 for emty req and 1 for inloading state n 0 for default state
  const navigate = useNavigate();

  const  handleSubmit = async (e) => {
    e.preventDefault(); // this not navigate to another where
    setLoggedin(1);
    if(!(email && password))
    { 
      setLoggedin(-2);
      setTimeout(()=>setLoggedin(0),300);
      return; // this to prevent further execution
    }
    try {
      console.log(`${apiUrl}/login`)
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userid:email , password:password}),
        credentials: 'include' 
      });
  
      if (response.status !== 200) {
        console.log("Login Failed");
        setLoggedin(-1);
        setTimeout(()=>setLoggedin(0),5000);
      }
      else if(response.status ===200)
      { 
        console.log('Response:', "Logged in Successfully");
        window.location.reload();
      }
    } 
    catch (error) {
      console.log('Error: To handle login submit', error);
    }
  }    
 if(isAuthenticated)
 navigate(-1);// this rdirect from where login come
 
  return (
    <div className='bg-slate-100'>
    <div className="flex flex-col  justify-center items-center h-screen p-4">
      <form className="w-full max-w-sm bg-white rounded-lg shadow-xl  p-8">
        <header className="flex justify-between items-center w-full p-2 mb-4">
          <h2 className="text-xl font-bold ">Login</h2>
          <Link to="/" className="text-black hover:underline">
            <i className="fa-solid fa-xmark xl"></i>
          </Link>
        </header>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`mt-1 p-1 outline-none border focus:ring-blue-500 focus:border-blue-500 block w-full shadow-md sm:text-s rounded-md ${isLoggedin <0? "border-red-600 scale-110 ease-in-out transition-all":""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`mt-1 p-1 outline-none border focus:ring-blue-500 focus:border-blue-500 block w-full shadow-md sm:text-s rounded-md ${isLoggedin <0? "border-red-600 scale-110 ease-in-out transition-all":""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
            type="submit"
            className={`w-full py-2 px-4 outline-none border border-transparent text-sm font-medium rounded-md text-white bg-red-800 ${isLoggedin < 0 ? "border-red-600 scale-110 ease-in-out transition-all bg-red-600" : ""}`}
            onClick={handleSubmit}
            >
            {isLoggedin >0 ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
              </span>
            ) : 
              "Log In"
            }
         </button>
        {isLoggedin===-1?<p className='text-red-600'>Wrong E-mail Or Password</p>:<></>}
        {isLoggedin===-2?<p className='text-red-600'>Enter Email & Password</p>:<></>}
        <p className="text-sm text-gray-600 mt-2">
          Don't have an account? {<Link to={'/signup'} className='text-blue-500'>Sign Up</Link>}
        </p>
      </form>
    </div>
    </div>
  );
};

export default memo(Login);
