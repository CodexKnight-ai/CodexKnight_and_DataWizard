import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';;

const LostFoundAdmin = () => {

    const [isLostFormData , setisLostFormData] = useState(true)
    const [isFoundFormData , setisFoundFormData] = useState(false)
    

    return(
        <>  
            <div className =' w-full flex justify-between items-center h-[7em] py-6 px-3'>
                <div>
                    <span className='text-dblue font-gtaHeadingText1 text-[4em]'>Lost & Found Admin Portal !</span>
                </div>
                <div className='shadow-inset w-[20%] h-full rounded-full flex justify-around items-center'>
                    <span className="w-[50%] h-full flex items-center justify-center border-[1px] border-transparent border-solid rounded-full bg-transparent text-dblue font-gtaHeadingText2" 
                    style={isLostFormData ? {border:"#120458",backgroundColor:"#120458",color:"white"} : {}}
                    onClick={()=>(setisLostFormData(true), setisFoundFormData(false))}>
                        Lost Items
                    </span>
                    <span className='w-[50%] h-full flex items-center justify-center border-[1px] border-transparent border-solid rounded-full bg-transparent text-dblue font-gtaHeadingText2'
                    style={isFoundFormData ? {border:"#120458",backgroundColor:"#120458",color:"white"} : {}}
                    onClick={()=>(setisFoundFormData(true),setisLostFormData(false))}>
                        Found Items
                    </span>
                </div> 
            </div>

            {
                isLostFormData?<LostItemData/>:<FoundItemData/>                          
            }
            
        </>
    )
    
}


