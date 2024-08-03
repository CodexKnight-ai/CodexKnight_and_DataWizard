import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "semantic-ui-react";
import axios from "axios";

function CareerAdmin() {
  const [career, setCareer] = useState([]);

  const [careerTitle, setTitle] = useState("");
  const [careerQualification, setQualifications] = useState("");
  const [careerDescription, setDescription] = useState("");
  const [careerJob, setJob] = useState("");
  const [careerSalary, setSalary] = useState("");
  const [careerImage, setImage] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/career/create-career") // Updated endpoint
      .then((response) => setCareer(response.data))
      .catch((err) => console.log(err));
  }, []);

  const postCareer = (e) => {
    e.preventDefault();

    // Create FormData object
    const formData = new FormData();
    formData.append("careerTitle", careerTitle);
    formData.append("careerDescription", careerDescription);
    formData.append("careerQualification", careerQualification);
    formData.append("careerJob", careerJob);
    formData.append("careerSalary", careerSalary);
    if (careerImage) {
      formData.append("careerImage", careerImage);
    }

    axios
      .post("http://localhost:4000/api/v1/career/create-career", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((response) => {
        console.log("Career added:", response);
        // Optionally refresh the list
        axios.get("http://localhost:4000/api/v1/career/create-career")
             .then((response) => setCareer(response.data))
             .catch((err) => console.log(err));
      })
      .catch((err) => console.log("Error in adding career:", err));
  };
  const handleDeleteCriminal=(id)=>{
    axios.delete(`http://localhost:4000/api/v1/career/careers/${id}`)
    .then(()=>{
      setCareer(career.filter((data)=>data._id!==id));
    })
    .catch((error)=>{
      console.log("Error in delete career option",error)
    })


  }

  return (
    <div className="flex flex-col h-fit w-full justify-between gap-48">
      <Form className="flex flex-col gap-[40px] px-[10px] py-[10px] w-[50vw] h-screen justify-around items-between font-gtaHeadingText2">
        <h1 className="font-gtaHeadingText1 text-dblue text-[3em] flex justify-center items-center">
          Add New Career Options
        </h1>
        <Form.Field className="flex justify-between w-full items-center gap-[20px]">
          <label className="text-dblue font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]">
            <span>Title</span>
            <span>:</span>
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            className="border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.05] transition ease-in-out duration-300 focus:shadow-gray-500 focus:shadow-2xl"
            placeholder="Title"
          />
        </Form.Field>
        <Form.Field className="flex justify-between w-full items-center gap-[20px]">
          <label className="text-dblue font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]">
            <span>Qualifications</span>
            <span>:</span>
          </label>
          <input
            onChange={(e) => setQualifications(e.target.value)}
            className="border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.05] transition ease-in-out duration-300 focus:shadow-gray-500 focus:shadow-2xl"
            placeholder="Qualifications"
          />
        </Form.Field>
        <Form.Field className="flex justify-between w-full items-center gap-[20px]">
          <label className="text-dblue font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]">
            <span>Job</span>
            <span>:</span>
          </label>
          <input
            onChange={(e) => setJob(e.target.value)}
            className="border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.05] transition ease-in-out duration-300 focus:shadow-gray-500 focus:shadow-2xl"
            placeholder="Job"
          />
        </Form.Field>
        <Form.Field className="flex justify-between w-full items-center gap-[20px]">
          <label className="text-dblue font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]">
            <span>Salary</span>
            <span>:</span>
          </label>
          <input
            onChange={(e) => setSalary(e.target.value)}
            className="border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.05] transition ease-in-out duration-300 focus:shadow-gray-500 focus:shadow-2xl"
            placeholder="Salary"
          />
        </Form.Field>
        <Form.Field className="flex justify-between w-full items-center gap-[20px]">
          <label className="text-dblue font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]">
            <span>Description</span>
            <span>:</span>
          </label>
          <input
            onChange={(e) => setDescription(e.target.value)}
            className="border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.05] transition ease-in-out duration-300 focus:shadow-gray-500 focus:shadow-2xl"
            placeholder="Description"
          />
        </Form.Field>
        <Form.Field className="flex justify-between w-full items-center gap-[20px]">
          <label className="text-dblue font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]">
            <span>Image</span>
            <span>:</span>
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.05] transition ease-in-out duration-300 focus:shadow-gray-500 focus:shadow-2xl"
          />
        </Form.Field>
        <Button
          type="submit"
          onClick={postCareer}
          className="flex w-full bg-dblue text-white font-gtaHeadingText2 text-[1.5em] rounded-xl justify-center align-center px-6 py-3 border-[1px] border-white border-solid hover:bg-white hover:text-dblue hover:border-white hover:shadow-inset hover:shadow-gray-400 transition-all duration-[0.3s] active:opacity-40"
        >
          Add New Career
        </Button>
      </Form>

      <table className="border-collapse border-2 border-black">
        <thead>
          <tr className="border-collapse border-2 border-black">
            <th className="border-collapse border-2 border-black bg-dblue text-white">Sr. no</th>
            <th className="border-collapse border-2 border-black bg-dblue text-white">Title</th>
            <th className="border-collapse border-2 border-black bg-dblue text-white">Description</th>
            <th className="border-collapse border-2 border-black bg-dblue text-white">Qualification</th>
            <th className="border-collapse border-2 border-black bg-dblue text-white">Job</th>
            <th className="border-collapse border-2 border-black bg-dblue text-white">Salary</th>
            <th className="border-collapse border-2 border-black bg-dblue text-white">Image</th>
            <th className="border-collapse border-2 border-black bg-dblue text-white">Delete button</th>
            {/* <th>Edit button</th> */}
          </tr>
        </thead>
        <tbody>
          {career.map((career, index) => (
            <tr
              key={career._id}
              className="border-collapse border-2 border-black w-full text-center"
            >
              <td className="w-10 h-4 border-collapse border-2 border-black">
                {index + 1}
              </td>
              <td className="w-[5%] h-4 border-collapse border-2 border-black">
                {career.careerTitle}
              </td>
              <td className="w-[18%] h-4 border-collapse border-2 border-black">
                {career.careerQualification}
              </td>
              <td className="w-[18%] h-4 border-collapse border-2 border-black">
                {career.careerDescription}
              </td>
              <td className="w-[18%] h-4 border-collapse border-2 border-black">
                {career.careerJob}
              </td>
              <td className="w-[18%] h-4 border-collapse border-2 border-black">
                {career.careerSalary}
              </td>
              <td className="w-fit h-4 border-collapse border-2 border-black ">
                <img className="w-20 h-auto" src={career.careerImage} />
              </td>
              {/* <td>
                <button
                  onClick={() => handleEdit(career)}
                  className="px-3  border-collapse border-2 border-black py-2 bg-dblue rounded-full text-white"
                >
                  Edit
                </button>
              </td> */}
              <td>
                <button
                  onClick={() => handleDeleteCriminal(career._id)}
                  className="px-3 py-2 w-fit border-collapse border-2 border-black rounded-full bg-dblue text-white"
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
