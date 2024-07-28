import React, { useState } from "react";

const OpenNews = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-opacity-50 bg-black flex justify-center items-center z-50">
      <div className="relative bg-[#121212] w-[90%] h-[90%] text-white rounded-lg p-4 flex gap-3">
        <div className="w-[40%] h-full bg-gray-600">
          <div className="bg-green-800 w-[15%] h-[25%] relative left-[85%] top-[75%]"></div>
        </div>
        <div className="w-[55%] h-full bg-gray-600 flex flex-col">
          <content className="w-full h-[25%] bg-blue-800"></content>
          <div className="w-full h-full bg-yellow-900 "></div>
          <div className="w-full h-[10%] bg-red-950"></div>
        </div>
        <button
          className="absolute top-2 right-2 text-2xl text-white bg-[#c21f1f] rounded-full px-2"
          onClick={onClose}
        >
          X
        </button>
      </div>
    </div>
  );
};

const NewsSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenNews = () => {
    setIsOpen(true);
  };

  const handleCloseNews = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && <OpenNews onClose={handleCloseNews} />}
      <section className="w-screen h-screen overflow-x-hidden">
        <div className="relative bg-blackish w-screen h-full overflow-y-hidden">
          <div className='mt-[8vh]  bg-[url("/newsSection.png")] w-full h-full bg-contain bg-center bg-no-repeat'>
            <p className="text-whitish font-gtaHeadingText1 absolute top-[8vh] left-[5vh] text-[3rem]">
              Lspd News Barrier
            </p>
          </div>
          <div className="flex gap-[1.4em] bg-white py-[0.em] absolute bottom-[3em] 0 w-screen -rotate-[3deg]">
            <AimationCards />
          </div>
        </div>
        <div className="w-screen flex gap-[15px] p-[15px]">
          <div className="w-[65%]  flex flex-col gap-[15px]">
            <div className="w-[100%] h-[40rem]">
              <NewsGridCardCarousel onClick={handleOpenNews} />
            </div>
            <div className=" w-[100%] flex gap-[15px] h-[21rem] ">
              <NewsGridCard1 onClick={handleOpenNews} />
              <NewsGridCard1 onClick={handleOpenNews} />
              <NewsGridCard1 onClick={handleOpenNews} />
            </div>
            <div className="w-full flex justify-center gap-[15px] h-[20em]">
              <NewsGridCard2 onClick={handleOpenNews} />
              <NewsGridCard2 onClick={handleOpenNews} />
            </div>
          </div>
          <div
            id="newsSectionSideBar"
            className=" w-[35%] h-[83rem] p-[10px] rounded-[1.4em] flex flex-col gap-[15px] overflow-x-scroll"
          >
            <NewsSideBar onClick={handleOpenNews} />
          </div>
        </div>
      </section>
    </>
  );
};

const NewsGridCard1 = ({ onClick }) => {
  return (
    <article
      onClick={onClick}
      className="font-gtaDescriptionText w-[24em] h-[21em] relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-3 pb-6 pt-40 max-w-sm mx-auto cursor-pointer"
    >
      <img
        src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a"
        alt="University of Southern California"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
      <h3 className="z-10 mt-3 text-3xl font-bold text-white">
        Wo to mar gaya
      </h3>
      <div className="z-10 mt-2 gap-y-1 overflow-x-hidden text-sm leading-6 text-gray-300">
        Wo mar gaya kyoki kya kare use kisi ne mar dala ab isme ham kya kare
      </div>
    </article>
  );
};

const NewsGridCard2 = ({ onClick }) => {
  return (
    <article
      onClick={onClick}
      className="font-gtaDescriptionText w-[50%] h-[21em] relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-3 pb-6 pt-40 cursor-pointer"
    >
      <img
        src="/nightCity.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
      <h3 className="z-10 mt-3 text-3xl font-bold text-white">
        Wo to mar gaya
      </h3>
      <div className="z-10 mt-2 gap-y-1 overflow-x-hidden text-sm leading-6 text-gray-300">
        Wo mar gaya kyoki kya kare use kisi ne mar dala ab isme ham kya kare
      </div>
    </article>
  );
};

