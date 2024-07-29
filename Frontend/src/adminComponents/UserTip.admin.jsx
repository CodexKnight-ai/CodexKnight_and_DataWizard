import React, { useEffect,useState } from 'react';
import axios from 'axios';

const UserTipsAdmin = () => {


    return (
        <>
            <div className='flex justify-between py-6 px-3 items-center'>
                <span className='text-dblue font-gtaHeadingText1 text-[4em]'>User Tip Admin Portal !</span>
            </div>
            <GetUserTips/>
        </>
    )
}

const GetUserTips = () => {

    const [tipData, settipData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/api/v1/userTips/tips')
            .then((response) => {
                settipData(response.data)
            })
            .catch((error)=>{
                console.log("Getting error in fetching tips",error)
            })
            
    }, [])

    const deleteTip = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/v1/userTips/tips/${id}`);
            settipData(tipData.filter((tip) => tip._id !== id));
        } catch (error) {
            console.log("Error deleting tip:", error);
        }
    };

    return (
        <>
            <div className='w-screen h-screen py-6 px-3'>
                <table singleLine className='w-full h-full  flex flex-col'>
                    <thead className='bg-dblue text-whitish'>
                        <tr className='w-full h-[5em] flex '>
                            <th className='w-[15%] h-full border-x-[1px] border-x-solid border-x-dblue'><span className='w-full h-full flex justify-center items-center '>Catagory</span></th>
                            <th className='w-[30%] overflow-y-scroll h-full border-x-[1px] border-x-solid border-x-dblue'><span className='w-full h-full flex justify-center items-center '>Description</span></th>
                            <th className='w-[10%] h-full border-x-[1px] border-x-solid border-x-dblue'><span className='w-full h-full flex justify-center items-center '>Date</span></th>
                            <th className='w-[35%] h-full border-x-[1px] border-x-solid border-x-dblue overflow-y-scroll'><span className='w-full h-full flex justify-center items-center'>Files</span></th>
                            <th className='w-[10%] h-full border-x-[1px] border-x-solid border-x-dblue'><span className='w-full h-full flex justify-center items-center '>Delete</span></th>
                        </tr>
                    </thead>

                    <tbody className='w-screen h-[80%]'>
                        {tipData.map((data) => {
                            return (
                                <tr key={data._id} className='w-full h-[6em] flex'>
                                    <td className='w-[15%] h-full border-[1px]  border-solid border-dblue'><span className='w-full h-full flex justify-center items-center '>{data.tipCategory}</span></td>
                                    <td className='w-[30%] overflow-y-scroll h-full border-[1px]  border-solid border-dblue'><span className='w-full h-full flex justify-center items-center' >{data.tipDescription}</span></td>
                                    <td className='w-[10%] h-full border-[1px]  border-solid border-dblue'><span className='w-full h-full flex justify-center items-center'>{data.tipDate}</span></td>
                                    <td className='w-[35%] h-full border-[1px] border-solid border-dblue overflow-scroll'><span className='w-full h-full flex justify-center items-center'>{data.tipAttachments?.map(file => <a href={file} key={file} target="_blank" rel="noopener noreferrer">{file}</a>)}</span></td>
                                    <td className='w-[10%] h-full border-[1px] border-solid border-dblue'><span className='w-full h-full flex justify-center items-center '><button onClick={() => deleteTip(data._id)} className='px-6 py-3 bg-dblue text-white border-[1px] border-solid rounded-lg active:scale-95 hover:opacity-60 transition-all duration-[0.1s] '>Delete</button></span></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )

    
}


export default UserTipsAdmin;