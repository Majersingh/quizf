import {Link , useLocation } from "react-router-dom";
import {useContext , useEffect} from 'react';
import { UserContext } from "../App";

const Navbtn= ()=>{
    const {setQuerytogetaquizmatch } = useContext(UserContext);
     const getPath = new URLSearchParams(useLocation().search);  
    useEffect(()=>{
      setQuerytogetaquizmatch([{ keyname :'pagename' , pagename:getPath.get('p')?getPath.get('p'):'home'} ,{keyname:'status' , status:'open'} ,{keyname:'isSubmitted' , isSubmitted:false}] ,"from navigation");
    },[getPath.get('p')])
    return(
        < div className="fixed z-10 bottom-0 w-full">
            <div className="flex flex-row divide-x-2 bg-white ">
                {<Link to={'/?p=home'}  className={`basis-1/4 border p-1  text-center ${(getPath.get('p')==='home'||  !getPath.get('p')) && 'text-red-600'}`} >
                  <button  className={`inline-block p-1 text-sm leading-tight uppercase ${(getPath.get('p')==='home'|| !getPath.get('p')) ? 'text-red-600': 'text-slate-300'}`}>
                    <i className="fa-solid fa-house fa-xl"></i>
                  </button>
                   <div className="p-0 text-xs font-thin">Home</div>
                </Link>}
                {<Link to={'/?p=myquiz'}  className={`basis-1/4 border p-1  text-center ${getPath.get('p')==='myquiz' && 'text-red-600'}`}>
                  <button  className={`inline-block p-1 text-sm leading-tight uppercase ${getPath.get('p')==='myquiz' ? 'text-red-600': 'text-slate-300'}`} >
                    <i className="fa-solid fa-trophy fa-xl"></i>
                  </button>
                    <div className=" p-0 text-xs font-thin">MyQuiz</div>
                </Link>}
                {<Link to={'/account?p=account'}  className={`basis-1/4 border p-1  text-center ${getPath.get('p')==='account' && 'text-red-600'}`}>
                   <button  className={`inline-block p-1 text-sm leading-tight uppercase ${getPath.get('p')==='account' ? 'text-red-600': 'text-slate-300'}`}  >
                    <i className="fa-solid fa-square-plus fa-xl"></i> 
                  </button>
                  <div className=" p-0 text-xs font-thin">Social</div>
                </Link>}
                {<Link to={'/?p=winner'} className={`basis-1/4 border p-1  text-center ${getPath.get('p')==='winner' && 'text-red-600'}`}>
                  <button  className={`inline-block p-1 text-sm leading-tight uppercase ${getPath.get('p')==='winner' ? 'text-red-600': 'text-slate-300'}`}  >
                  <i className="fa-solid fa-award fa-xl"></i>
                  </button>
                  <div className="p-0 text-xs font-thin">Winner</div>
                </Link>}
                
            </div>
        </div>
    )
}
export default Navbtn;