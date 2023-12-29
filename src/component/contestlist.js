//this page show list of contest for a specific quiz match
import {useRef  , useEffect, useState , useContext} from 'react';
import {useLocation , useParams , Link} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import {Contestlistnavtop , SortnFilter} from './contestlistnav';
import Contestcard from './contestcard';
import Skeletonloading from './skeletonloading';
import Myjoinedcontest from './joinedcontestcard';
import {UserContext} from '../App'
 
export default function Slidepage() {
 const  {user , quizMatch , setQuerytogetaquizmatch} =useContext(UserContext);
  const [toCategory , setTocategory]=useState({contestlist:true , mycontest:false ,guide:false});// this to know on which page you are of contest list
  const swiperRef = useRef(null);
  const location= useLocation();
  const { quizid } = useParams();
  let [quiz , setQuiz]=useState(location.state);
  console.log(location.state,"fdgchbjnmk,")
  const handleJumpTocategory = (toSlideno) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(toSlideno); // 0-based index, so 2 is the third slide
    }
  };

  if(!quiz)//this rin when link is being opened no quiz found redirect to home
  {
    let timeout =setTimeout(()=>{
      clearTimeout(timeout);
      window.location.replace('/');
    },6000);
    
  }
  

  useEffect(()=>{
    if(quiz )
     console.log("All contest of  Quiz Found")
    else
    setQuerytogetaquizmatch([{ keyname :'collectionname' ,collectionname:'general'+'quizmatch'} ,{ keyname :'status' ,status:'open'} ,{ keyname :'pagename' ,pagename:'home'}] ,"contest list"); //this run when linke is being shared
    if(quizMatch)///this is for find contest if link is shared by quizid from link
    setQuiz(quizMatch.find((q)=>q._id === quizid));
    
  },[quizMatch])//this is for find contest if link is shared 

  if(quiz && user)
  return (
    <>
      <Contestlistnavtop handleJumpTocategory={handleJumpTocategory} heading={quiz.totalquestion} time={quiz.quiztime} toCategory={toCategory} />
      <Swiper className="mySwiper" ref={swiperRef} onSlideChange={(swiper) => setTocategory({contestlist:swiper.realIndex===0 , mycontest:swiper.realIndex===1 ,guide:swiper.realIndex===2})}>
        
        <SwiperSlide>
          <marquee behavior="scroll" direction="left" scrollamount="10" className='text-center text-yellow-950 w-full px-2 bg-gradient-to-r from-yellow-800 via-yellow-700 to-yellow-600'>
              win up to &#x20B9;100000
          </marquee>
          {/*contest is being pass sepratly because to pass required contest in card else in card we have to find using loop */}
            {user['generalquizmatchjoined'][quiz._id] ?
             <p className='p-1 text-center text-sm rounded shadow-xl'> <i class="fa-regular fa-face-smile animate-pulse"></i> You Joined Successfully</p>
             :
             <>
              <SortnFilter/> 
              {quiz.allcontest.map((c)=>(<Contestcard quiz={quiz} contest={c}/>))}
             </>  
            }
        </SwiperSlide>

        <SwiperSlide>
          { user ? (user[`${'general'}${'quizmatch'}${'joined'}`][quiz._id] ? <Myjoinedcontest quiz={quiz} key={'q'} joinedcontestid={user['generalquizmatchjoined'][quiz._id]} />
            :<div className='flex felx-col items-center flex-col p-2'>
              <p className='font-thin p-2'>You Don't have any contest</p>
              { <Link  to='/' className='p-1  rounded bg-green-600 text-white'>Explore</Link>}
            </div>) :
            <Skeletonloading/>
          }
        </SwiperSlide>

        <SwiperSlide>
          <Guide/>
        </SwiperSlide>

      </Swiper>
    </>
  );
  else
  return (
    <span className="flex items-center bg-slate-900 h-[100vh] w-[100vw] bg-opacity-10  justify-center">
     <span className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-red-600"></span>
    </span>
  )
}
 function Guide(){
  return (
    <>
      <ul className='list-disc pl-6 pt-2 font-extralight text-base'>
        <li>Play Care fully</li>
        <li>Play at Own Risk</li>
        <li>Participate in a single contest at specific time</li>
        <li>Participate in a topic in which you are pro</li>
      </ul>
    </>
  )
 }
