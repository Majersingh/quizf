import { useState , useRef } from "react";
import { Link } from "react-router-dom";
import React from 'react';

// let c=0;

function Nav(){
    const menulist = useRef(null);
    let [open , setopen]=useState(false);
    if(true)
    return(
        <>
            {/* For Mobile */}
            <div className="lg:hidden md:hidden sm:hidden ">
                <div className="fixed  z-10 w-full h-[7vh] bg-[#5e11c2]  text-white flex items-center justify-between">
                       <div className="float-right ml-2" onClick={()=>{setopen(true); if(!open) menulist.current.focus();}}>
                            {!open?<i className="fa-solid fa-bars"></i>:<div disabled>&#10008;</div>}
                        </div>
                        <div className=" ml-4">
                          MyShop
                        </div>
                        <Link to={'/search'} className="mr-4 font-medium" >
                            <i className="fa-solid fa-magnifying-glass fa-lg"></i>
                        </Link>
                </div>

                <div  className={`fixed z-10 right-0 top-[7vh]  ${open?"w-full h-[93vh]":"w-0 h-0"} transition-all duration-100 ease-in-out delay-100 bg-slate-400/25  outline-none`}>
                    <div  id="menulist" className="w-3/4 outline-none h-[93vh] float-right text-white  bg-[#5e11c2] bg-opacity-90" tabIndex={0} ref={menulist} onBlur={()=>setopen(false)} >
                        <ul className="divide-y  py-4">
                            <li className="hover:bg-slate-400/25 px-2">Home</li>
                            <li className="hover:bg-slate-400/25 px-2">Product</li>
                            <li className="hover:bg-slate-400/25 px-2">About</li>
                            <li className="hover:bg-slate-400/25 px-2">Contact</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* For Desktop */}
            <div className="fixed z-10 sm:flex lg:flex md:flex hidden items-center w-full h-[7vh] bg-[#5e11c2] text-white">
                
                <div className="w-1/2">
                            <div className="ml-2 font-bold">
                                MyShop
                            </div>
                </div>

                <div className="w-1/2 overflow-hidden">
                    <ul className="flex items-center flex-row justify-end">
                        <Link to={'/search'} className="mx-4 font-medium" >
                            <i className="fa-solid fa-magnifying-glass fa-lg"></i>
                        </Link>
                    </ul>
                </div>
                
            </div>
        </>
    );
}

export default Nav;