const LostItemData = () => {

    const [lostItemsData, setLostItemsData] = useState([]);
    const [confirmFound, setConfirmFound] = useState({ show: false, itemId: null });

    const notify = () => toast("item Deleted Successfully");

    const fetchLostItems = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/v1/lostfound/itemslost');
            setLostItemsData(response.data);
        } catch (error) {
            alert(error.response ? error.response.data.message : error.message);
        }
    };

    const deleteItem = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/v1/lostfound/itemslost/${id}`);
            notify()
            alert(response.data.message);
            setLostItemsData(lostItemsData.filter((item) => item._id !== id));
        } catch (error) {
            alert(error.response ? error.response.data.message : error.message);
        }
    };

    const moveItemToFound = async (id) => {
        try {

            await axios.post(`http://localhost:4000/api/v1/lostfound/moveitemstofound/${id}`);
            setLostItemsData(lostItemsData.filter((item) => item._id !== id));
        } catch (error) {
            alert(error.response ? error.response.data.message : error.message );
        }
    };

    useEffect(() => {
        fetchLostItems();
    }, []);

    return (
        <>
            <div className='w-screen h-screen py-6 px-3'>
                <table className='w-full h-full flex flex-col'>
                    <thead className='bg-dblue text-whitish'>
                        <tr className='w-full h-[5em] flex'>
                            <th className='w-[10%] h-full border-x-[1px] border-x-solid border-x-dblue'>
                                <span className='w-full h-full flex justify-center items-center '>Name</span>
                            </th>
                            <th className='w-[10%] h-full border-x-[1px] border-x-solid border-x-dblue'>
                                <span className='w-full h-full flex justify-center items-center '>Phone no</span>
                            </th>
                            <th className='w-[10%] h-full border-x-[1px] border-x-solid border-x-dblue'>
                                <span className='w-full h-full flex justify-center items-center '>Lost Item</span>
                            </th>
                            <th className='w-[17%] overflow-y-scroll h-full border-x-[1px] border-x-solid border-x-dblue'>
                                <span className='w-full h-full flex justify-center items-center '>Image</span>
                            </th>
                            <th className='w-[20%] h-full border-x-[1px] border-x-solid border-x-dblue overflow-y-scroll'>
                                <span className='w-full h-full flex justify-center items-center'>Description</span>
                            </th>
                            <th className='w-[10%] h-full border-x-[1px] border-x-solid border-x-dblue overflow-y-scroll'>
                                <span className='w-full h-full flex justify-center items-center'>Address</span>
                            </th>
                            <th className='w-[3%] h-full border-x-[1px] border-x-solid border-x-dblue'>
                                <span className='w-full h-full flex justify-center items-center '>Date</span>
                            </th>
                            <th className='w-[10%] h-full border-x-[1px] border-x-solid border-x-dblue'>
                                <span className='w-full h-full flex justify-center items-center '>isFound</span>
                            </th>
                            <th className='w-[13%] h-full border-x-[1px] border-x-solid border-x-dblue'>
                                <span className='w-full h-full flex justify-center items-center '>Delete</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className='w-full h-[80%]'>
                        {lostItemsData.map((data) => (
                            <tr key={data._id} className='w-full h-[8em] flex'>
                                <td className='w-[10%] overflow-scroll h-full border-[1px] border-solid border-dblue'>
                                    <span className='w-full h-full flex justify-center items-center '>{data.userName}</span>
                                </td>
                                <td className='w-[10%] overflow-scroll h-full border-[1px] border-solid border-dblue'>
                                    <span className='w-full h-full flex justify-center items-center'>{data.phoneNo}</span>
                                </td>
                                <td className='w-[10%] overflow-scroll h-full border-[1px] border-solid border-dblue'>
                                    <span className='w-full h-full flex justify-center items-center '>{data.lostItemName}</span>
                                </td>
                                <td className='w-[17%] overflow-scroll h-full border-[1px] border-solid border-dblue'>
                                    <span className='w-full h-full flex justify-center items-center' >{data.lostItemImage}</span>
                                </td>
                                <td className='w-[20%] overflow-scroll h-full border-[1px] border-solid border-dblue'>
                                    <span className='w-full h-full flex justify-center items-center '>{data.lostItemDiscription}</span>
                                </td>
                                <td className='w-[10%] overflow-scroll h-full border-[1px] border-solid border-dblue'>
                                    <span className='w-full h-full flex justify-center items-center '>{data.lostItemAddress}</span>
                                </td>
                                <td className='w-[3%] overflow-scroll h-full border-[1px] border-solid border-dblue'>
                                    <span className='w-full h-full flex justify-center items-center'>{data.lostItemDate}</span>
                                </td>
                                <td className='w-[10%] overflow-scroll h-full border-[1px] border-solid border-dblue'>
                                    <span className='w-full h-full flex justify-center items-center'>
                                        <button onClick={() => setConfirmFound({ show: true, itemId: data._id })} className='px-6 py-3 bg-dblue text-white border-[1px] border-solid rounded-lg active:scale-95 hover:opacity-60 transition-all duration-[0.1s] '>Found</button>
                                    </span>
                                </td>
                                <td className='w-[13%] overflow-scroll h-full border-[1px] border-solid border-dblue'>
                                    <span className='w-full h-full flex justify-center items-center '>
                                        <button onClick={() => deleteItem(data._id)} className='px-6 py-3 bg-dblue text-white border-[1px] border-solid rounded-lg active:scale-95 hover:opacity-60 transition-all duration-[0.1s] '>Delete</button>
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {confirmFound.show && (
                <ConfirmFoundItem 
                    onClose={() => setConfirmFound({ show: false, itemId: null })} 
                    onConfirm={() => {
                        moveItemToFound(confirmFound.itemId);
                        setConfirmFound({ show: false, itemId: null });
                    }}
                />
            )}
        </>
    );
};

const ConfirmFoundItem = ({ onClose, onConfirm }) => {
    return (
        <div className='fixed inset-0 backdrop-blur-sm backdrop-brightness-75 flex items-center justify-center'>
            <div className='bg-white p-4 rounded-lg'>
                <p className='font-gtaHeadingText2 text-dblue'>Are you sure the item is found?</p>
                <div className='flex justify-around mt-4 '>
                    <button onClick={onConfirm} className='w-[45%] px-4 py-2 bg-dblue text-white rounded-lg'>Yes</button>
                    <button onClick={onClose} className='w-[45%] px-4 py-2 bg-black text-white rounded-lg'>Cancel</button>
                </div>
            </div>
        </div>
    );
};
const FoundItemData = () => {
    const [foundItemsData, setFoundItemsData] = useState([]);

    const notify = () => {
        console.log("Notification triggered");
        toast("Item Deleted Successfully");
    };

    const fetchFoundItems = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/v1/lostfound/itemsfound');
            setFoundItemsData(response.data); 
        } catch (error) {
            alert(error.response ? error.response.data.message : error.message);
        }
    };

    const deleteItem = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/v1/lostfound/itemsfound/${id}`);
            notify()
            alert(response.data.message);
            setFoundItemsData((foundItemsData.filter((item) => item._id !== id)));
        } catch (error) {
            alert(error.response ? error.response.data.message : error.message);
        }
    };


    useEffect(() => {
        fetchFoundItems();
    }, []);

    return (
        <>
            <ToastContainer />
            <div className='w-screen h-screen py-6 px-3'>
                <table className='w-full h-full flex flex-col'>
                    <thead className='bg-dblue text-whitish'>
                        <tr className='w-full h-[5em] flex'>
                            <th className='w-[10%] h-full border-x-[1px] border-x-solid border-x-dblue'>
                                <span className='w-full h-full flex justify-center items-center '>Name</span>
                            </th>
                            <th className='w-[10%] h-full border-x-[1px] border-x-solid border-x-dblue'>
                                <span className='w-full h-full flex justify-center items-center '>Phone no</span>
                            </th>
                            <th className='w-[10%] h-full border-x-[1px] border-x-solid border-x-dblue'>
                                <span className='w-full h-full flex justify-center items-center '>Found Item</span>
                            </th>
                            <th className='w-[17%] overflow-y-scroll h-full border-x-[1px] border-x-solid border-x-dblue'>
                                <span className='w-full h-full flex justify-center items-center '>Image</span>
                            </th>
                            <th className='w-[20%] h-full border-x-[1px] border-x-solid border-x-dblue overflow-y-scroll'>
                                <span className='w-full h-full flex justify-center items-center'>Description</span>
                            </th>
                            <th className='w-[10%] h-full border-x-[1px] border-x-solid border-x-dblue overflow-y-scroll'>
                                <span className='w-full h-full flex justify-center items-center'>Address</span>
                            </th>
                            <th className='w-[10%] h-full border-x-[1px] border-x-solid border-x-dblue'>
                                <span className='w-full h-full flex justify-center items-center '>Date</span>
                            </th>
                            <th className='w-[13%] h-full border-x-[1px] border-x-solid border-x-dblue'>
                                <span className='w-full h-full flex justify-center items-center '>Delete</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className='w-full h-[80%]'>
                        {foundItemsData.map((data) => (
                            <tr key={data._id} className='w-full h-[8em] flex'>
                                <td className='w-[10%] overflow-scroll h-full border-[1px] border-solid border-dblue'>
                                    <span className='w-full h-full flex justify-center items-center '>{data.userName}</span>
                                </td>
                                <td className='w-[10%] overflow-scroll h-full border-[1px] border-solid border-dblue'>
                                    <span className='w-full h-full flex justify-center items-center'>{data.phoneNo}</span>
                                </td>
                                <td className='w-[10%] overflow-scroll h-full border-[1px] border-solid border-dblue'>
                                    <span className='w-full h-full flex justify-center items-center '>{data.foundItemName}</span>
                                </td>
                                <td className='w-[17%] overflow-scroll h-full border-[1px] border-solid border-dblue'>
                                    <span className='w-full h-full flex justify-center items-center' >{data.foundItemImage}</span>
                                </td>
                                <td className='w-[20%] overflow-scroll h-full border-[1px] border-solid border-dblue'>
                                    <span className='w-full h-full flex justify-center items-center '>{data.foundItemDiscription}</span>
                                </td>
                                <td className='w-[10%] overflow-scroll h-full border-[1px] border-solid border-dblue'>
                                    <span className='w-full h-full flex justify-center items-center '>{data.foundItemAddress}</span>
                                </td>
                                <td className='w-[10%] overflow-scroll h-full border-[1px] border-solid border-dblue'>
                                    <span className='w-full h-full flex justify-center items-center'>{data.foundItemDate}</span>
                                </td>
                                <td className='w-[13%] overflow-scroll h-full border-[1px] border-solid border-dblue'>
                                    <span className='w-full h-full flex justify-center items-center '>
                                        <button onClick={() => deleteItem(data._id)} className='px-6 py-3 bg-dblue text-white border-[1px] border-solid rounded-lg active:scale-95 hover:opacity-60 transition-all duration-[0.1s] '>Delete</button>
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default LostFoundAdmin