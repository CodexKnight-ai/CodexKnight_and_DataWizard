import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Admin = () => {



    return (
        <>
            <section className="flex gap-[2em] flex-row w-screen h-screen ">
                <div className="bg-[url('/Police_LSPD.jpg')]  w-full h-full flex gap-[2em] flex-row">
                    <div className=' m-6 rounded-[2em] backdrop-blur-md flex flex-col w-[30%] backdrop-brightness-75 '>
                        <div className="w-full h-full flex items-center font-gtaHeadingText2 text-[1.6em] px-6 py-3  border-b-whitish border-solid border-b-2 rounded-sm text-whitish rounded-tr-[1.4em] rounded-tl-[1.4em] hover:bg-dblue hover:text-whitish hover:cursor-pointer  transition-all duration-[0.2s]">
                            <Link to="/admin-most-wanted" className=" no-underline flex justify-between w-full items-center">
                                Most Wanted
                                <FontAwesomeIcon className="rounded-full h-[0.9em] w-[0.9em] border-2 p-2 border-white  " icon={faAngleRight} style={{ color: "#ffffff" }} />
                            </Link>
                        </div>
                        <div className="w-full h-full flex items-center font-gtaHeadingText2 text-[1.6em] px-6 py-3  border-b-whitish border-solid border-b-2 rounded-sm text-whitish  hover:bg-dblue hover:text-whitish hover:cursor-pointer  transition-all duration-[0.2s]">
                            <Link to="/admin-self-defense" className="no-underline flex justify-between w-full items-center">
                                Self Defense
                                <FontAwesomeIcon className="rounded-full h-[0.9em] w-[0.9em] border-2 p-2 border-whitish  " icon={faAngleRight} style={{ color: "#ffffff" }} />
                            </Link>
                        </div>
                        <div className="w-full h-full flex items-center font-gtaHeadingText2 text-[1.6em] px-6 py-3  border-b-whitish border-solid border-b-2 rounded-sm text-whitish  hover:bg-dblue hover:text-whitish hover:cursor-pointer  transition-all duration-[0.2s]">
                            <Link to="/admin-career" className=" no-underline flex justify-between w-full items-center">
                                Career
                                <FontAwesomeIcon className="rounded-full h-[0.9em] w-[0.9em] border-2 p-2 border-whitish  " icon={faAngleRight} style={{ color: "#ffffff" }} />
                            </Link>
                        </div>
                        <div className="w-full h-full flex items-center font-gtaHeadingText2 text-[1.6em] px-6 py-3  border-b-whitish border-solid border-b-2 rounded-sm text-whitish  hover:bg-dblue hover:text-whitish hover:cursor-pointer  transition-all duration-[0.2s]">
                            <Link to="/admin-userTips" className="no-underline flex justify-between w-full items-center">
                                User-Tips
                                <FontAwesomeIcon className="rounded-full h-[0.9em] w-[0.9em] border-2 p-2 border-whitish  " icon={faAngleRight} style={{ color: "#ffffff" }} />
                            </Link>
                        </div>
                        <div className="w-full h-full flex items-center font-gtaHeadingText2 text-[1.6em] px-6 py-3  border-b-whitish border-solid border-b-2 rounded-sm text-whitish  hover:bg-dblue hover:text-whitish hover:cursor-pointer  transition-all duration-[0.2s]">
                            <Link to="/admin-lostfound" className=" no-underline flex justify-between w-full items-center">
                                Lost & Found
                                <FontAwesomeIcon className="rounded-full h-[0.9em] w-[0.9em] border-2 p-2 border-whitish  " icon={faAngleRight} style={{ color: "#ffffff" }} />
                            </Link>
                        </div>
                        <div className="w-full h-full flex items-center font-gtaHeadingText2 text-[1.6em] px-6 py-3  border-b-whitish border-solid border-b-2 rounded-sm text-whitish  hover:bg-dblue hover:text-whitish hover:cursor-pointer  transition-all duration-[0.2s]">
                            <Link to="/admin-lostfound" className=" no-underline flex justify-between w-full items-center">
                                Add Admin
                                <FontAwesomeIcon className="rounded-full h-[0.9em] w-[0.9em] border-2 p-2 border-whitish  " icon={faAngleRight} style={{ color: "#ffffff" }} />
                            </Link>
                        </div>
                        <div className="w-full h-full flex items-center font-gtaHeadingText2 text-[1.6em] px-6 py-3  rounded-sm text-whitish rounded-br-[1.4em] rounded-bl-[1.4em] hover:bg-dblue hover:text-whitish hover:cursor-pointer  transition-all duration-[0.2s]">
                            <span className="no-underline flex justify-between w-full items-center">Send Emergency SMS</span>
                            <FontAwesomeIcon className="rounded-full h-[0.9em] w-[0.9em] border-2 p-2 border-whitish  " icon={faAngleRight} style={{ color: "#ffffff" }} />
                        </div>
                    </div>
                    <div className="m-6 w-[70%] font-gtaHeadingText1 text-[7vw] text-white flex flex-col items-end justify-end text-right">
                        <div className=''>
                             <span className='drop-shadow-[0_35px_35px_rgba(255,0,0,0.4)] '>LSPD</span><br />
                             <span className='drop-shadow-[0_35px_35px_rgba(0,0,255,0.8)]'>ADMIN PORTAL</span>
                        </div>
                    </div>

                </div>

            </section>
        </>
    )
}




export default Admin