import { useState , useEffect , useContext } from 'react';
import { useLocation} from "react-router-dom";
import Slide from './addslide.js';
import Navigation from './navigationbtn.js';
import Quizcard from './quizcard.js';
import Homenav from './homenav.js';
import Myquizes from './myquizes.js';
import  Skeletonloading from "./skeletonloading.js";
import { UserContext } from "../App";

function Home(){
  const [currentPage , setCurrentpage]= useState();
  const getPath = new URLSearchParams(useLocation().search);
  useEffect(()=>{
    switch(getPath.get('p')){
      case 'home' : setCurrentpage(<Homepage />);
      break;
      case 'myquiz': setCurrentpage(<Myquizes/>);
      break;
      case 'winner': setCurrentpage(<></>);
      break;
      default : setCurrentpage(<Homepage />);
    }
    
  },[getPath.get('p')])
    return(
        <> 
          <Homenav/>
          {currentPage}
          <br/>
          <br/>
          <Navigation />
        </>
    )
}
function Homepage(){
  const { quizMatch} = useContext(UserContext);
  return(
    <div className='p-2'>
      <Slide/>
      <p className='mt-1 font-medium text-base'> Upcoming Matches</p>
      {quizMatch ? 
        quizMatch.map((q,index)=>{
          return <Quizcard quiz={q} key={index*2.453}/>
        }) : 
      <Skeletonloading/>}
    </div>
  )
}
export default Home;