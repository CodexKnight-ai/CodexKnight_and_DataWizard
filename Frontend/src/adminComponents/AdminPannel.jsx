const Admin =() => {

    return(
       <>
            <section className="flex gap-[2em] flex-col justify-center items-center w-screen h-screen bg-gray-500">
                <div className="font-gtaHeadingText2 text-[2vw] text-white">LSPD</div>
                <div>
                     <button className="px-6 py-3 bg-dblue border-whitish border-solid border-2 rounded-sm text-whitish">
                         <Link to="/admin/self-defense" className="text-whitish no-underline">Self Defense</Link>
                     </button>
                </div>
            </section>
       </>
    )
}


export default Admin