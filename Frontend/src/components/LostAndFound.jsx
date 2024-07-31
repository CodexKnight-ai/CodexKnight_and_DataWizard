import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

const LostAndFound = () => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isItemLost, setIsItemLost] = useState(true); // State to toggle between forms

  const lostItems = [
    { id: 1, name: "Item 1", description: "Description for Item 1", status: true, image: "/crim1.jpeg" },
    { id: 2, name: "Item 2", description: "Description for Item 2", status: false, image: "/crim2.jpeg" },
    { id: 3, name: "Item 3", description: "Description for Item 3", status: true, image: "/crim3.jpeg" },
    { id: 4, name: "Item 4", description: "Description for Item 4", status: false, image: "/crim4.jpeg" },
    { id: 5, name: "Item 5", description: "Description for Item 5", status: true, image: "/crim1.jpeg" },
    { id: 6, name: "Item 6", description: "Description for Item 6", status: false, image: "/crim2.jpeg" },
    { id: 7, name: "Item 7", description: "Description for Item 7", status: true, image: "/crim3.jpeg" },
    { id: 8, name: "Item 8", description: "Description for Item 8", status: false, image: "/crim4.jpeg" },
    // Add more items as needed
  ];

  const LostItemCard = ({ item }) => (
    <div className="flex font-sans bg-whitish p-5 my-[10px] rounded-lg w-[40vw] shadow-2xl" key={item.id} >
      <div className="flex-none w-48 relative">
        <img src={item.image} alt="" className="rounded-lg absolute inset-0 w-full h-full object-cover" loading="lazy" />
      </div>
      <form className="flex-auto p-6">
        <div className="flex flex-wrap">
          <h1 className="flex-auto text-lg font-semibold text-slate-900">
            {item.name}
          </h1>
          <div className="text-lg font-semibold text-slate-500">
            <div className={`w-full flex-none text-sm font-medium text-slate-700 mt-2 ${item.status ? "text-[#120458]" : "text-red-600"}`}>
              {item.status ? "Found " : "Lost "}
              {item.status ? (<FontAwesomeIcon icon={faCheckCircle} style={{ color: "#120458" }} />) : (<FontAwesomeIcon icon={faTimesCircle} style={{ color: "rgb(220,38,38)" }} />)}
            </div>
          </div>

        </div>
        <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
          <div className="space-x-2 flex text-sm">
            {item.description}
          </div>
        </div>
        <div className="flex space-x-4 mb-6 text-sm font-medium">
          <div className="flex-auto flex space-x-4">
            <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">
              Found?
            </button>
          </div>
          <button className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200" type="button" aria-label="Like">
            <FontAwesomeIcon icon={faSearch} style={{ color: "#120458" }} />
          </button>
        </div>
      </form>
    </div>
  );

  const openDetails = (item) => {
    setSelectedItem(item);
    setDetailsVisible(true);
  };

  return (
    <div className="mt-[8vh] flex h-[92vh] w-screen p">
      <div className="w-[50%] h-full bg-[url('/logo2.png')] ">
        {isItemLost ? <LostItemForm /> : <FoundItemForm />}
      </div>
      <div className="w-[50%] h-full overflow-hidden box-border">
        <div className='w-full h-full flex flex-col items-center gap-3 overflow-auto p-2 '>
          {lostItems.map((item) => (
            <LostItemCard item={item} key={item.id} />
          ))}
        </div>
        {detailsVisible && (
          <div className='absolute w-4/5 h-3/4 bg-black top-20 left-6 ml-[10%] mr-[10%] border-white border-2 text-white'>
            <div className="p-4">
              <h2 className="text-4xl">{selectedItem.name}</h2>
              <p className="mt-4">{selectedItem.description}</p>
              <button
                className="mt-4 px-4 py-2 bg-red-600 text-white"
                onClick={() => setDetailsVisible(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  function LostItemForm() {

    const [lostItemDate, setlostItemDate] = useState([]);
    const [userName , setItemuserName] = useState([]);
    const [lostItemImage , setlostItemImage] = useState([]);
    const [phoneNo , setphoneNo] = useState([]);
    const [lostItemName , setlostItemName] = useState([]);
    const [lostItemDiscription , setlostItemDiscription] = useState([]);
    const [lostItemAddress , setlostItemAddress] = useState([]);

    
    const handleSubmit = async (event) => {
      //Handling onSubmit form event here!
      event.preventDefault();

      try {
        const response = await axios.post('http://localhost:4000/api/v1/lostfound/itemslost', {
          userName,
          phoneNo,
          lostItemImage,
          lostItemName,
          lostItemDiscription,
          lostItemAddress,
          lostItemDate
        });
        
        setlostItemDate("")
        setItemuserName("")
        setlostItemImage("")
        setphoneNo("")
        setlostItemName("")
        setlostItemDiscription("")
        setlostItemAddress("")

      } catch (error) {
        console.error('Error adding lost item:', error.response?.data || error.message);
      }
  
      
    };

    return (
      <div  className=' w-full h-full flex justify-center items-center backdrop-blur-md  backdrop-brightness-50 '>
        <form onSubmit={handleSubmit} className='flex flex-col px-[10px] py-[10px] w-full h-full justify-between items-between font-gtaHeadingText2'>
          <div className='font-gtaHeadingText2 px-[15px] py-[5px]  rounded-lg e text-[1em] w-full flex justify-center items-center '>
            <div className="flex items-center text-dblue border-none outline-none w-[50%] h-[4em] rounded-full bg-white shadow-inset">
              <span
                className={`w-[50%] flex justify-center items-center cursor-pointer px-10 py-5 rounded-full ${isItemLost ? 'text-whitish bg-dblue' : ''}`}
                onClick={() => setIsItemLost(true)}
              >
                Missing
              </span>
              <span
                className={`w-[50%] flex justify-center items-center cursor-pointer px-10 py-5 rounded-full ${!isItemLost ? 'text-whitish bg-dblue ' : ''}`}
                onClick={() => setIsItemLost(false)}
              >
                Found
              </span>
            </div>
          </div>
          <div className='flex justify-between w-full items-center gap-[20px]'>
            <label className='text-whitish font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>Name</span><span>:</span></label>
            <input className='text-dblue border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset  focus:bg-white focus:transform focus:scale-[1.015] transition ease-in-out duration-300 focus:shadow-gray-950 focus:shadow-2xl' placeholder='fullname' required />
          </div>
          <div className='flex justify-between w-full items-center gap-[20px]'>
            <label className='text-whitish font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>Phone No</span><span>:</span></label>
            <input className='text-dblue border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.015] transition ease-in-out duration-300 focus:shadow-gray-950 focus:shadow-2xl' placeholder='phone number' required />
          </div>
          <div className='flex justify-between w-full items-center gap-[20px]'>
            <label className='text-whitish font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>Item Name</span><span>:</span></label>
            <input className='text-dblue   border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.015] transition ease-in-out duration-300 focus:shadow-gray-950 focus:shadow-2xl' placeholder='name of lost item' required />
          </div>
          <div className='flex justify-between w-full items-center gap-[20px]'>
            <label className='text-whitish font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>Item Image</span><span>:</span></label>
            <input type="file" className='text-dblue   border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.015] transition ease-in-out duration-300 focus:shadow-gray-950 focus:shadow-2xl'  />
          </div>
          <div className='flex justify-between w-full items-center gap-[20px]'>
            <label className='text-whitish font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>Address</span><span>:</span></label>
            <input className='text-dblue   border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.015] transition ease-in-out duration-300 focus:shadow-gray-950 focus:shadow-2xl' placeholder='where it was lost' required />
          </div>
          <div className='flex justify-between w-full items-center gap-[20px]'>
            <label className='text-whitish font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>Date</span><span>:</span></label>
            <input type="date" className='text-dblue   border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.015] transition ease-in-out duration-300 focus:shadow-gray-950 focus:shadow-2xl' required />
          </div>
          <div className='w-full flex justify-between items-center gap-[20px]'>
            <button className='py-[5px] w-full h-[3em] justify-center text-[1.5rem] items-center border-[1px] border-dblue flex bg-dblue text-whitish rounded-[20px] font-gtaHeadingText2  hover:bg-transparent hover:text-white hover:border-white transition-all ease-in-out duration-300' type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }

  function FoundItemForm() {
    return (
      <div className=' w-full h-full flex justify-center items-center backdrop-blur-md  backdrop-brightness-50 '>
        <form className='flex flex-col px-[10px] py-[10px] w-full h-full justify-between items-between font-gtaHeadingText2'>
          <div className='font-gtaHeadingText2 px-[15px] py-[5px]  rounded-lg e text-[1em] w-full flex justify-center items-center '>
            <div className="flex items-center text-dblue border-none outline-none w-[50%] h-[4em] rounded-full bg-white shadow-inset">
              <span
                className={`w-[50%] flex justify-center items-center cursor-pointer px-10 py-5 rounded-full ${isItemLost ? 'text-whitish bg-dblue' : ''}`}
                onClick={() => setIsItemLost(true)}
              >
                Missing
              </span>
              <span
                className={`w-[50%] flex justify-center items-center cursor-pointer px-10 py-5 rounded-full ${!isItemLost ? 'text-whitish bg-dblue' : ''}`}
                onClick={() => setIsItemLost(false)}
              >
                Found
              </span>
            </div>
          </div>
          <div className='flex justify-between w-full items-center gap-[20px]'>
            <label className='text-whitish font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>Name</span><span>:</span></label>
            <input className='text-dblue border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset  focus:bg-white focus:transform focus:scale-[1.015] transition ease-in-out duration-300 focus:shadow-gray-950 focus:shadow-2xl' placeholder='fullname' required />
          </div>
          <div className='flex justify-between w-full items-center gap-[20px]'>
            <label className='text-whitish font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>Phone No</span><span>:</span></label>
            <input className='text-dblue border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.015] transition ease-in-out duration-300 focus:shadow-gray-950 focus:shadow-2xl' placeholder='phone number' required />
          </div>
          <div className='flex justify-between w-full items-center gap-[20px]'>
            <label className='text-whitish font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>Item Name</span><span>:</span></label>
            <input className='text-dblue   border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.015] transition ease-in-out duration-300 focus:shadow-gray-950 focus:shadow-2xl' placeholder='name of found item' required />
          </div>
          <div className='flex justify-between w-full items-center gap-[20px]'>
            <label className='text-whitish font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>Item Image</span><span>:</span></label>
            <input type="file" className='text-dblue   border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.015] transition ease-in-out duration-300 focus:shadow-gray-950 focus:shadow-2xl' required />
          </div>
          <div className='flex justify-between w-full items-center gap-[20px]'>
            <label className='text-whitish font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>Address</span><span>:</span></label>
            <input className='text-dblue   border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.015] transition ease-in-out duration-300 focus:shadow-gray-950 focus:shadow-2xl' placeholder='where it was found' required />
          </div>
          <div className='flex justify-between w-full items-center gap-[20px]'>
            <label className='text-whitish font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>Date</span><span>:</span></label>
            <input type="date" className='text-dblue   border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.015] transition ease-in-out duration-300 focus:shadow-gray-950 focus:shadow-2xl' required />
          </div>
          <div className='w-full flex justify-between items-center gap-[20px]'>
            <button className='py-[5px] w-full h-[3em] justify-center text-[1.5rem] items-center border-[1px] border-dblue flex bg-dblue text-whitish rounded-[20px] font-gtaHeadingText2  hover:bg-transparent hover:text-white hover:border-white transition-all ease-in-out duration-300' type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LostAndFound;