const NewsGridCardCarousel = ({ onClick }) => {
  return (
    <div className="w-full h-full bg-dblue rounded-[1.2em]">
      <article
        onClick={onClick}
        className="font-gtaDescriptionText overflow-auto w-full h-full relative isolate flex flex-col justify-end  rounded-[1.2em] px-5 pb-10 pt-40 cursor-pointer"
      >
        <img
          src="./newsBackground.jpg"
          className="absolute inset-0 h-full w-full object-cover overflow-hidden"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
        <h2 className="z-10 mt-3 text-5xl font-bold text-white">
          Wo to mar gaya
        </h2>
        <div className="z-10 mt-5 ml-[3px] gap-y-1 overflow-x-hidden text-md leading-6 text-gray-300">
          Wo mar gaya kyoki kya kare use kisi ne mar dala ab isme ham kya kare
        </div>
      </article>
    </div>
  );
};

const NewsSideBarCard = ({ onClick }) => {
  return (
    <div
      className="w-full h-[10em] bg-white shadow-xl rounded-[1.2em] p-[10px] cursor-pointer"
      onClick={onClick}
    >
      <article className="font-gtaDescriptionText  w-full h-full relative isolate flex justify-between  rounded-[1.2em]  ">
        <div className="w-[20%] overflow-hidden">
          <img
            src="./newsBackground.jpg"
            className="rounded-[0.8em] absolute inset-0 h-full w-[8.5rem] object-cover overflow-hidden"
          />
        </div>
        <div className="w-[70%] h-full">
          <h2 className="mt-3 text-2xl font-bold text-blackish">
            Wo to mar gaya
          </h2>
          <div className="mt-5 ml-[3px] gap-y-1 overflow-x-hidden text-md leading-6 text-blackish">
            Wo mar gaya kyoki kya kare use kisi ne mar dala ab isme ham kya kare
          </div>
        </div>
      </article>
    </div>
  );
};

const NewsSideBar = ({ onClick }) => {
  return (
    <>
      <NewsSideBarCard onClick={onClick} />
      <NewsSideBarCard onClick={onClick} />
      <NewsSideBarCard onClick={onClick} />
      <NewsSideBarCard onClick={onClick} />
      <NewsSideBarCard onClick={onClick} />
      <NewsSideBarCard onClick={onClick} />
      <NewsSideBarCard onClick={onClick} />
      <NewsSideBarCard onClick={onClick} />
      <NewsSideBarCard onClick={onClick} />
      <NewsSideBarCard onClick={onClick} />
      <NewsSideBarCard onClick={onClick} />
      <NewsSideBarCard onClick={onClick} />
      <NewsSideBarCard onClick={onClick} />
      <NewsSideBarCard onClick={onClick} />
    </>
  );
};
const AimationCards = () => {
  return (
    <>
      <section class="animationSection">
        <div class="scroll">
          {/* <!-- First set of images --> */}
          <div>
            <img src="/crim1.jpeg"></img>
          </div>
          <div>
            <img src="/crim1.jpeg"></img>
          </div>
          <div>
            <img src="/crim3.jpeg"></img>
          </div>
          <div>
            <img src="/crim4.jpeg"></img>
          </div>
          <div>
            <img src="/crim3.jpeg"></img>
          </div>
          <div>
            <img src="/LandFDesk.jpeg"></img>
          </div>
          <div>
            <img src="/crim1.jpeg"></img>
          </div>
          <div>
            <img src="/crim4.jpeg"></img>
          </div>
          <div>
            <img src="/crim3.jpeg"></img>
          </div>
          <div>
            <img src="/crim3.jpeg"></img>
          </div>
          {/* <!-- Duplicate the images for seamless looping --> */}
          <div>
            <img src="/crim1.jpeg"></img>
          </div>
          <div>
            <img src="/crim1.jpeg"></img>
          </div>
          <div>
            <img src="/crim3.jpeg"></img>
          </div>
          <div>
            <img src="/crim4.jpeg"></img>
          </div>
          <div>
            <img src="/crim3.jpeg"></img>
          </div>
          <div>
            <img src="/LandFDesk.jpeg"></img>
          </div>
          <div>
            <img src="/crim1.jpeg"></img>
          </div>
          <div>
            <img src="/crim4.jpeg"></img>
          </div>
          <div>
            <img src="/crim3.jpeg"></img>
          </div>
          <div>
            <img src="/crim2.jpeg"></img>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsSection;
