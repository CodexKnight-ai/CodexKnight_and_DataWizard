import React, { useState, useEffect } from "react";
import axios from "axios";

const MostWantedForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [crime, setCrime] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [criminal, setCriminal] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/mostWanted/most-wanted-criminal")
      .then((response) => setCriminal(response.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("criminalName", name);
    formData.append("age", age);
    formData.append("crime", crime);
    formData.append("detail", description);
    formData.append("avatar", image);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/mostWanted/most-wanted-criminal",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Criminal details uploaded successfully");
      setName("");
      setAge("");
      setCrime("");
      setDescription("");
      setImage(null);
      setCriminal([...criminal, response.data]);
    } catch (err) {
      console.error(err);
      alert("Error uploading criminal details");
    }
  };

  const handleUpdateCriminal = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("criminalName", name);
    formData.append("age", age);
    formData.append("crime", crime);
    formData.append("detail", description);
    if (image) {
      formData.append("avatar", image);
    }

    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/mostWanted/most-wanted-criminal/${editId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setCriminal(
        criminal.map((item) => (item._id === editId ? response.data : item))
      );
      setEditId(null);
      setName("");
      setAge("");
      setCrime("");
      setDescription("");
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Error updating criminal details");
    }
  };

  const handleEdit = (criminal) => {
    setEditId(criminal._id);
    setName(criminal.criminalName);
    setAge(criminal.age);
    setCrime(criminal.crime);
    setDescription(criminal.detail);
    setImage(null);
  };

  const handleDeleteCriminal = (id) => {
    axios
      .delete(`http://localhost:4000/api/v1/mostWanted/most-wanted-criminal/${id}`)
      .then(() => {
        setCriminal(criminal.filter((criminal) => criminal._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={editId ? handleUpdateCriminal : handleSubmit} className="border-black border-2 p-4">
        <div className="mb-4">
          <label className="block">Name:</label>
          <input
            type="text"
            value={name}
            className="border-black border-2 w-full p-2"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Age:</label>
          <input
            type="number"
            value={age}
            className="border-black border-2 w-full p-2"
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Crime:</label>
          <input
            type="text"
            value={crime}
            className="border-black border-2 w-full p-2"
            onChange={(e) => setCrime(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Description:</label>
          <textarea
            value={description}
            className="border-black border-2 w-full p-2"
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block">Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">
          {editId ? "Update" : "Submit"}
        </button>
      </form>
      <div>
        {criminal.map((criminal, index) => (
          <div key={criminal._id} className="border-t mt-4 pt-4 flex justify-between items-center">
            <div className="h-14 w-fit flex justify-center items-center">{index + 1}</div>
            <div className="h-14 w-fit flex justify-center items-center">{criminal.criminalName}</div>
            <div className="h-14 w-fit flex justify-center items-center">{criminal.age}</div>
            <div className="h-14 w-fit flex justify-center items-center">{criminal.crime}</div>
            <div className="h-14 w-fit flex justify-center items-center">{criminal.detail}</div>
            <div className="h-14 w-16 flex justify-center items-center"><img src={criminal.avatar} alt="criminal" /></div>
            <button onClick={() => handleEdit(criminal)}>Edit</button>
            <button onClick={() => handleDeleteCriminal(criminal._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostWantedForm;
