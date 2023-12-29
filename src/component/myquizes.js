import { useRef , useState ,useEffect, useContext } from 'react';
import {Link, Navigate} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';// Import Swiper styles from its module
import  Skeletonloading from "./skeletonloading.js";
import Myjoinedcontest from './joinedcontestcard';
import getLocaltime from "./readDate";
import { UserContext } from '../App';
 
function Slidepage() {
  const swiperRef = useRef(null);
  const {setQuerytogetaquizmatch ,quizMatch , setquizMatch, user , querytogetMatchlist} = useContext(UserContext);
  const [toCategory , setTocategory]=useState({upcoming:true , completed:false  ,live:false});// this to know on which page you are of myquiz(upcoming , live , completed)

  const handleJumpTocategory = (toSlideno) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(toSlideno); // 0-based index, so 2 is the third slide
    }
  };
  console.log(quizMatch)
  useEffect(()=>{
    setquizMatch(undefined);
    setQuerytogetaquizmatch([{keyname:'status' , status:(toCategory.upcoming ||toCategory.live)?'open':'completed'} , {keyname:'isSubmitted' , isSubmitted:(toCategory.upcoming || toCategory.live)?false :true}] , "from my quizes");
  },[toCategory]);
  if(user)
  return (
    <>
      <Myquizesnav toCategory={toCategory} handleJumpTocategory={handleJumpTocategory}  />
      <br/>
      <Swiper className="mySwiper" ref={swiperRef} onSlideChange={(swiper) => setTocategory({upcoming:swiper.realIndex===0 , completed:swiper.realIndex===1 ,live:swiper.realIndex===2})}>
         
        {/* Slide 0 */}
        <SwiperSlide>
        {quizMatch && user ? (
            quizMatch.map((match, index) => {
              const userJoinedcontestid = user[querytogetMatchlist.current.collectionname + 'joined'][match._id];
              if (userJoinedcontestid) {
                return (
                  <Myjoinedcontest quiz={match} key={index * 3.11}  joinedcontestid={userJoinedcontestid} />
                );
              }
              return null; 
            })
          ) : (
            <Skeletonloading />
          )}
          { quizMatch && (quizMatch.length<=0 && <p className='mt-8 text-center '>It Seems Empty</p>)}
        </SwiperSlide>

          
        {/* SLide 1 */}
        <SwiperSlide>
        {quizMatch && user ? (
            quizMatch.map((match, index) => {
              const userJoinedcontestid = user[querytogetMatchlist.current.collectionname + 'joined'][match._id];
              if (userJoinedcontestid) {
                return (
                  <Completedcard quiz={match} key={index * 5.112}  joinedcontestid={userJoinedcontestid}  user={user}/>
                ); 
              }
              else return null;
            })
          ) : (
            <Skeletonloading />
          )}
          { quizMatch && (quizMatch.length===0 && <p className='mt-8 text-center '>It Seems Empty</p>)}
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          Slide3
        </SwiperSlide>

      </Swiper>
    </>
  );
  else window.location.replace('/');
}


function Myquizesnav(props){
    return(
    <>
    <br/>
    <br/>
    <br/>
    <br/>
    <div className="fixed w-full shadow-lg  mt-2 bg-white z-10">
        <div className='w-full flex justify-between items-center text-sm font-medium pt-2 px-2'>
            <div className="" onClick={()=>{props.handleJumpTocategory(0);}}>
                <p>Upcoming</p>
                <p className={`h-[2px]  transition-all  durartion-1000 ease-in-out rounded-t-lg ${props.toCategory.upcoming && ' bg-red-600 translate-x-0'}`}></p>
            </div>
            <div className="" onClick={()=>{props.handleJumpTocategory(1);}}>
                <p>Completed</p>
                <p className={`h-[2px]  transition-all  durartion-1000 ease-in-out rounded-t-lg -translate-x-12 ${props.toCategory.completed && ' bg-red-600 translate-x-0'}`}></p>
            </div>
            <div className="" onClick={()=>{props.handleJumpTocategory(2);}}>
                <p>Live</p>
                <p className={`h-[2px]  transition-all  durartion-1000 ease-in-out rounded-t-lg -translate-x-12 ${props.toCategory.live && ' bg-red-600 translate-x-0'}`}></p>
            </div>
        </div>
    </div>
    <br/>
    </>)
}

function Completedcard({quiz  , joinedcontestid ,user}){
    let contest =quiz.allcontest.find((c) => c.contestid === joinedcontestid);
    let result= quiz.participants.find((p)=>p.userid===user._id)
    const[redirect , setRedirect]= useState(false);
    if(!redirect)
    return(
        <div className="px-2"> 
          <div className=' my-4 rounded-lg divide-y   space-y-2 border-2 border-slate-300 shadow-lg w-full p-2'>
              <div className='flex justify-between items-center'>
                <p className='font-semibold'>Q{quiz.totalquestion+" " } {quiz.topic}</p>
                <time className='text-xs'>{getLocaltime(quiz.quiztime).full}</time>
              </div>
              <div className='p-2 flex items-center justify-between'>
                <p className='text-base'>Your Score: <span className='text-green-600 font-semibold'>{result.correctedAnswer*10}</span></p>
                <p className='text-slate-600'>Completed</p>
                <div className='shadow-inner p-1 border'>
                  <button  onClick={()=>setRedirect(true)}>
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
        </div>
    )
    else
    return <Navigate to={`/scorecard?q=${quiz._id}`} state={{contest:contest , quizid:quiz._id ,contestid:joinedcontestid , quiztime:quiz.quiztime ,topic:quiz.topic}}/>
   
    
}
export default Slidepage;