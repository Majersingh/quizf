import React, { useState,  useRef , useEffect , useContext} from 'react';
import  { redirect, useLocation , Navigate} from 'react-router-dom';
import { UserContext } from '../App';

let totalTime;
const Test =()=>{

  const {apiUrl , user}=useContext(UserContext);
  const [isSubmitted , setSubmit] = useState(false);
  const [viewResult , setViewResult] = useState(false);
  const [attemptCount ,setatemmptCount] = useState(0);
  const [remaingTime ,setRemainingTime] = useState();
  const storeResponse  = useRef([]);
  let location = useLocation();// this acces passed date from prev page or state
  let questions , contest;
  if(location.state) 
  { 
    questions=location.state.quiz.question;
    contest= location.state.quiz.allcontest.find((c)=>c.contestid===location.state.joinedcontestid);
  }
  

  
  const setResponse = (response) => {
    const newResponse = { qid: response.qid, selectedOption: response.selectedOption };
    const existingResponseIndex = storeResponse.current.findIndex((res) => res.qid === response.qid);
    if (existingResponseIndex !== -1) {
      storeResponse.current[existingResponseIndex] = newResponse;
    } else {
      storeResponse.current.push(newResponse);
      setatemmptCount(attemptCount + 1);
    }
  };
  
  const handleSubmit= async()=>{
    console.log({ userid:user._id , quizid:location.state.quiz._id , contestid:location.state.joinedcontestid , response:storeResponse.current})
    try {
      setSubmit(true);
      const response = await fetch(`${apiUrl}/joincontest` , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userid:user._id , contest:{quizid:location.state.quiz._id , contestid:location.state.joinedcontestid , response:storeResponse.current}}),
          credentials: 'include'
        });

      if (!response.ok) {
      throw new Error(`HTTP error! Status for submiting answer: ${response.status}`);
      }
      const data = await response.json();
      if(data)
      {
       if(window.confirm("Submitted Successfully , Would You Like See Yor Current Status"))
       setViewResult(true);
       else
       window.location.replace('/');
      }
      else 
      {
        setSubmit(false);
        alert("Failed to submit Please! May Be You Already Submitted Early Else try again");
        window.location.replace('/');
      }
      
    } catch (error) {
      console.error('Error for submiting answer:', error.message);
      return null;
    }     
  }
  
  useEffect(() => {
    if(location.state) // this to ensure direct i.e by link test not accessible n avoid error
    totalTime=location.state.quiz.duration*60 - Math.abs((new Date()- new Date(location.state.quiz.quiztime))/(1000));//convert to seconds
    const interval = setInterval(() => {
      totalTime--;
      setRemainingTime(totalTime);
      if(totalTime===0)
      {
        handleSubmit();
        clearInterval(interval);
      }
      else if(totalTime <0)
      {
        clearInterval(interval);
        handleSubmit();
        // window.location.replace('/');
      }

    }, 1000);
    return () => clearInterval(interval);
  }, []);
 
  if(location.state && questions && !viewResult)
  return(
    <>
     <p className={`text-2xl z-20 font-medium text-white bg-green-600 w-full text-center overflow-hidden  transition-all duration-300 ${isSubmitted ?'h-10 fixed': 'h-0'}`}>Thank You!</p>
     <div className={`fixed z-10 inset-0 flex flex-col items-center justify-start bg-black bg-opacity-40 ${!isSubmitted && 'hidden'}`}></div>
     <div className='fixed w-full'>
        <div className='flex justify-between bg-slate-600 font-normal text-white p-2'>
          <p>Attempted : {attemptCount}/{questions.length}</p>
          <p><i className="fa-regular fa-clock animate-pulse"></i> <span className=''>{Math.floor(remaingTime/60)+':'+Math.floor(remaingTime%60)}</span></p>
        </div>
        <div className='flex flex-wrap w-full justify-between bg-white shadow-lg'>
        {questions.map((question ,index) => (<div key={index} 
          className={`float-left text-center h-8 w-8 border- ${storeResponse.current.find((res)=>res.qid===question.qid)?' bg-green-600':' bg-slate-300'}`}
           onClick={()=>{document.getElementById(index+1).scrollIntoView({ behavior: 'smooth' ,block: 'center', })}}>
            {index+1}
          </div>))
        }
        </div>
     </div>

      <br/>
      <ol  className='mt-16 list-decimal pl-6'>
        {questions.map((questions,index) => (
          <MCQcard  qnumber={`${index+1}`} question={questions.questionText}  options={questions.options} ans={questions.ans} setResponse={setResponse} qid={questions.qid} key={questions.qid}/>
        ))}
      </ol>
      <button  className=' float-right mt-2 text-white w-1/2 rounded bg-blue-600 p-2 m-2 ' onClick={handleSubmit}>Submit</button>
    </>
  )
  else if(viewResult) 
  return  <Navigate to={`/scorecard?q=${location.state.quiz._id}`} state={{contest:contest , quizid:location.state.quiz._id ,contestid:location.state.joinedcontestid , quiztime:location.state.quiz.quiztime ,topic:location.state.quiz.topic}}/>
  else  return <a  href='/' className='text-blue-600 underline'> Test Expired Or Yet To Come -{">"} Go To Home </a>
}


 function MCQcard({ question, options ,setResponse ,qid ,qnumber }){
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setResponse({selectedOption:e.target.value , qid:qid});
  };
  return (
    <li id={`${qnumber}`}>
    <div className="bg-white p-2 border-b-2">
      <p className="text-base font-semibold">{question}</p>
      <form>
        {options.map((option, index) => (
          <div key={index} className="mb-1">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                id={`option-${index}`}
                name="mcq-options"
                value={option}
                onChange={handleOptionChange}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="text-base">{option}</span>
            </label>
          </div>
        ))}
      </form>
      <p className="mt-4">
        Selected Option: <span className="font-semibold">{selectedOption}</span>
      </p>
    </div>
    </li>
  );
};

export default Test;


