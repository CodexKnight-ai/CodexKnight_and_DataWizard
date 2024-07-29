import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LostFoundAdmin = () => {

    const [lostItemsData, setlostItemsData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/api/v1/lostfound/items')
            .then((response) => {
                setlostItemsData(response.data)
            })
    }, [])
    return (
        <>
            <div className='w-screen h-screen py-6'>
                <table singleLine className='w-full h-full  flex flex-col'>
                    <thead className='bg-dblue text-whitish'>
                        <tr className='w-full h-[5em] flex '>
                            <th className='w-[10%] h-full border-x-[1px] border-x-solid border-x-dblue'><span className='w-full h-full flex justify-center items-center '>Name</span></th>
                            <th className='w-[10%] h-full border-x-[1px] border-x-solid border-x-dblue'><span className='w-full h-full flex justify-center items-center '>Phone no</span></th>
                            <th className='w-[10%] h-full border-x-[1px] border-x-solid border-x-dblue'><span className='w-full h-full flex justify-center items-center '>Lost Item</span></th>
                            <th className='w-[17%] overflow-y-scroll h-full border-x-[1px] border-x-solid border-x-dblue'><span className='w-full h-full flex justify-center items-center '>image</span></th>
                            <th className='w-[20%] h-full border-x-[1px] border-x-solid border-x-dblue overflow-y-scroll'><span className='w-full h-full flex justify-center items-center'>Description</span></th>
                            <th className='w-[10%] h-full border-x-[1px] border-x-solid border-x-dblue overflow-y-scroll'><span className='w-full h-full flex justify-center items-center'>Address</span></th>
                            <th className='w-[3%] h-full border-x-[1px] border-x-solid border-x-dblue'><span className='w-full h-full flex justify-center items-center '>Date</span></th>
                            <th className='w-[10%] h-full border-x-[1px] border-x-solid border-x-dblue'><span className='w-full h-full flex justify-center items-center '>Update</span></th>
                            <th className='w-[10%] h-full border-x-[1px] border-x-solid border-x-dblue'><span className='w-full h-full flex justify-center items-center '>Delete</span></th>
                        </tr>
                    </thead>

                    <tbody className='w-screen h-[80%]'>
                        {lostItemsData.map((data) => {
                            return (
                                <tr key={data.LessonId} className='w-full h-[8em] flex'>
                                    <td className='w-[10%] overflow-scroll h-full border-[1px]  border-solid border-dblue'><span className='w-full h-full flex justify-center items-center '>{data.userName}</span></td>
                                    <td className='w-[10%] overflow-scroll h-full border-[1px]  border-solid border-dblue'><span className='w-full h-full flex justify-center items-center'>{data.phoneNo}</span></td>
                                    <td className='w-[10%] overflow-scroll h-full border-[1px]  border-solid border-dblue'><span className='w-full h-full flex justify-center items-center '>{data.lostItemName}</span></td>
                                    <td className='w-[17%] overflow-scroll h-full border-[1px]  border-solid border-dblue'><span className='w-full h-full flex justify-center items-center' >{data.lostItemImage}</span></td>
                                    <td className='w-[20%] overflow-scroll h-full border-[1px]  border-solid border-dblue'><span className='w-full h-full flex justify-center items-center '>{data.lostItemDiscription}</span></td>
                                    <td className='w-[10%] overflow-scroll h-full border-[1px]  border-solid border-dblue'><span className='w-full h-full flex justify-center items-center '>{data.lostItemAddress}</span></td>
                                    <td className='w-[3%]  overflow-scroll h-full border-[1px]  border-solid border-dblue'><span className='w-full h-full flex justify-center items-center'>{data.lostItemDate}</span></td>
                                    <td className='w-[10%] overflow-scroll h-full border-[1px]  border-solid border-dblue'><span className='w-full h-full flex justify-center items-center '><button className='px-8 py-3 bg-dblue text-white border-[1px] border-solid rounded-lg active:scale-95 hover:opacity-60 transition-all duration-[0.1s] '>Update</button></span></td>
                                    <td className='w-[10%] overflow-scroll h-full border-[1px]  border-solid border-dblue'><span className='w-full h-full flex justify-center items-center '><button onClick={deleteItem(data._id)} className='px-6 py-3 bg-dblue text-white border-[1px] border-solid rounded-lg active:scale-95 hover:opacity-60 transition-all duration-[0.1s] '>Delete</button></span></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )

    
}

const deleteItem = (id) => {
    //delelting item by its id => data._id
    axios.delete(`http://localhost:4000/api/v1/lostfound/items/${id}`)
}
export default LostFoundAdmin