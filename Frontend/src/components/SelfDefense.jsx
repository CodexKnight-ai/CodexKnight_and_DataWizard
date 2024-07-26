import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';




function SelfDefense() {
  return (
    <>
        <section>
          <HeroSelfDefense/>
          <LessonSection/>
        </section>
    </>
  )
}



//HeroSection Defense
const HeroSelfDefense = () => {

  return (
    <>
      <section className="w-screen h-screen bg-contain bg-center bg-no-repeat ">
        <img src="/SelfDefenseBg.png" className="h-screen w-screen" alt="" />
        <div className='absolute top-[27vh] left-[10vh] leading-[em]'>
          <p className='font-gtaHeadingText1 text-dblue text-[15vh]'>SELF DEFENSE</p>
          <div>
            <p className='font-gtaHeadingText2 text-dblue text-opacity-70 text-[2.4vh] ml-[7px]'>
              Master the art of self-defense with our comprehensive training
              <br />programs designed for all skill levels
            </p>
          </div>
          <span className='h-[7vh] w-[20vw] flex mt-[50px]  border-none bg-dblue border-2 rounded-full items-center justify-between pl-[30px] pr-[10px]'>
            <span className='text-[1.6em] not-italic text-whitish font-gtaHeadingText2 '>Join Us</span><span className='bg-transperant border-solid border-[2px] border-whitish text-whitish h-[3.5em] w-[3.5em] flex justify-center items-center rounded-full'> &rarr;</span>
          </span>
        </div>
      </section>
    </>
  )
}

//lesson section 
const LessonSection = () => {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/api/v1/selfDefense/lessons')
      .then(response => {
        // console.log("data recived",response.data) // Debug line to check received data
        setLessons(response.data)
        if (response.data.length > 0) {
          setSelectedLesson(response.data[0]);
        }
      })
      .catch((err)=>{console.log(err.response)})
  }, []);

  const handleNextClick = () => {
    const currentIndex = lessons.findIndex(lesson => lesson.id === selectedLesson.id);
    const nextIndex = (currentIndex + 1) % lessons.length;
    setSelectedLesson(lessons[nextIndex]);
  }

  return (
    <div className='w-screen h-screen flex'>
      <SideBarLesson lessons={lessons} onSelectLesson={setSelectedLesson} />
      <LessonCard lesson={selectedLesson} lessonCount = {lessons.length} onNextClick={handleNextClick} />
    </div>
  );
};



//compopnants
const SideBarLesson = ({ lessons, onSelectLesson }) => {
  return (
    <>
      <section className='w-[30%] h-screen overflow-scroll shadow-blackish shadow-lg'>
        {lessons.map((lesson) => 
          (
            <Lesson 
              onClick={() => onSelectLesson(lesson)} 
              key={lesson._id} // Use _id or any unique field from the lesson object
              name={lesson.name} 
              duration={lesson.duration} 
              description={lesson.description} 
              status={lesson.status}
            />
         )
        )}
      </section>
    </>
  )
}


const LessonCard = ({ lesson,onNextClick,lessonCount }) => {

  //Handling Blanck Space if no lesson is selected
  if (!lesson) {
    return <div className="w-[70%] h-screen p-6 font-gtaHeadingText2 flex justify-center items-center text-3xl text-dblue font-semibold">Let's Learn! Please Select The Lesson!</div>;
  }

  //progress bar calculations
  const calculateProgress = (id) => {
      let percentageProgress  = 100 * (id/lessonCount);;
      return  percentageProgress ;
  };

  //When lesson is selected the visible componant of lesson
  return (
    <>
      <section className='w-[70%] h-screen p-6 flex flex-col justify-evenly'>
        <ProgressBar progress={calculateProgress(lesson.id)} />
        <div>
          <p className='font-gtaHeadingText1 text-[4em] text-dblue flex justify-center' >{lesson.name}</p>
          <div className='w-full h-[60vh] border-dblue border-2 mt-10 rounded-3xl overflow-hidden'>
              <iframe width="100%" height="100%"
                    src={lesson.url}>
              </iframe>
          </div>
        </div>
        <button onClick={onNextClick} className='font-gtaHeadingText2 text-[1.3em] rounded-full bg-dblue border-2 border-white text-whitish px-8 py-3 hover:bg-white hover:text-dblue hover:border-dblue transition-all duration-[0.3s] active:bg-white active:text-dblue active:border-dblue active:border-opacity-0 active:text-opacity-40'>
          Next
        </button>

      </section>
    </>
  );
};

const ProgressBar = ({progress}) => {
  console.log(progress,"hello")
  return (
    <div className='relative h-[0.8em] w-full'>
          <div className='absolute bg-gray-300 w-full h-full rounded-full z-0'></div>
          <div className='absolute bg-dblue h-full rounded-full z-1 transition-all duration-[0.8s]' style={{ width: `${progress}%` }}></div>
    </div>
  )
} 

const Lesson = ({ name, duration, description, status, onClick }) => {
  return (
    <>
      <div onClick={onClick} className='w-full h-[8em] bg-whitish border-b-dblue border-b-solid border-b-[1px] p-5 rounded-br-2xl active:opacity-60 hover:bg-gray-100  transition-all duration-[0.3s]'>
            <div className='flex justify-between h-[50%]'>
                <p className='text-[1.06rem] font-semibold text-dblue'>{name}</p>
                {status ? (<FontAwesomeIcon icon={faCheckCircle} style={{ color: "#120458" }} />) : (<FontAwesomeIcon icon={faCheckCircle} style={{ color: "#b0b0b0" }} />)}
            </div>
            <div className='flex justify-between h-[50%]'>
                <p className='w-[90%] text-[#848383] font-light'>{description}</p>
                <p className='self-end'>{duration}</p>
            </div>
      </div>
    </>
  )
}




export default SelfDefense