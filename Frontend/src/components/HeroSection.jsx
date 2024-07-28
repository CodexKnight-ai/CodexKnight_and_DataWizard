import { NavLink } from "react-router-dom";
// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBar from './NavBar.jsx'
import { faInstagram,faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

const HeroSection = () => {
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
          <NavBar/>
          {/* NavSection */}
          {/* <nav className="w-screen h-[8.5vh] flex justify-start items-center">
            <div className=" w-[12%] flex-col items-center pl-[7px] pt-[50px]">
              {/* <div className="">
                <p className="leading-[40px] mt-[30px]">
                  <span className="pt-[25px] text-[5vw] font-gtaHeadingText2 font-semibold text-whitish">
                    LSPD
                  </span>
                  <br />
                  <span className="font-gtaDescriptionText italic text-[1.4em] pl-[5px] text-cyan-400">
                    Police Agency
                  </span>
                </p>
              </div> 
            </div>
            <ul className="font-gtaDescriptionText text-whitish w-[65%] h-[100%] top-[5px] flex flex-row justify-center items-center gap-[5vw] text-[1em]">
              <NavLink
                to=""
                className={({ isActive }) =>
                  ` ${
                    isActive
                      ? "bg-[#120658] px-5 py-2.5 rounded-full transition duration-300 "
                      : "text-white"
                  }`
                }
              >
                <li>Home</li>
              </NavLink>
              <NavLink to="/most-wanted">
                <li>Most Wanted</li>
              </NavLink>
              <NavLink to="/self-defense">
                <li>Self Defense</li>
              </NavLink>
              <NavLink to="/lost-and-found">
                <li>Lost and Found</li>
              </NavLink>
              <NavLink to="/careers">
                <li>Careers</li>
              </NavLink>
              <NavLink to="/newsSection">
                <li>News</li>
              </NavLink>
            </ul>
          </nav> */}

          //Social Media Section
          <div className=" absolute flex h-[55vh] top-[8vh] lg:text-[1.17vw]">
            <div className="w-[12vw] h-[100%] flex justify-between items-center ">
              <ul className="flex flex-col gap-[50px] justify-end items-center space-y-4 p-4 text-whitish font-gtaDescriptionText h-[100%] xl:gap-[60px]">
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
            <div className="flex flex-col gap-[20px] h-[90%] w-[35vh] ml-[25px] mt-[25px]">
              <div className="h-[60%] backdrop-blur-sm bg-white/20 rounded-3xl mt-[50px]"></div>
              <div className="h-[40%] backdrop-blur-sm bg-white/20 rounded-3xl"></div>
            </div>
          </div>

          //Ready To Join Button
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
                <NavLink
                  className="bg-blackish text-whitish border-[1px] border-whitish rounded-full w-[25%]"
                  to="/login">
                  <button className="h-full w-full">Join Us</button>
                </NavLink>
                <button className="bg-blackish text-whitish border-[1px] border-whitish rounded-full w-[30%]">
                  Community
                </button>
                <NavLink 
                  className="bg-blackish text-whitish border-[1px] border-whitish rounded-full w-[45%] lg:hidden xl:flex"
                  to="/newsSection">
                  <button className="h-full w-full">News & Updates</button>
                </NavLink>
              </div>
            </div>
          </div>

          //About text
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
                      <img src="/logo3.png" alt="" className="h-[275px] top-5 lg:h-[170px] lg:top-1 xl:h-[200px] xl:"/>
                </div>
              </span>
            </div>
          </div>

          //animated logo
          <div className="absolute top-16 right-40 w-[10em] animate-[spin_4.5s_linear_infinite] lg:right-[8.4vw] lg:w-[7em] xl:w-[8em] xl:right-[9.3vw] xl:top-[9vh]">
            <img src="/SecurityLogo.png"></img>
          </div>
        </div>
    
        </div>
          </section>
    </>
  );
};

export default HeroSection;
