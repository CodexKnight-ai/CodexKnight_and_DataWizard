import { NavLink } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBar from './NavBar.jsx'
import { faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { useState } from "react";

const HeroSection = () => {
  return (
    <>
      <HeroPage />
    </>
  )
}

const HeroPage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleTipFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <>
      <section className="relative w-screen h-screen bg-black overflow-y-hidden">
        <div className="absolute flex justify-center items-center w-[100%] h-[100%]">
          <video autoPlay muted loop playsInline className="h-[80%] w-auto xl:object-fill xl:w-[1300px] 3xl:w-[1400px] 4xl:w-[1700px]">
            <source src="/gtaBgVideo.mp4" type="video/mp4" />
          </video>
        </div>

        <img
          src="/backGround.png"
          className="absolute w-screen h-screen z-30"
        ></img>
        <div className="relative h-screen w-screen">
          <div className="absolute h-screen w-screen top-0 left-0 z-40">
            <NavBar />

            {/* Social Media Section */}
            <div className=" absolute flex h-[55vh] top-[8vh] lg:text-[1.17vw]">
              <div className="w-[12vw] h-[100%] flex justify-between items-center ">
                <ul className="flex flex-col gap-[50px] justify-end items-center space-y-4 p-4 text-whitish font-gtaDescriptionText h-[100%] xl:gap-[90px]">
                  <li className="rotate-[270deg] text-[1.2em] ">Social Media</li>
                  <div className="flex flex-col gap-[8px] xl:gap-[10px]">
                    <li className="bg-whitish rounded-full h-[2.7em] w-[2.7em] flex items-center justify-center">
                      <FontAwesomeIcon icon={faInstagram} size="lg" className="text-blackish" />
                    </li>
                    <li className="bg-whitish rounded-full h-[2.7em] w-[2.7em] flex items-center justify-center">
                      <FontAwesomeIcon icon={faTwitter} size="lg" className="text-blackish" />
                    </li>
                    <li className="bg-whitish rounded-full h-[2.7em] w-[2.7em] flex items-center justify-center">
                      <FontAwesomeIcon icon={faYoutube} size="lg" className="text-blackish" />
                    </li>
                  </div>
                </ul>
              </div>
              <div className="flex flex-col gap-[20px] h-[90%] w-[35vh] ml-[25px] mt-[40px]">
                <div className="h-[60%] backdrop-blur-sm bg-white/20 rounded-3xl mt-[50px]"></div>
                <div className="h-[40%] backdrop-blur-sm bg-white/20 rounded-3xl"></div>
              </div>
            </div>

            {/* Ready To Join Button */}
            <div className="absolute bottom-4 font-gtaDescriptionText mt-[55px] w-[60vh] h-[28vh] text-whitish flex  flex-col justify-between items-start ml-[20vh] lg:w-[45vh] lg:text-[0.9vw] lg:ml-[20vh] xl:w-[45vh] xl:ml-[23vh]">
              <p className="h-[75%]">
                <span className="font-thin text-[1.8em] opacity-[65%]">
                  Ready to join the
                </span>
                <br />
                <span className="font-thin text-[1.8em] opacity-[65%]">
                  force?
                </span>
                <br />
                <span className="flex items-center gap-[20px] font-thin text-[2.5em] mt-[10px] w-[100%]">
                  Sign Up{" "}
                  <span className="bg-whitish text-blackish h-[1.5em] w-[1.5em] flex justify-center items-center rounded-full">
                    &rarr;
                  </span>
                </span>
              </p>
              <div className="w-[100%] h-[25%]">
                <div className="text-blackish flex justify-between gap-[20px] w-[100%] h-[100%] lg:justify-normal ">
                  <div
                    className="bg-blackish text-whitish border-[1px] border-whitish rounded-full w-[40%]"
                    onClick={toggleTipFormVisibility}>
                    <button className="h-full w-full">Submit Tip</button>
                  </div>
                  <NavLink
                    className="bg-blackish text-whitish border-[1px] border-whitish rounded-full w-[50%]"
                    to="/lost-and-Found">
                    <button className="h-full w-full">
                      Lost-Found
                    </button>
                  </NavLink>
                  <NavLink
                    className="bg-blackish text-whitish border-[1px] border-whitish rounded-full w-[40%] lg:hidden xl:flex"
                    to="/newsSection">
                    <button className="h-full w-full">News</button>
                  </NavLink>
                </div>
              </div>
            </div>

            {/* About text */}
            <div className="absolute right-0 bottom-2 h-[28vh] mr-[4vw] lg:h-[32vh] ">
              <div className="flex h-[100%] mt-[15px]">
                <span className="h-[100%] flex items-end font-gtaDescriptionText text-[11px] text-whitish lg:text-[0.8vw]">
                  <div className="h-[30%] ">
                    Welcome to the Los Santos Police Department's official
                    website, dedicated to serving and protecting
                    <br />
                    our vibrant city.Our committed officers work tirelessly to
                    ensure the safety and
                    <br />
                    well-being of all citizens, upholding justice and fostering
                    community trust.
                  </div>
                </span>
                <span className=" p-[0px] ml-[20px]">
                  <div className="relative flex justify-center items-center">
                    <img src="/logo3.png" alt="" className="h-[275px] top-5 lg:h-[200px] lg:top-1 xl:h-[300px]" />
                  </div>
                </span>
              </div>
            </div>

            {/* animated logo */}
            <div className="absolute top-16 right-20 w-[10em] animate-[spin_4.5s_linear_infinite] lg:right-[8.4vw] lg:w-[7em] xl:w-[8em] xl:right-[9.3vw] xl:top-[9vh]">
              <img src="/SecurityLogo.png"></img>
            </div>
          </div>
        </div>

        {isFormVisible && <UserTipsSection onClose={toggleTipFormVisibility} />}
      </section>
    </>
  );
};

