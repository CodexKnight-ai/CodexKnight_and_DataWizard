import React from 'react';
import { Link } from 'react-router-dom'; 


const Admin =() => {

    return(
       <>
            <section className="flex gap-[2em] flex-col justify-center items-center w-screen h-screen bg-gray-500">
                <div className="font-gtaHeadingText2 text-[2vw] text-white">LSPD</div>
                <div className='flex gap-2'>
                     <button className="px-6 py-3 bg-dblue border-whitish border-solid border-2 rounded-sm text-whitish">
                         <Link to="/admin-most-wanted" className="text-whitish no-underline">Most Wanted</Link>
                     </button>
                     <button className="px-6 py-3 bg-dblue border-whitish border-solid border-2 rounded-sm text-whitish">
                         <Link to="/admin-self-defense" className="text-whitish no-underline">Self Defense</Link>
                     </button>
                     <button className="px-6 py-3 bg-dblue border-whitish border-solid border-2 rounded-sm text-whitish">
                         <Link to="/admin-career" className="text-whitish no-underline">Career</Link>
                     </button>
                     <button className="px-6 py-3 bg-dblue border-whitish border-solid border-2 rounded-sm text-whitish">
                         <Link to="/admin-userTips" className="text-whitish no-underline">User-Tips</Link>
                     </button>
                     <button className="px-6 py-3 bg-dblue border-whitish border-solid border-2 rounded-sm text-whitish">
                         <Link to="/admin-lostfound" className="text-whitish no-underline">Lost & Found</Link>
                     </button>
                </div>
            </section>
       </>
    )
}




export default Admin