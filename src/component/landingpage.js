import {Link} from 'react-router-dom';
function Landing(){
    return(
        <> 
           <header className='bg-gradient-to-r from-red-600 to-red-900 w-full'>
           <p className='bg-gradient-to-r from-yellow-600 to-yellow-400 text-center text-white text-xl font-medium'>Earning with Learning</p>
             <div className='text-white font-mono italic text-6xl text-center font-bold p-2'>
                Quiz11
              </div>
           </header>
           <section className="py-16 text-center bg-gradient-to-r from-red-600 to-red-900 p-2 text-white">
                <h1 className="text-3xl font-semibold mb-4">Welcome to the Quiz!!</h1>
                <p className="text-lg">
                  Test your knowledge and win exciting prizes!
                </p>
                <button className="bg-tarnsparent  text-white py-2 px-4 mt-4 rounded-full font-bold
                ring-2 ring-red-100 ring-offset-1 ring-offset-white dark:ring-offset-yellow-600">
                 {<Link to='/login'> Get Started</Link>}
                </button>
            </section>
           
           <br/>
           <section>
                <p className='px-2 font-semibold text-lg bg-slate-100'>Reviews & Ratings:</p>
                <div className='flex w-[100vw] h-44 justify-between space-x-4 overflow-x-scroll p-2'>
                    <div className='w-full  shrink-0 h-36 border border-t-1 rounded-xl shadow-xl'>
                        <p className='p-2  w-full max-h-20 overflow-hidden  '> 
                           This IS very super app. I enjoy alot before i was too poor then oneday mausi said play Quiz11 ...rest is history 
                         </p>
                        <div className='flex items-center justify-between  h-16 w-full  orverflow-hidden px-2'> 
                        <p className='font-semibold '>-Sachin</p>
                          <p className='  h-10 w-10 rounded-b-full  rounded-r-full bg-red-600'></p>
                        </div>
                    </div>
                    <div className='w-full  shrink-0 h-36 border border-t-1 rounded-xl shadow-xl'>
                        <p className='p-2  w-full max-h-20 overflow-hidden  '> 
                           This IS very super app. I enjoy lot loremwenf
                         </p>
                        <div className='flex items-center justify-between  h-16 w-full  orverflow-hidden px-2'> 
                        <p className='font-semibold '>-Pathak</p>
                          <p className='  h-10 w-10 rounded-b-full  rounded-r-full bg-red-600'></p>
                        </div>
                    </div>
                    <div className='w-full  shrink-0 h-36 border border-t-1 rounded-xl shadow-xl'>
                        <p className='p-2  w-full max-h-20 overflow-hidden  '> 
                           This IS very super app. I enjoy lot loremwenf
                         </p>
                        <div className='flex items-center justify-between  h-16 w-full  orverflow-hidden px-2'> 
                        <p className='font-semibold '>-Satyam</p>
                          <p className='  h-10 w-10 rounded-b-full  rounded-r-full bg-red-600'></p>
                        </div>
                    </div>
                </div>
           </section>
           
           
           <section>
           <p className='font-semibold text-xl px-2 bg-slate-100'>FAQ:</p>
            <ul className='text-xl w-full pb-2'>
                <li className=' border shadow-inner  p-2 border border-black m-2 transition-all duration-500 h-10 overflow-hidden hover:h-36'>
                    <div className='flex justify-between items-center'>
                        <p className='text-base'>What is Quiz11?</p>
                        <i className="fa-solid fa-angle-down"> </i>
                    </div>
                    <li className='list-disc ml-4 text-base'>Yes1</li>
                </li>  
                <li className=' border shadow-inner  p-2 border border-black m-2 transition-all duration-500 h-10 overflow-hidden hover:h-36'>
                    <div className='flex justify-between items-center'>
                        <p className='text-base'>Is it safe to add money to Quiz11?</p>
                        <i className="fa-solid fa-angle-down"> </i>
                    </div>
                    <li className='list-disc ml-4 text-base'>Yes1</li>
                </li>  
                <li className=' border shadow-inner  p-2 border border-black m-2 transition-all duration-500 h-10 overflow-hidden hover:h-36'>
                    <div className='flex justify-between items-center'>
                        <p className='text-base'>How Quiz11 score calculated?</p>
                        <i className="fa-solid fa-angle-down"> </i>
                    </div>
                    <li className='list-disc ml-4 text-base'>Yes1</li>
                </li> 
                <li className=' border shadow-inner  p-2 border border-black m-2 transition-all duration-500 h-10 overflow-hidden hover:h-36'>
                    <div className='flex justify-between items-center'>
                        <p className='text-base'>When do I get my winnings?</p>
                        <i className="fa-solid fa-angle-down"> </i>
                    </div>
                    <li className='list-disc ml-4 text-base'>Yes1</li>
                </li>  
                <li className=' border shadow-inner  p-2 border border-black m-2 transition-all duration-500 h-10 overflow-hidden hover:h-36'>
                    <div className='flex justify-between items-center'>
                        <p className='text-base' >Which type of contest can I join</p>
                        <i className="fa-solid fa-angle-down"> </i>
                    </div>
                    <li className='list-disc ml-4 text-base'>Yes1</li>
                </li>   
                <li className=' border shadow-inner  p-2 border border-black m-2 transition-all duration-500 h-10 overflow-hidden hover:h-36'>
                    <div className='flex justify-between items-center'>
                        <p className='text-base' >How to Play Quiz11</p>
                        <i className="fa-solid fa-angle-down"> </i>
                    </div>
                    <li className='list-disc ml-4 text-base'>Yes1</li>
                </li>              
            </ul>
           </section>
            <footer className="bg-gray-900 py-4 text-center text-gray-300">
                &copy; 2023 Quiz11
            </footer>
        </>
    )
}
export default Landing;