import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

const LostAndFound = () => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isItemLost, setIsItemLost] = useState(true); // State to toggle between forms
  const [isItemCardVisible, setisItemCardVisible] = useState(false);
  const [itemData, setItemData] = useState([]);

  const toggleItemCardVisibility = () => {
    setisItemCardVisible(!isItemCardVisible);
  };

  const LostItemCard = ({ item }) => {
    const openDetails = (item) => {
      setSelectedItem(item);
      setisItemCardVisible(true);
    };

    return (
      <div className="flex font-sans bg-whitish p-5 my-[10px] rounded-lg w-[40vw] shadow-2xl" key={item.id}>
        <div className="flex-none w-48 relative">
          <img src={item.lostItemImage} alt={item.lostItemName} className="rounded-lg absolute inset-0 w-full h-full object-cover" loading="lazy" />
        </div>
        <form className="flex-auto p-6">
          <div className="flex flex-wrap">
            <h1 className="flex-auto text-lg font-semibold text-slate-900">
              {item.lostItemName}
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
              {item.lostItemDiscription}
            </div>
          </div>
          <div className="flex space-x-4 mb-6 text-sm font-medium">
            <div className="flex-auto flex space-x-4">
              <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">
                Found?
              </button>
            </div>
            <button onClick={() => openDetails(item)} className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200" type="button" aria-label="Like">
              <FontAwesomeIcon icon={faArrowRight} style={{ color: "#120458" }} />
            </button>
          </div>
        </form>
      </div>
    );
  };

  const ItemFullCard = ({ onClose }) => {
    if (!selectedItem) return null;

    const { userName , lostItemDate , lostItemName, lostItemImage, lostItemDiscription } = selectedItem;

    return (
      <section className="fixed w-screen h-screen flex justify-center items-center top-0 backdrop-blur-sm backdrop-brightness-50">
        <div className="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem] flex-row">
          <div className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
            <img
              src={lostItemImage}
              alt={lostItemName}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-6">
            <p><b>Owner  :</b>{userName}</p>
            <p><b>Date   :</b>{lostItemDate}</p>
            <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
               <b>Detail :</b>{lostItemDiscription}
            </p>
            <p></p>
            <button onClick={onClose} className="px-4 py-2 bg-red-600 text-white rounded-lg">
              Close
            </button>
          </div>
        </div>
      </section>
    );
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/lostfound/itemslost");
        setItemData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    getItems();
  }, []);

  return (
    <div className="mt-[8vh] flex h-[92vh] w-screen">
      <div className="z-10">
        {isItemCardVisible && <ItemFullCard onClose={toggleItemCardVisibility} />}
      </div>
      <div className="z-9 w-[50%] h-full bg-[url('/logo2.png')]">
        {isItemLost ? <LostItemForm /> : <FoundItemForm />}
      </div>
      <div className="w-[50%] h-full overflow-hidden box-border">
        <div className="w-full h-full flex flex-col items-center gap-3 overflow-auto p-2">
          {itemData.map((item) => (
            <LostItemCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );

  function LostItemForm() {
    const [lostItemDate, setlostItemDate] = useState("");
    const [userName, setItemuserName] = useState("");
    const [lostItemImage, setlostItemImage] = useState(null);
    const [phoneNo, setphoneNo] = useState("");
    const [lostItemName, setlostItemName] = useState("");
    const [lostItemDiscription, setlostItemDiscription] = useState("");
    const [lostItemAddress, setlostItemAddress] = useState("");

    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('userName', userName);
      formData.append('phoneNo', phoneNo);
      formData.append('lostItemImage', lostItemImage);
      formData.append('lostItemName', lostItemName);
      formData.append('lostItemDiscription', lostItemDiscription);
      formData.append('lostItemAddress', lostItemAddress);
      formData.append('lostItemDate', lostItemDate);

      try {
        const response = await axios.post('http://localhost:4000/api/v1/lostfound/itemslost', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        setlostItemDate("");
        setItemuserName("");
        setlostItemImage(null);
        setphoneNo("");
        setlostItemName("");
        setlostItemDiscription("");
        setlostItemAddress("");
      } catch (error) {
        console.error('Error adding lost item:', error.response?.data || error.message);
      }
    };

    return (
      <div className="w-full h-full flex justify-center items-center backdrop-blur-md backdrop-brightness-50">
        <form onSubmit={handleSubmit} className="flex flex-col px-[10px] py-[10px] w-full h-full justify-between items-between font-gtaHeadingText2">
          <div className="font-gtaHeadingText2 px-[15px] py-[5px] rounded-lg text-[1em] w-full flex justify-center items-center">
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
          <div className="flex justify-between w-full items-center gap-[20px]">
            <label className="text-whitish font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]"><span>Name</span><span>:</span></label>
            <input onChange={(e) => setItemuserName(e.target.value)} value={userName} className="text-dblue border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset  focus:bg-white focus:transform focus:scale-[1.015] transition ease-in-out duration-300 focus:shadow-gray-950 focus:shadow-2xl" placeholder="fullname" required />
          </div>
          <div className="flex justify-between w-full items-center gap-[20px]">
            <label className="text-whitish font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]"><span>Phone</span><span>:</span></label>
            <input onChange={(e) => setphoneNo(e.target.value)} value={phoneNo} className="text-dblue border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset  focus:bg-white focus:transform focus:scale-[1.015] transition ease-in-out duration-300 focus:shadow-gray-950 focus:shadow-2xl" placeholder="phone number" required />
          </div>
          <div className="flex justify-between w-full items-center gap-[20px]">
            <label className="text-whitish font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]"><span>Item</span><span>:</span></label>
            <input onChange={(e) => setlostItemName(e.target.value)} value={lostItemName} className="text-dblue border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset  focus:bg-white focus:transform focus:scale-[1.015] transition ease-in-out duration-300 focus:shadow-gray-950 focus:shadow-2xl" placeholder="lost item" required />
          </div>
          <div className="flex justify-between w-full items-center gap-[20px]">
            <label className="text-whitish font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]"><span>Description</span><span>:</span></label>
            <textarea onChange={(e) => setlostItemDiscription(e.target.value)} value={lostItemDiscription} rows={4} cols={5} className="text-dblue border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset  focus:bg-white focus:transform focus:scale-[1.015] transition ease-in-out duration-300 focus:shadow-gray-950 focus:shadow-2xl" placeholder="Item description" required></textarea>
          </div>
          <div className="flex justify-between w-full items-center gap-[20px]">
            <label className="text-whitish font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]"><span>Photo</span><span>:</span></label>
            <input onChange={(e) => setlostItemImage(e.target.value)} value={lostItemImage} type="file" accept="image/*" className="text-dblue border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset  focus:bg-white focus:transform focus:scale-[1.015] transition ease-in-out duration-300 focus:shadow-gray-950 focus:shadow-2xl" placeholder="phone number" required />
          </div>
          <div className="flex justify-between w-full items-center gap-[20px]">
            <label className="text-whitish font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]"><span>Location</span><span>:</span></label>
            <input onChange={(e) => setlostItemAddress(e.target.value)} value={lostItemAddress} className="text-dblue border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset  focus:bg-white focus:transform focus:scale-[1.015] transition ease-in-out duration-300 focus:shadow-gray-950 focus:shadow-2xl" placeholder="address" required />
          </div>
          <div className="flex justify-between w-full items-center gap-[20px]">
            <label className="text-whitish font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]"><span>Date</span><span>:</span></label>
            <input onChange={(e) => setlostItemDate(e.target.value)} value={lostItemDate} type="date" className="text-dblue border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset  focus:bg-white focus:transform focus:scale-[1.015] transition ease-in-out duration-300 focus:shadow-gray-950 focus:shadow-2xl" placeholder="date" required />
          </div>
          <button className='py-[5px] w-full h-[3em] justify-center text-[1.5rem] items-center border-[1px] border-dblue flex bg-dblue text-whitish rounded-[20px] font-gtaHeadingText2 hover:bg-transparent hover:text-white hover:border-white transition-all ease-in-out duration-300' type="submit">
              Submit
          </button>
        </form>
      </div>
    );
  }

  function FoundItemForm() {
    const [foundItemDate, setfoundItemDate] = useState();
    const [userName, setItemuserName] = useState();
    const [foundItemImage, setfoundItemImage] = useState();
    const [phoneNo, setphoneNo] = useState();
    const [foundItemName, setfoundItemName] = useState();
    const [foundItemDiscription, setfoundItemDiscription] = useState();
    const [foundItemAddress, setfoundItemAddress] = useState();

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post('http://localhost:4000/api/v1/lostfound/itemslost', {
          userName,
          phoneNo,
          foundItemImage,
          foundItemName,
          foundItemDiscription,
          foundItemAddress,
          foundItemDate,
        });

        setfoundItemDate("");
        setItemuserName("");
        setfoundItemImage("");
        setphoneNo("");
        setfoundItemName("");
        setfoundItemDiscription("");
        setfoundItemAddress("");
      } catch (error) {
        console.error('Error adding lost item:', error.response?.data || error.message);
      }
    };
    return (
      <div className="flex justify-center items-center w-full h-full backdrop-blur-md backdrop-brightness-50">
        <form className="flex flex-col px-[10px] py-[10px] w-full h-full justify-between items-between font-gtaHeadingText2">
          <div className="font-gtaHeadingText2 px-[15px] py-[5px] rounded-lg text-[1em] w-full flex justify-center items-center">
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
          <div className="flex justify-between w-full items-center gap-[20px]">
            <label className="text-whitish font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]"><span>Name</span><span>:</span></label>
            <input onChange={(e) => setItemuserName(e.target.value)} value={userName} className="text-dblue border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset  focus:bg-white focus:transform focus:scale-[1.015] transition ease-in-out duration-300 focus:shadow-gray-950 focus:shadow-2xl" placeholder="fullname" required />
          </div>
          <div className="flex justify-between w-full items-center gap-[20px]">
            <label className="text-whitish font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]"><span>Phone</span><span>:</span></label>
            <input onChange={(e) => setphoneNo(e.target.value)} value={phoneNo} className="text-dblue border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset  focus:bg-white focus:transform focus:scale-[1.015] transition ease-in-out duration-300 focus:shadow-gray-950 focus:shadow-2xl" placeholder="phone number" required />
          </div>
          <div className="flex justify-between w-full items-center gap-[20px]">
            <label className="text-whitish font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]"><span>Item</span><span>:</span></label>
            <input onChange={(e) => setfoundItemName(e.target.value)} value={foundItemName} className="text-dblue border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset  focus:bg-white focus:transform focus:scale-[1.015] transition ease-in-out duration-300 focus:shadow-gray-950 focus:shadow-2xl" placeholder="lost item" required />
          </div>
          <div className="flex justify-between w-full items-center gap-[20px]">
            <label className="text-whitish font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]"><span>Description</span><span>:</span></label>
            <textarea onChange={(e) => setfoundItemDiscription(e.target.value)} value={foundItemDiscription} rows={4} cols={5} className="text-dblue border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset  focus:bg-white focus:transform focus:scale-[1.015] transition ease-in-out duration-300 focus:shadow-gray-950 focus:shadow-2xl" placeholder="Item description" required></textarea>
          </div>
          <div className="flex justify-between w-full items-center gap-[20px]">
            <label className="text-whitish font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]"><span>Photo</span><span>:</span></label>
            <input onChange={(e) => setfoundItemImage(e.target.value)} value={foundItemImage} type="file" accept="image/*" className="text-dblue border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset  focus:bg-white focus:transform focus:scale-[1.015] transition ease-in-out duration-300 focus:shadow-gray-950 focus:shadow-2xl" placeholder="phone number" required />
          </div>
          <div className="flex justify-between w-full items-center gap-[20px]">
            <label className="text-whitish font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]"><span>Location</span><span>:</span></label>
            <input onChange={(e) => setfoundItemAddress(e.target.value)} value={foundItemAddress} className="text-dblue border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset  focus:bg-white focus:transform focus:scale-[1.015] transition ease-in-out duration-300 focus:shadow-gray-950 focus:shadow-2xl" placeholder="address" required />
          </div>
          <div className="flex justify-between w-full items-center gap-[20px]">
            <label className="text-whitish font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]"><span>Date</span><span>:</span></label>
            <input onChange={(e) => setfoundItemDate(e.target.value)} value={foundItemDate} type="date" className="text-dblue border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset  focus:bg-white focus:transform focus:scale-[1.015] transition ease-in-out duration-300 focus:shadow-gray-950 focus:shadow-2xl" placeholder="date" required />
          </div>
          <button className='py-[5px] w-full h-[3em] justify-center text-[1.5rem] items-center border-[1px] border-dblue flex bg-dblue text-whitish rounded-[20px] font-gtaHeadingText2 hover:bg-transparent hover:text-white hover:border-white transition-all ease-in-out duration-300' type="submit">
              Submit
          </button>
        </form>
      </div>
    );
  }
};

export default LostAndFound;
