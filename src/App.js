import { useState, createContext , useEffect, useRef} from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Landing from './component/landingpage.js'
import Login from './component/login.js'
import Contestlist from './component/contestlist.js'
import Signup from './component/signup.js'
// import Navbtn from './component/navigationbtn.js'
import Home from "./component/home.js";
import Scorecard from "./component/scorecard.js";
import  Test from "./component/Test.js";
let c=0;
export const UserContext = createContext();
// const MemoizedHome = memo(Home);//// This is to avoid re-rendering on parent's component state changes
// const apiUrl=process.env.REACT_APP_API_URL;
// const apiUrl='http://13.232.212.71:8000';
// const apiUrl='http://127.0.0.1:8000';
const apiUrl='https://quizback-production-73b6.up.railway.app';
console.log(apiUrl);

const App = () => {
  const [user, setUser] = useState();
  const [quizMatch, setquizMatch] = useState();
  const [isAuthenticated, setAuthentication] = useState(false);
  const querytogetMatchlist = useRef({collectionname: undefined , pagename: undefined, status:undefined  , isSubmitted:undefined})//colllectionname mean to know whicj subject related  data like general maths or etc and status is quiz compltedt or open and issubmiited to know to get completed quiz
  const catchedquizesData = useRef({});
  console.log(c++ , catchedquizesData.current);

   const setQuerytogetaquizmatch = (query , source)=>{
    console.log( "from where it called " , source);
      query.forEach(q => {
        querytogetMatchlist.current[q.keyname] =  q[q.keyname];
      });
      if(querytogetMatchlist.current.pagename && querytogetMatchlist.current.collectionname && querytogetMatchlist.current.status)
      { 
        if(catchedquizesData.current[querytogetMatchlist.current.collectionname+querytogetMatchlist.current.pagename+querytogetMatchlist.current.status+querytogetMatchlist.current.isSubmitted])
        setquizMatch(catchedquizesData.current[querytogetMatchlist.current.collectionname+querytogetMatchlist.current.pagename+querytogetMatchlist.current.status+querytogetMatchlist.current.isSubmitted]);
        else
        getQuizmatch(setquizMatch ,querytogetMatchlist.current , catchedquizesData , user && user._id ,source); 
      }
      else
     console.log("No Query to Set to get quiz contest");
   }
   
  
  useEffect(() => {
    let tempFunc= async () => {
    let userid;
    userid =await checkAuthentication(setAuthentication );
    if(userid) getUser(userid , setUser);
    else console.log("No user found from checkauth")
    };
    tempFunc();
  },[]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{apiUrl, user, isAuthenticated , quizMatch , catchedquizesData ,setquizMatch, setQuerytogetaquizmatch ,querytogetMatchlist}}>
        <Routes>
          <Route exact path="/" element={isAuthenticated ?<Home/>: <Landing/>}  replace={true}/>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/play" element={isAuthenticated ?<Test/>: <Login/>} />
          <Route exact path="/contestlist/:quizid" element={isAuthenticated ?<Contestlist/>: <Login/>} />
          <Route exact path="/scorecard" element={isAuthenticated ?<Scorecard/>: <Login/>} />
          <Route exact path="/account" element={isAuthenticated ?<>Profile</> : <Login/>} />
          <Route path="*" element={<ErrorPage/>} />
        </Routes> 
      </UserContext.Provider>
    </BrowserRouter>
  );
};



//  *********************************these are independent funtions*******************************
  async function checkAuthentication(setAuthentication) {
    try {
      const response = await fetch(`${apiUrl}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      if (!response.ok) {
        console.log("Access Denied ");
        return false;
      }
      else {
        let user;
        user = await response.json();
          setAuthentication(true);
          return user.userid;
      }
      
    } catch (error) {
      console.error('Error: to Check Authentication', error);
      return false;
    }
  }
  

  async function getUser(userid , setUser) {
    try {
      const response = await fetch(`${apiUrl}/getuser?userid=${userid}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error.message);
      return null;
    }
}


async function getQuizmatch(setquizMatch ,query , catchedquizesData , userid) {
  try {
    const response = await fetch(`${apiUrl}/findcontest`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body :JSON.stringify({query:query , userid:userid}),
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error(`HTTP fetching contestlist Status: ${response.status}`);
    }
    const data = await response.json();
    if(data)
    {
      catchedquizesData.current[query.collectionname+query.pagename+query.status+query.isSubmitted]=data;
      console.log("requested quiz ", data);
      setquizMatch(data);
    }
    else alert("Failed to get quiz or contest for Requested category")
  } catch (error) {
    console.error('Error fetching contestlist data:', error.message);
    return null;
  }
}

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Error</h1>
        <p className="text-lg mb-6">Oops! This Page Not Found</p>
        <Link to="/" className="text-blue-500 underline">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default App;
