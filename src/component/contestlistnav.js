import {useNavigate} from 'react-router-dom';
import readDate from './readDate'
function Contestlistnavtop(props){
    const navigate = useNavigate();
    return(
        <> 
          <div className="fixed w-full z-10">
                <div className="flex bg-black p-2 text-white items-center">
                    <i class="basis-1/4 fa-solid fa-arrow-left" onClick={()=>{navigate(-1)}}></i>
                    <div className='whitespace-nowrap'>Q{props.heading} {readDate(props.time).short} {readDate(props.time).time }</div>
                    <div className='basis-2/3 space-x-4 justify-end flex items-center'>
                        <i class="fa-regular fa-bell text-[#ffffff]"></i>
                        <i class="fa-solid fa-wallet text-[#ffffff]"></i>
                    </div>
                </div>

                <div className="shadow-lg bg-white">
                    <div className='w-full flex justify-between items-center text-sm font-medium pt-2 px-2'>
                        <div className="" onClick={()=>{props.handleJumpTocategory(0);}}>
                            <p>Contests</p>
                            <p className={`h-[2px] transition-all  durartion-1000 ease-in-out rounded-t-lg ${props.toCategory.contestlist && ' bg-red-600 translate-x-0'}`}></p>
                        </div>
                        <div className="" onClick={()=>{props.handleJumpTocategory(1);}}>
                            <p>My Contests</p>
                            <p className={`h-[2px] transition-all  durartion-1000 ease-in-out rounded-t-lg -translate-x-12 ${props.toCategory.mycontest && ' bg-red-600 translate-x-0'}`}></p>
                        </div>
                        <div className="" onClick={()=>{props.handleJumpTocategory(2);}}>
                            <p>Guide</p>
                            <p className={`h-[2px] transition-all  durartion-1000 ease-in-out rounded-t-lg -translate-x-12 ${props.toCategory.guide && ' bg-red-600 translate-x-0'}`}></p>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
        </>
    )
}
 function  SortnFilter(props){
    return(
        <>  
            <div className="bg-slate-100 flex  flex-row  shadow-inner overflow-x-auto  space-x-4 border-b-2 text-xs items-center p-2">
                <p className="whitespace-nowrap">Sort by : </p>
                <p className="">ENTRY</p>
                <p className="" >SPOTs</p>
                <p className="">PRIZPOOL</p>
                <p className="">WIN%</p>
                <p></p>
                <i class="fa-solid fa-filter fa-xl fixed right-2"></i>
            </div>
        </>
    )
 }
export {Contestlistnavtop , SortnFilter};