import { useState , useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function  Card({quiz , joinedcontestid}){
    let contest;
    let spinner = <span className="flex items-center justify-center">
      <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-red-600"></span>
    </span>
    contest= quiz.allcontest.find((c)=>c.contestid===joinedcontestid);
    const [remainingTime ,setRemainingTime] = useState(0);
    const[ play , setPlay]=useState(false);
    let quizStatus=remainingTime <0 && remainingTime > -1*quiz.duration*60 ?'Live' :remainingTime < -1*quiz.duration*60 ?'Expired':spinner; // there is one bug as this is child of swiper parent component so all slide have same quiz(as we are using a single variable quizMatch to do all operation) data mean when i slide initial it show the data of prev slide sate on which it was
    
    useEffect(() => {
        const interval = setInterval(() => {
          let lefttime=Math.floor((new Date(quiz.quiztime) - new Date()) / (1000))
          if(lefttime >=0 )
          setRemainingTime(lefttime);
          else
          {
            setRemainingTime(lefttime);
            clearInterval(interval);
          }
        }, 1000);
        return () => clearInterval(interval);
      }, [joinedcontestid ,quiz]);

    if(!play)
    return(
        <div className="px-2"> 
          <div className=' my-4 rounded-lg divide-y   space-y-2 border-2 border-slate-300 shadow-lg w-full p-2'>
              <div className='text-sm font-medium'>{quiz.topic}</div>
              <div className=' w-full  flex items-center justify-between py-2'>
                <div>
                    <p className="text-xs ">Prize Pool</p>
                    <p className=" font-bold text-base"> &#x20B9;{contest.prizepool}</p>
                </div>
                <div className='flex flex-col  items-center'>
                   <p className='text-red-600 font-semibold'>
                        {remainingTime <= 0 ? <p className="bg-red-100 text-red-600  text-sm rounded px-1 ">{quizStatus}</p> :<p className=" bg-red-100 text-red-600  text-sm rounded px-1 ">{Math.floor(remainingTime/3600)}h:
                            <span>{Math.floor((remainingTime%3600)/60)}m:</span>
                            <span>{(remainingTime%3600)%60}s</span>
                        </p>}
                  </p>
                </div>
                <div>
                    <button className={`mt-1 rounded text-center text-white text-semibold text-sm bg-green-600 p-2 
                      ${(remainingTime >=0 || remainingTime < -1*quiz.duration*60) ?'opacity-30': 'opacity-100'}`} 
                      disabled={(remainingTime >=0 || remainingTime <-1*quiz.duration*60)} onClick={()=>setPlay(true)}>
                          Play 
                    </button>
                </div>
              </div>

                <div className='flex justify-between items-center pt-2 '>
                    <div className="basis-1/3 pl-2 flex justify-between items-center">
                        <p className="text-xs "><i class="fa-solid fa-award"></i> {contest.winnerprice[1]}</p>
                        <p className="text-xs "> <i class="fa-solid fa-trophy"></i> {contest.winnerpercentage}%</p>
                    </div>
                    <div className="basis-1/3 text-right pr-2 text-xs"><i class="fa-solid fa-pen-ruler"></i> Flexible</div>
                </div>
            </div>
        </div>
    )
    else
    return( <Navigate to='/play' state={{quiz:quiz , joinedcontestid : joinedcontestid}}></Navigate>)
}
export default Card;