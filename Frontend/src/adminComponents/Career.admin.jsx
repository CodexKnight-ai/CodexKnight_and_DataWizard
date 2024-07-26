import React, { useEffect, useState } from "react";
import axios from "axios";

function CareerAdmin() {
  const [career, setCareer] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/career/create-career")
      .then((response) => setCareer(response.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <table className="border-collapse border-2 border-black">
        <thead>
          <tr className="border-collapse border-2 border-black">
            <th>Sr. no</th>
            <th>Career Title</th>
            <th>Career Description</th>
            <th>Career Image</th>
            <th>Edit button</th>
            <th>Delete button</th>
          </tr>
        </thead>
        <tbody>
          {career.map((career, index) => (
            <tr
              key={career._id}
              className="border-collapse border-2 border-black w-full text-center"
            >
              <td className="w-[5%] h-3 border-collapse border-2 border-black">
                {index + 1}
              </td>
              <td className="w-[20%] h-3 border-collapse border-2 border-black">
                {career.careerTitle}
              </td>
              <td className="w-[25%] h-3 border-collapse border-2 border-black">
                {career.careerDescription}
              </td>
              <td className="w-fit h-3 border-collapse border-2 border-black ">
                <img className="w-20 h-auto" src={career.careerImage} />
              </td>
              <td>
                <button
                  onClick={() => handleEdit(career)}
                  className="px-3  border-collapse border-2 border-black py-2 bg-dblue rounded-full text-white"
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleDeleteCriminal(career._id)}
                  className="px-3 py-2  border-collapse border-2 border-black rounded-full bg-dblue text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CareerAdmin;
