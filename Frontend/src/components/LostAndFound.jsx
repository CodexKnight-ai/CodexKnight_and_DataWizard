// import React, { useState } from "react";

// function LostAndFound() {
//   const [detailsVisible, setDetailsVisible] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);

  

//   const lostItems = [
//     { id: 1, name: "Item 1", description: "Description for Item 1" , status:false},
//     { id: 2, name: "Item 2", description: "Description for Item 2" , status:false},
//     { id: 3, name: "Item 3", description: "Description for Item 3" , status:false},
//     { id: 4, name: "Item 4", description: "Description for Item 4" , status:false},
//     { id: 5, name: "Item 5", description: "Description for Item 5" , status:false},
//     { id: 6, name: "Item 6", description: "Description for Item 6" , status:false},
//     { id: 7, name: "Item 7", description: "Description for Item 7" , status:false},
//     { id: 8, name: "Item 8", description: "Description for Item 8" , status:false},
//     // Add more items as needed
//   ];

//   const openDetails = (item) => {
//     setSelectedItem(item);
//     setDetailsVisible(true);
//   };



//   return (
//     <div className="mt-[8vh] flex h-[92vh] w-screen mainPage">
//       <div className="w-2/5 h-full bg-[#121212]"></div>
//       <div className="w-3/5 h-full overflow-hidden box-border">
//         <div className="w-full h-16 text-center bg-gray-600 font-gtaHeadingText1 text-4xl text-white">
//           LOST AND FOUND
//         </div>
//         <div className='w-full h-full bg-[url("/lnfBg.gif")] bg-center bg-cover flex flex-col items-center gap-3 overflow-auto p-2 '>
//           {/* <p className="flex items-start self-start fixed"><input className="w-4/5 h-10 pl-3 p-2 bg-[#0B3039] font-gtaDescriptionText text-2xl text-white self-start" placeholder="Search"/></p> */}
//           {/* {lostItems.map((item) => (
//             <div
//               key={item.id}
//               className="w-fit h-fit bg-[#11304dd4] px-10 py-8 flex flex-col "
//               onClick={() => openDetails(item)}
//             >
//               <div className="w-1/2 h-1/2 bg-black p-48"></div>
//               <div className="w-full h-fit bg-[#424241] text-center font-gtaHeadingText1 text-white p-4 text-3xl">
//                 {item.name}
//               </div>
//             </div>
//           ))} */}
//      
//         </div>
//         {detailsVisible && (
//           <div className='absolute w-4/5 h-3/4 bg-black top-20 left-6 ml-[10%] mr-[10%] border-white border-2 text-white'>
//             <div className="p-4">
//               <h2 className="text-4xl">{selectedItem.name}</h2>
//               <p className="mt-4">{selectedItem.description}</p>
//               <button
//                 className="mt-4 px-4 py-2 bg-red-600 text-white"
//                 onClick={() => setDetailsVisible(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default LostAndFound;



import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faSearch } from '@fortawesome/free-solid-svg-icons';


function LostAndFound() {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  // alert("Bak**di mat kr ghode")
  const lostItems = [
    { id: 1, name: "Item 1", description: "small nigga with one lag, no hairs, no hand, also gay and lesbian at a time", status: true ,image:"/crim1.jpeg"},
    { id: 2, name: "Item 2", description: "Description for Item 2", status: false ,image:"/crim2.jpeg"},
    { id: 3, name: "Item 3", description: "Description for Item 3", status: true ,image:"/crim3.jpeg"},
    { id: 4, name: "Item 4", description: "Description for Item 4", status: false ,image:"/crim4.jpeg"},
    { id: 5, name: "Item 5", description: "Description for Item 5", status: true ,image:"/crim1.jpeg"},
    { id: 6, name: "Item 6", description: "Description for Item 6", status: false ,image:"/crim2.jpeg"},
    { id: 7, name: "Item 7", description: "Description for Item 7", status: true ,image:"/crim3.jpeg"},
    { id: 8, name: "Item 8", description: "Description for Item 8", status: false ,image:"/crim4.jpeg"},
    // Add more items as needed
  ];

  const LostItemCard = ({ item }) => (
    <div className="flex font-sans bg-whitish p-5 rounded-lg w-[40vw] shadow-2xl" key={item.id} >
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
    <div className="mt-[8vh] flex h-[92vh] w-screen mainPage">
      <div className="w-2/5 h-full bg-[#121212]"></div>
      <div className="w-3/5 h-full overflow-hidden box-border">
        <div className="w-full h-16 text-center bg-gray-600 font-gtaHeadingText1 text-4xl text-white">
          LOST AND FOUND
        </div>
        <div className='w-full h-full flex flex-col items-center gap-3 overflow-auto p-2 '>
          {
            lostItems.map((item) => (
              <LostItemCard item={item} key={item.id} />
            ))
          }
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
}

export default LostAndFound;