const UserTipsSection = ({ onClose }) => {
  const [tipCategory, settipCategory] = useState("");
  const [tipDescription , settipDescription] = useState("");
  const [tipDate , settipDate] = useState("");
  const [tipAttachments, settipAttachments] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("tipCategory",tipCategory)
    formData.append("tipDescription",tipDescription)
    formData.append("tipDate",tipDate)
    formData.append("tipAttachments",tipAttachments)


    try {
      const response = await axios.post('http://localhost:4000/api/v1/userTips/tips',
        formData,
        {
          headers:{
            "Content-Type":"multipart/form-data",
          },
        }
      );

      settipCategory("")
      settipDescription("")
      settipDate("")
      settipAttachments(null)
      setSuccess(true);
    } catch (error) {
      setError(true);
      console.error('Error adding Tip:', error.response?.data || error.message);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-md backdrop-brightness-50">
        <div className="w-[40%] h-[80%] flex justify-center items-center backdrop-blur-md rounded-xl border-2 border-none shadow-2xl shadow-black bg-white/90">
          <form success={success.toString()} error={error.toString()} onSubmit={handleSubmit} className="relative flex flex-col px-[10px] py-[10px] w-full h-full justify-between items-between font-gtaHeadingText2">
            <h1 className="font-gtaHeadingText1 px-[15px] py-[5px] border-[1px] border-white border-solid rounded-lg text-whitish bg-dblue text-[3em] w-full flex justify-center items-center">Submit Tip</h1>
            <div className="flex justify-between w-full items-center gap-[20px]">
              <label className="text-dblue font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]"><span>Category</span><span>:</span></label>
              <input value={tipCategory} onChange={(e) => settipCategory(e.target.value)} className="border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.05] transition ease-in-out duration-300 focus:shadow-gray-500 focus:shadow-2xl" placeholder="category of tip" required />
            </div>
            <div className="flex justify-between w-full items-center gap-[20px]">
              <label className="text-dblue font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]"><span>Description</span><span>:</span></label>
              <textarea value={tipDescription} onChange={(e) => settipDescription(e.target.value)} className="border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.05] transition ease-in-out duration-300 focus:shadow-gray-500 focus:shadow-2xl" placeholder="Describe your suggestion" required />
            </div>
            <div className="flex justify-between w-full items-center gap-[20px]">
              <label className="text-dblue font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]"><span>Date</span><span>:</span></label>
              <input value={tipDate} onChange={(e) => settipDate(e.target.value)} type="date" className="border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.05] transition ease-in-out duration-300 focus:shadow-gray-500 focus:shadow-2xl" placeholder="Date" required />
            </div>
            <div className='flex justify-between w-full items-center gap-[20px]'>
              <label className='text-dblue font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>Attachments (If any)</span><span>:</span></label>
              <input onChange={(e)=>settipAttachments(e.target.files)}  type="file" className='border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.05] transition ease-in-out duration-300 focus:shadow-gray-500 focus:shadow-2xl' placeholder='' multiple/>
            </div>
            <button type="submit" className="flex w-full bg-dblue text-white font-gtaHeadingText2 text-[1.5em] rounded-xl justify-center align-center px-6 py-3 border-[1px] border-white border-solid hover:opacity-70 transition-all duration-[0.1s] active:scale-[0.98]">Submit</button>
            <button type="button" onClick={onClose} className="absolute top-[36px] right-[15px] bg-whitish text-dblue font-gtaDescriptionText py-2 px-4 rounded-full">X</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
