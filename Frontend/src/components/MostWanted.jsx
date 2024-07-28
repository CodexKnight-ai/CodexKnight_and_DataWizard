import React, { useState, useEffect } from "react";
import axios from "axios";

function MostWanted() {
  const [topName, setTopName] = useState("Select a criminal");
  const [age, setAge] = useState("Select a criminal");
  const [crime, setCrime] = useState("Select a criminal");
  const [detail, setDetail] = useState("Select a criminal");
  const [topImage, setTopImage] = useState("./logo_real.png");
  const [criminal, setCriminal] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/mostWanted/most-wanted-criminal")
      .then((response) => {
        console.log("criminal data fetched successfully");
        setCriminal(response.data);
      })
      .catch((error) => {
        console.error("There was an error in getting criminal data !", error);
      });
  }, []);

  const filteredCriminals = criminal.filter((c) =>
    c.criminalName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="bg-cover bg-center h-screen w-full flex flex-col items-center justify-center gap-4"
      style={{ backgroundImage: `url("/mostWantedbg.gif")` }}
    >
      <div className="bg-[#11304D] border-[#11304D] border-4 rounded-lg bg-opacity-80 h-4/5 w-1/2 flex flex-col p-3 3xl:w-[55vw] 3xl:h-4/5 2xl:w-[64vw] 2xl:h-[70vh] xl:h-[70vh] xl:w-[60vw] lg:w-[60vw] lg:h-[70vh] md:w-[90vw] md:h-[68vh]">
        <div className="w-full h-15 text-whitish text-3xl font-gtaHeadingText1 flex justify-center align-middle">
          <span>Most Wanted</span>
        </div>
        <div className="h-4/5 w-full flex gap-4">
          <div className="h-full w-1/3 flex flex-col gap-3">
            <div className="h-1/3 w-full  bg-[#11304D] text-white  text-center flex bg-opacity-90 border-black border-2 rounded-md">
              <p className="h-full w-fit font-gtaHeadingText1 text-2xl p-3 bg-[#0B3039] flex justify-center items-center">Name</p>
              <p className="h-full w-fit bg-[#11304D] flex justify-center items-center p-3">{topName}</p>
            </div>
            <div className="h-1/3 w-full bg-[#11304D] text-white  text-center flex bg-opacity-90 border-black border-2 rounded-md">
              <p className="h-full w-fit font-gtaHeadingText1 text-2xl p-3 bg-[#0B3039] flex justify-center items-center">Age</p>
              <p className="h-full w-fit bg-[#11304D] flex justify-center items-center p-3">{age}</p>
            </div>
            <div className="h-1/3 w-full bg-[#11304D] text-white  text-center flex bg-opacity-90 border-black border-2 rounded-md">
              <p className="h-full w-fit font-gtaHeadingText1 text-2xl p-3 bg-[#0B3039] flex justify-center items-center">Crime</p>
              <p className="h-full w-fit bg-[#11304D] flex justify-center items-center p-3">{crime}</p>
            </div>

          </div>
          <div className="h-full w-[40%] flex flex-col ">
            <div className="w-full h-full max-h-96 max-w-96 flex justify-center items-center bg-gray-200 border-2  border-black overflow-hidden rounded-md">
              <img
                className="h-full w-full rounded-md shadow-black shadow-md border-black border-2 "
                src={topImage}
                alt={topName} // Added alt attribute for accessibility
              />
            </div>
          </div>
          <div className="h-full w-1/3 flex flex-col rounded-md">
            <p className="h-fit w-full flex bg-[#0B3039] font-gtaHeadingText1 text-3xl text-white text-center  items-center justify-center bg-opacity-90 border-black border-2 rounded-t-md">
              Details:
            </p>
            <p className="h-full w-full flex bg-[#11304D] font-gtaDescriptionText text-xl text-white p-3  items-center justify-center bg-opacity-90 border-black border-2 rounded-b-md">
              {detail}
            </p>
          </div>
        </div>

        <div className="h-20 w-full flex items-center justify-between">
          <input
            type="text"
            placeholder="Search"
            className="w-1/3 pl-5 py-2 text-whitish bg-[#0B3039] outline-none rounded-full shadow-black shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
          />
          <span className="bg-[#0B3039] px-3 py-2 rounded-full text-white">
            Total results : {criminal.length}
          </span>
        </div>

        <div className="h-3/5 w-full flex flex-wrap gap-2 cursor-pointer overflow-y-scroll overflow-x-hidden mx-4">
          {filteredCriminals.map((criminal) => (
            <div
              key={criminal._id}
              className="h-auto w-[24%] flex flex-col mb-2"
            >
              <div className="h-40 w-full overflow-hidden">
                <img
                  className="h-full w-full rounded-md border-2 border-black object-cover"
                  src={criminal.avatar}
                  alt={criminal.criminalName}
                  onClick={() => {
                    setTopName(criminal.criminalName);
                    setAge(criminal.age);
                    setCrime(criminal.crime);
                    setDetail(criminal.detail);
                    setTopImage(criminal.avatar);
                  }}
                />
              </div>
              <p className="flex w-full h-fit bg-white text-black text-center text-lg items-center justify-center bg-opacity-90">
                {criminal.criminalName}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MostWanted;
