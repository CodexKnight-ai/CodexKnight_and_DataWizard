//features...
//1.Add Lessons
//2.Update Lessons
//3.Delete Lessons

//Imputs
// id: Number,
// name: String,
// description: String,
// duration: String,
// status: Boolean,
// image: String,
// url  :String,

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelfDefenseAdmin = () => {
    const [lessons, setLessons] = useState([]);
    const [newLesson, setNewLesson] = useState({ name: '', description: '', duration: '', status: false, image: '', url: '' });

    useEffect(() => {
        axios.get('http://localhost:8001/api/v1/selfDefense/lessons')
            .then(response => setLessons(response.data))
            .catch(err => console.log(err));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLesson({ ...newLesson, [name]: value });
    };

    const handleCreateLesson = () => {
        axios.post('http://localhost:8001/api/v1/selfDefense/lessons', newLesson)
            .then(response => setLessons([...lessons, response.data]))
            .catch(err => console.log(err));
    };

    const handleUpdateLesson = (id, updatedLesson) => {
        axios.put(`http://localhost:8001/api/v1/selfDefense/lessons/${id}`, updatedLesson)
            .then(response => {
                setLessons(lessons.map(lesson => lesson._id === id ? response.data : lesson));
            })
            .catch(err => console.log(err));
    };

    const handleDeleteLesson = (id) => {
        axios.delete(`http://localhost:8001/api/v1/selfDefense/lessons/${id}`)
            .then(() => {
                setLessons(lessons.filter(lesson => lesson._id !== id));
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <h1>Admin Portal</h1>
            <div>
                <input type="text" name="name" placeholder="Name" onChange={handleInputChange} />
                <input type="text" name="description" placeholder="Description" onChange={handleInputChange} />
                <input type="text" name="duration" placeholder="Duration" onChange={handleInputChange} />
                <input type="text" name="image" placeholder="Image URL" onChange={handleInputChange} />
                <input type="text" name="url" placeholder="Video URL" onChange={handleInputChange} />
                <button onClick={handleCreateLesson}>Create Lesson</button>
            </div>
            <div>
                {lessons.map(lesson => (
                    <div key={lesson._id}>
                        <input type="text" value={lesson.name} onChange={(e) => handleUpdateLesson(lesson._id, { ...lesson, name: e.target.value })} />
                        <input type="text" value={lesson.description} onChange={(e) => handleUpdateLesson(lesson._id, { ...lesson, description: e.target.value })} />
                        <button onClick={() => handleDeleteLesson(lesson._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelfDefenseAdmin;
