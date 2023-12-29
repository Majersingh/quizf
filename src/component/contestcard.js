import { useState , useContext } from 'react';
import { UserContext } from '../App';
let width =['w-0' , 'w-1/12' , 'w-2/12','w-3/12','w-4/12','w-5/12','w-6/12','w-7/12','w-8/12','w-9/12' ,'w-10/12', 'w-11/12','w-full'];

function Card({quiz ,contest}){

    const {apiUrl , user}=useContext(UserContext);
    const [isJoinclick , setJoin]=useState(false);
    const [isLoading , setLoading]=useState(0);
    
    const handleJoinreq = async()=>{
        try {
            setLoading(-1);
            const response = await fetch(`${apiUrl}/joincontest` , {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userid:user._id , contest:contest}),
                credentials: 'include'
              });
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            if(data){
                setLoading(1);
                window.location.reload();
            }
            else {
                alert("It seems insufficient Balence");
                setLoading(-2);
                }
        catch (error) {
            console.error('Error fetching joining contest:', error.message);
            return null;
        }   
    }

    const handleJoininfoclose =()=>{
        setJoin(!isJoinclick);
    }
    return(
        <div className="px-2 bg-white"> 
          <div className=' my-4 rounded-lg divide-y   space-y-2 border-2 border-slate-300 shadow-lg w-full p-2'>
              
              <div className='text-sm font-medium'>{quiz.topic}</div>

              <div className=' flex items-center justify-between p-2'>
                <div className="">
                    <p className="text-sm">Prize Pool</p>
                    <p className=" font-bold text-base">&#x20B9;{contest.prizepool}</p>
                </div>
                <div>
                    <p className="text-sm">Entry: <span className="text-green-600 line-through">{contest.entry}</span></p>
                    <button className="mt-1 rounded text-center text-white text-semibold text-base bg-green-600 px-4" onClick={()=>setJoin(!isJoinclick)}>{contest.entry}</button>
                </div>
              </div>

              <div className=" h-[4px]  bg-slate-300 w-full ">
                <div className={`${width[1]}  bg-red-600 h-full transition-width ease-in-out duration-300 `}></div>
              </div>

                <div className='flex justify-between items-center pt-2 '>
                    <div className="basis-1/3 pl-2 flex justify-between items-center">
                        <p className="text-xs "><i class="fa-solid fa-award"></i>{contest.winnerprice[1]}</p>
                        <p className="text-xs "> <i class="fa-solid fa-trophy"></i>{contest.winnerpercentage}%</p>
                    </div>
                    <div className="basis-1/3 text-right pr-2 text-xs"><i class="fa-solid fa-pen-ruler"></i> Flexible</div>
                </div>
                {<Joininfo handleJoininfoclose={handleJoininfoclose} showModal={isJoinclick} contest={contest} isLoading={isLoading} handleJoinreq={handleJoinreq}/>}
            </div>
        </div>
    )
}



function Joininfo(props) {
    let spinner = <span className="flex items-center justify-center">
      <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
    </span>
let loadingState={'0':'Join', '-1': spinner , '1':'Join Successfully' ,'-2':'Failed to Join'}
    return (
      <div className={` transition-all duration-500   border-2  rounded-b-lg first-letter:w-auto bg-slate-100 h-0 bottom overflow-hidden ${props.showModal && 'h-[20vh]'}`}>
          <p className='flex justify-end pr-1 text-center  w-full rounded-full' onClick={props.handleJoininfoclose }><span className='text-base'>X</span></p>
          <div className='flex text-xs justify-between p-2'>
              <div className='flex flex-col'>
                  <p>Prize Pool</p>
                  <p>Winner</p>
                  <p>2nd & 3rd</p>
                  <p>4-50</p>
              </div>
              <div className='flex flex-col'>
                  <p>{props.contest.prizepool}</p>
                  <p>{props.contest.winnerprice[1]}</p>
                  <p>{props.contest.winnerprice[2]} & {props.contest.winnerprice[3]}</p>
                  <p>{props.contest.winnerprice['4-50']}</p>
              </div>
          </div>
          <button className={`bg-green-700 px-4 rounded-b-lg shadow w-full text-white text-sm p-[1px] ${props.isLoading!==0 ? 'opacity-50' : 'opacity-100'}`}  disabled={props.isLoading!==0} onClick={props.handleJoinreq}>{loadingState[props.isLoading]}</button>
      </div>
    );
  };
  
  
export default Card;
