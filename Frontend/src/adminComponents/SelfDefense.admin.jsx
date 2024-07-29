//features...
//1.Add Lessons
//2.Update Lessons
//3.Delete Lessons

//Imputs
// id: Number,
// name: String,
// description: String,
// duration: String,
// status: Boolean,
// url  :String,


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const SelfDefenseAdmin = () => {


    return (
        <>
            <CreateLesson />
            <ReadLessons />
        </>
    )
}

const CreateLesson = () => {
    const [LessonId, setId] = useState('');
    const [LessonName, setLessonName] = useState('');
    const [LessonDescription, setLessonDescription] = useState('');
    const [LessonDuration, setLessonDuration] = useState('');
    const [LessonURL, setLessonURL] = useState('');
    const [isFormVisible, setIsFromVisible] = useState(false);

    const toggleAddLessonFormVisibility = () => {
        setIsFromVisible(!isFormVisible);
    };

    const postLesson = async (event) => {

        //Handling onSubmit form event here!
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/api/v1/selfDefense/lessons', {
                LessonId,
                LessonName,
                LessonDescription,
                LessonDuration,
                LessonURL
            });
            
            setId("")
            setLessonName("")
            setLessonDescription("")
            setLessonDuration("")
            setLessonURL("")
        } catch (error) {
            console.error('Error adding lesson:', error.response?.data || error.message);
        }
    };

    return (
        <>
            <div className='flex justify-between py-6 px-3 items-center'>
                <span className='text-dblue font-gtaHeadingText1 text-[4em]'>Self Defense Admin Portal !</span>
                <div className='transition-all duration-[0.5s]'>
                    {
                        isFormVisible ?
                            <FontAwesomeIcon onClick={toggleAddLessonFormVisibility} icon={faTimes} style={{ fontSize: '30px', color: 'white', backgroundColor: '#120458', borderRadius: '5px', paddingLeft: "5px", paddingRight: "5px", paddingTop: "3px", paddingBottom: "3px" }} />
                            :
                            <button onClick={toggleAddLessonFormVisibility} className='px-6 h-[4em] bg-dblue text-white border-[1px] border-solid rounded-lg active:scale-95 hover:opacity-60 transition-all duration-[0.1s] font-gtaHeadingText2'>Add Lesson</button>
                    }
                </div>


            </div>
            <div>
                {
                    isFormVisible && (
                        <div className='flex h-screen w-screen justify-center fixed '>
                            <div className='w-[40%] h-[80%] flex justify-center items-center backdrop-blur-md rounded-xl border-2 border-none shadow-2xl shadow-black'>
                                <form className='flex flex-col px-[10px] py-[10px] w-full h-full justify-between items-between font-gtaHeadingText2' onSubmit={postLesson}>
                                    <h1 className='font-gtaHeadingText1 px-[15px] py-[5px] border-[1px] border-white border-solid rounded-lg text-whitish bg-dblue text-[3em] w-full flex justify-center items-center '>Add Lesson</h1>
                                    <div className='flex justify-between w-full items-center gap-[20px]'>
                                        <label className='text-dblue font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>Id</span><span>:</span></label>
                                        <input onChange={(e) => setId(e.target.value)} className='border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset  focus:bg-white focus:transform focus:scale-[1.05] transition ease-in-out duration-300 focus:shadow-gray-500 focus:shadow-2xl' placeholder='Id' value={LessonId} required />
                                    </div>
                                    <div className='flex justify-between w-full items-center gap-[20px]'>
                                        <label className='text-dblue font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>Name</span><span>:</span></label>
                                        <input onChange={(e) => setLessonName(e.target.value)} className='border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.05] transition ease-in-out duration-300 focus:shadow-gray-500 focus:shadow-2xl' placeholder='Name' value={LessonName} required />
                                    </div>
                                    <div className='flex justify-between w-full items-center gap-[20px]'>
                                        <label className='text-dblue font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>Description</span><span>:</span></label>
                                        <input onChange={(e) => setLessonDescription(e.target.value)} className='border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.05] transition ease-in-out duration-300 focus:shadow-gray-500 focus:shadow-2xl' placeholder='Description' value={LessonDescription} required />
                                    </div>
                                    <div className='flex justify-between w-full items-center gap-[20px]'>
                                        <label className='text-dblue font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>Duration</span><span>:</span></label>
                                        <input onChange={(e) => setLessonDuration(e.target.value)} className='border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.05] transition ease-in-out duration-300 focus:shadow-gray-500 focus:shadow-2xl' placeholder='Duration' value={LessonDuration} required />
                                    </div>
                                    <div className='flex justify-between w-full items-center gap-[20px]'>
                                        <label className='text-dblue font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>URL</span><span>:</span></label>
                                        <input onChange={(e) => setLessonURL(e.target.value)} className='border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.05] transition ease-in-out duration-300 focus:shadow-gray-500 focus:shadow-2xl' placeholder='URL' value={LessonURL} required />
                                    </div>
                                    <button type='submit' className='flex w-full bg-dblue text-white font-gtaHeadingText2 text-[1.5em] rounded-xl justify-center align-center px-6 py-3 border-[1px] border-white border-solid hover:opacity-70 transition-all duration-[0.1s] active:scale-[0.98]'>Add New Lesson</button>
                                </form>
                            </div>
                        </div>
                    )
                }
            </div>

        </>


    );
};


