import {  Navigate} from "react-router-dom";
import { useState , useEffect , useRef } from "react";
import getLocaltime from "./readDate";

function Matchcard({quiz}){
  const [redirect , setRedirect]= useState();
  const [remainingTime ,setRemainingTime] = useState(0);
  
  let spinner = <span className="flex items-center justify-center">
      <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-red-600"></span>
    </span>
  let quizStatus=remainingTime <=0 && (remainingTime < 0 ?'Live': spinner) 
  useEffect(() => {
    const interval = setInterval(() => {
      let lefttime=Math.floor((new Date(quiz.quiztime) - new Date()) / (1000))
      if(lefttime>=0)
      setRemainingTime(lefttime);
      else{
        setRemainingTime(lefttime);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
    if(!redirect)
    return(
        <> 
          <div className=' my-4 rounded-lg divide-y  border-2 border-slate-300 shadow-lg h-[] w-full '>
              
              <div className='rounded-t-lg h-[4vh] w-full bg-slate-100 p-0  flex items-center' onClick={()=>setRedirect(true)}>
                <p className='p-2 font-medium text-start w-2/3'>{quiz.topic}</p>
              </div>

              <div className='p-2 px-4 h-[7vh] flex flex-row items-center justify-between ' onClick={()=>setRedirect(true)}>
                  <p className='text-lg font-normal'>Q{quiz.totalquestion}</p>
                  {(remainingTime<=24*3600 && remainingTime >0) ?
                   <p className=" bg-red-100 text-red-600  text-sm font-semibold rounded px-1 ">{Math.floor(remainingTime/3600)}h:
                    <span>{Math.floor((remainingTime%3600)/60)}m:</span>
                    <span>{(remainingTime%3600)%60}s</span>
                   </p> :
                    <p className="bg-red-100 text-red-600  text-sm rounded px-1 ">{quizStatus}</p>
                  }
                  <p className='text-base font-normal'>
                    <span className="font-medium">{getLocaltime(quiz.quiztime).short} </span>  
                    {getLocaltime(quiz.quiztime).time}
                  </p>
              </div>

              <div className='p-2' >
                <div className='flex justify-between items-center'>
                  <p className="text-sm text-yellow-950 bg-gradient-to-r from-yellow-600 via-yellow-300 to-white rounded p-[1px]" onClick={
                    ()=>setRedirect(true)}>
                    Mega &#x20B9; {quiz.megaprize} 
                  </p>
                  <button className=""><i class="fa-regular fa-bell "></i></button>
                </div>
              </div >

            </div>
        </>
    )
    else 
    return(<Navigate to={`/contestlist/${quiz._id}`} state={quiz} />)
}
export default Matchcard;

