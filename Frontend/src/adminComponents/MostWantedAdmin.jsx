// src/components/MostWantedForm.jsx
import React, { useState } from "react";
import axios from "axios";

const MostWantedForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [crime, setCrime] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("crime", crime);
    formData.append("description", description);
    formData.append("image", image);

    try {
      await axios.post("/upload-most-wanted", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Criminal details uploaded successfully");
    } catch (err) {
      console.error(err);
      alert("Error uploading criminal details");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-black border-2">
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          className="border-black border-2"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label >Age:</label>
        <input

          type="number"
          value={age}
          className="border-black border-2"
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Crime:</label>
        <input
          type="text"
          value={crime}
          className="border-black border-2"
          onChange={(e) => setCrime(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          className="border-black border-2"
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label>Image:</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MostWantedForm;