const ReadLessons = () => {

    const [LessonData, setLessonData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/api/v1/selfDefense/lessons')
            .then((response) => {
                setLessonData(response.data)
            })
    }, [])
    return (
        <>
            <div className='w-screen h-screen py-6 px-3'>
                <table singleLine className='w-full h-full  flex flex-col'>
                    <thead className='bg-dblue text-whitish'>
                        <tr className='w-full h-[5em] flex '>
                            <th className='w-[5%] h-full border-x-[1px] border-x-solid border-x-dblue'><span className='w-full h-full flex justify-center items-center '>Id</span></th>
                            <th className='w-[10%] h-full border-x-[1px] border-x-solid border-x-dblue'><span className='w-full h-full flex justify-center items-center '>Name</span></th>
                            <th className='w-[20%] overflow-y-scroll h-full border-x-[1px] border-x-solid border-x-dblue'><span className='w-full h-full flex justify-center items-center '>Description</span></th>
                            <th className='w-[5%] h-full border-x-[1px] border-x-solid border-x-dblue'><span className='w-full h-full flex justify-center items-center '>Duration</span></th>
                            <th className='w-[35%] h-full border-x-[1px] border-x-solid border-x-dblue overflow-y-scroll'><span className='w-full h-full flex justify-center items-center'>URL</span></th>
                            <th className='w-[13%] h-full border-x-[1px] border-x-solid border-x-dblue'><span className='w-full h-full flex justify-center items-center '>Update</span></th>
                            <th className='w-[13%] h-full border-x-[1px] border-x-solid border-x-dblue'><span className='w-full h-full flex justify-center items-center '>Delete</span></th>
                        </tr>
                    </thead>

                    <tbody className='w-screen h-[80%]'>
                        {LessonData.map((data) => {
                            return (
                                <tr key={data.LessonId} className='w-full h-[6em] flex'>
                                    <td className='w-[5%] h-full border-[1px] border-solid border-dblue'><span className='w-full h-full flex justify-center items-center '>{data.LessonId}</span></td>
                                    <td className='w-[10%] h-full border-[1px]  border-solid border-dblue'><span className='w-full h-full flex justify-center items-center '>{data.LessonName}</span></td>
                                    <td className='w-[20%] overflow-y-scroll h-full border-[1px]  border-solid border-dblue'><span className='w-full h-full flex justify-center items-center' >{data.LessonDescription}</span></td>
                                    <td className='w-[5%] h-full border-[1px]  border-solid border-dblue'><span className='w-full h-full flex justify-center items-center'>{data.LessonDuration}</span></td>
                                    <td className='w-[35%] h-full border-[1px]  border-solid border-dblue overflow-scroll'><span className='w-full h-full flex justify-center items-center '>{data.LessonURL}</span></td>
                                    <td className='w-[13%] h-full border-[1px] border-solid border-dblue'><span className='w-full h-full flex justify-center items-center '><button className='px-8 py-3 bg-dblue text-white border-[1px] border-solid rounded-lg active:scale-95 hover:opacity-60 transition-all duration-[0.1s] '>Update</button></span></td>
                                    <td className='w-[13%] h-full border-[1px] border-solid border-dblue'><span className='w-full h-full flex justify-center items-center '><button onClick={() => deleteLesson(data._id)} className='px-6 py-3 bg-dblue text-white border-[1px] border-solid rounded-lg active:scale-95 hover:opacity-60 transition-all duration-[0.1s] '>Delete</button></span></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

const deleteLesson = (id) => {
    //delelting lesson by its id => data._id
    axios.delete(`http://localhost:4000/api/v1/selfDefense/lessons/${id}`)
}

const updateLesson = (id) => {

}


export default SelfDefenseAdmin;
