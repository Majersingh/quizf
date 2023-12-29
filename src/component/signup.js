import React, { useState , useContext } from 'react';
import  { Link} from 'react-router-dom';
import { UserContext } from "../App";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isSignup, setSignup] = useState(-1); //0 for loading and 1 for sucess state n -1 for default state
  const { apiUrl} = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignup(0);
    try {
          const response = await fetch(`${apiUrl}/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name:name , mobileNumber: mobileNumber,email:email , password:password}),
            credentials: 'include' 
          });

          const data = await response.json();
          if(response.status ===200)
          { 
            setSignup(1);
            console.log("Signup Successfully",data);
            alert("SignIn Successfully");
          }
          else if(data.isAlready)
          { 
            setSignup(-1);
            console.log("Already user exist");
            alert("Already Exist User");
          }
          else
          {
            setSignup(-1);
            console.log("Failed SignuP" , data)
          }
      
        } 
      catch (error) {
        console.error('Error:', error);
      }
  };

  const isFormValid = () => {
    return name && email && password && mobileNumber && validateEmail(email);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  if(isSignup <=0)
  return (
    <>
    <div className="flex items-center bg-slate-100 justify-center h-screen">
      <div className="max-w-md w-full p-6 bg-white shadow-lg m-4 rounded-lg">
        <form onSubmit={handleSubmit} >
          <header className="flex justify-between items-center w-full  mb-6 p-2">
           <p className="text-xl font-medium">Sign Up</p>
            <Link to="/" className="text-black hover:underline">
            <i className="fa-solid fa-xmark xl"></i>
            </Link>
          </header>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
            />
            <small className="text-red-500">
              {email && !validateEmail(email) && 'Invalid email format'}
            </small>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="mobileNumber">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full  bg-red-800 text-white py-2 px-4 rounded-md  transition-colors ${
              !isFormValid() && 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!isFormValid()}
          >
            {isSignup ===0 ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
              </span>
            ) : 
              "Sign Up"
            }
          </button>
        </form>
        <p className="text-gray-600 mt-4 text-center">
          Already registered?{<Link to={'/login'}  state={{from:'signup'}} className='text-blue-500'>Login</Link>}
        </p>
      </div>
    </div>
</>
  );
  else  window.location.replace(`/`);
  
};

export default Signup;
