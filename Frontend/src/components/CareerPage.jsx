import React, { useEffect, useState } from "react";
import axios from "axios";

function CareerPage() {
  const [career, setCareer] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/career/create-career")
      .then((response) => {
        console.log("Career data fetched successfully");
        setCareer(response.data);
      })
      .catch((error) => {
        console.log("There was an error in getting career data !", error);
      });
  }, []);

  return (
    <>
      <div className='w-full h-screen border-[#11304D] border-b-8 bg-[url("/bgCareerGIF.gif")] bg-cover bg-center bg-no-repeat flex flex-col justify-end overflow-hidden'>
        <span className="absolute top-[35%] left-1/4 text-8xl text-whitish font-gtaHeadingText1">
          Careers
        </span>
        <div className="flex w-full h-[10%] px-[15%] justify-evenly gap-3">
          {career.map((career) => (
            <div
              key={career._id}
              className="box h-full w-1/4 p-3 text-center text-whitish rounded-t-3xl text-lg font-gtaDescriptionText border-[#11304D] border-2 bg-[#11304dbd] hover:h-full"
            >
              {career.careerTitle}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#121212] text-whitish py-10 w-full h-fit text-white flex flex-col gap-y-4 justify-start">
        {career.map((career, index) => (
          <div
            key={career._id}
            className={`h-screen w-screen flex flex-col gap-1 p-10`}
          >
            <p className="font-gtaHeadingText1 text-5xl text-center p-5">
              {career.careerTitle}
            </p>
            <div className={`flex h-full w-full ${index%2!=0 ?"flex-row-reverse":"flex-row"}`}>
              <div className="flex h-fit w-[40%] items-center justify-center">
                <img
                  className="h-96 w-auto hover:drop-shadow-[0_15px_15px_rgba(5,67,120,255)]"
                  src={career.careerImage}
                  alt={career.careerTitle}
                />
              </div>
              <div className={`flex h-full w-[60%] flex-col items-start justify-start m-5`}>
                <ul className="flex flex-col m-4 gap-3 text-xl text-justify">
                  <li>Description: {career.careerDescription}</li>
                  <li>Qualifications: {career.careerQualification}</li>
                  <li>Job: {career.careerJob}</li>
                  <li>Salary: {career.careerSalary}</li>
                </ul>
              </div>
            </div>
                <div className="w-full h-1/3 items-center flex justify-center">
                  <button className="bg-[#120658] px-10 py-4 rounded-full hover:drop-shadow-[0px_0px_15px_rgba(5,67,120,255)]">
                    Apply
                  </button>
                </div>
          </div>
        ))}
      </div>
      {/* Footer */}
      <div className="h-full w-full p-3 text-whitish bg-blackish text-xl text-center">
        Los Santos Police Department
      </div>
    </>
  );
}

export default CareerPage;
