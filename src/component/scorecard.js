import {useNavigate , useLocation , useParams} from 'react-router-dom';
import {useState , useEffect , useContext} from 'react';
import getLocaltime from './readDate';
import { UserContext } from '../App';



function Scoreboard() {
    const  {apiUrl} =useContext(UserContext);
    const [participants , setParticipants] = useState();//all participant in specific quiz with score n rank
    const location= useLocation();
    const [{ contest  , quizid , contestid , topic , quiztime}, setData] = useState(location.state || {});
    const navigate = useNavigate();


    useEffect(()=>{
        if(location.state)
        setData(location.state)
        async function getRank() {
            try {
              const response = await fetch(`${apiUrl}/getrank`,{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body :JSON.stringify({quizid: quizid , contestid:contestid}),
                credentials: 'include'
              });
              if (!response.ok) {
                throw new Error(`HTTP error! from getRank  Status: ${response.status}`);
              }
              const data = await response.json();
              if(data)
              sortAndrank(data , setParticipants);
              else alert ("Failed to get Participants");
            } catch (error) {
              console.error('Error fetching Getrank:', error.message);
              return null;
            }
          }
          if(location.state)
          getRank();
        
    } ,[]);
   console.log(participants);
   if(location.state)
    return (
    <>
    <nav className="fixed w-full  bg-black z-10 text-white ">
        <div className="flex p-2 font-semibold justify-between items-center">
            <i class="fa-solid fa-arrow-left" onClick={()=>{navigate(-1)}}></i>
            <p className='whitespace-nowrap'>{topic} Quiz</p>
            <p className=''>{getLocaltime(quiztime).short} {new Date(quiztime).getFullYear() }</p>
            <div className=' bg-white h-6 w-6 rounded-full flex items-center justify-center'>
              <i className="fa-solid fa-question text-red-600"></i>
            </div>
        </div>
        <div className='flex justify-between p-2'> 
            <div>
                <p>Prize pool</p>
                <p>&#x20B9;{contest.prizepool}</p>
            </div>
            <div>
                <p>Spots</p>
                <p>{contest.totalseat}</p>
            </div>
            <div>
                <p>Entry</p>
                <p>&#x20B9;{contest.entry}</p>
            </div>
        </div>
        <div className='flex justify-between p-2'> 
            <p><i className="fa-solid fa-award"></i> &#x20B9;{contest.winnerprice[1]}</p>
            <p><i class="fa-solid fa-trophy"></i> {contest.winnerpercentage}</p>
        </div>
    </nav>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    {participants ? participants.map((p)=>(<Card p={p} key={Math.random()}/>)) : 
        <span className="flex items-center w-full h-[90vh] bg-slate-400/25 bg-opacity-90 justify-center">
            <span className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-red-600"></span>
        </span>}
    </>
  );
  else window.location.replace('/');
}

export default Scoreboard;
function Card({p}){
    return(
        <> 
          <div className='flex justify-between items-center border shadow-lg mb-2 p-2 space-x-1'>
            <img src=""  alt='' className=' h-12 w-12 rounded-full object-fit bg-slate-300'/>
            <p className='w-[50vw] truncate text-center'>{p.userid.split(" ")[0]}</p>
            <p className='w-[25vw] truncate text-center'>Point: {p.correctedAnswer*10}</p>
            <p className='w-[20vw] truncate text-center'><span className='text-green-600 font-semibold'> #{p.rank}</span></p>
          </div>
        </>
    )
}

function sortAndrank(contestParticipants,setParticipants){
    contestParticipants.sort((a, b) => {
        if (b.correctedAnswer - a.correctedAnswer === 0) {
          // If correctedAnswer is the same, comparing by submission time
          const timeDifference = new Date(a.submittime) - new Date(b.submittime);
          return timeDifference;
        } else {
          // Sort by correctedAnswer in descending order
          return b.correctedAnswer - a.correctedAnswer;
        }
      });
      //assigning ranking
      for (let i = 0; i < contestParticipants.length; i++) {
          contestParticipants[i].rank =i+1
      }
      setParticipants(contestParticipants);
}