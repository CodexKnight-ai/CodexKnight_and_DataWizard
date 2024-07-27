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
// url  :String,


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Table } from 'semantic-ui-react'


const SelfDefenseAdmin = () => {


    return (
        <>
            <CreateLesson />
            <ReadLessons />
        </>
    )
}

const CreateLesson = () => {
    const [LessonId, setId] = useState('');
    const [LessonName, setLessonName] = useState('');
    const [LessonDescription, setLessonDescription] = useState('');
    const [LessonDuration, setLessonDuration] = useState('');
    const [LessonURL, setLessonURL] = useState('');

    const postLesson = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8001/api/v1/selfDefense/lessons', {
                LessonId,
                LessonName,
                LessonDescription,
                LessonDuration,
                LessonURL
            });
            console.log('Lesson added:', response.data);
        } catch (error) {
            console.error('Error adding lesson:', error.response?.data || error.message);
        }
    };

    return (
        <Form className='flex flex-col gap-[40px] px-[10px] py-[10px] w-[50vw] h-screen justify-around items-between font-gtaHeadingText2' onSubmit={postLesson}>
            <h1 className='font-gtaHeadingText1 text-dblue text-[3em] flex justify-center items-center'>Add Lesson</h1>
            <Form.Field className='flex justify-between w-full items-center gap-[20px]'>
                <label className='text-dblue font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>Id</span><span>:</span></label>
                <input onChange={(e) => setId(e.target.value)} className='border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset' placeholder='Id' value={LessonId} required />
            </Form.Field>
            <Form.Field className='flex justify-between w-full items-center gap-[20px]'>
                <label className='text-dblue font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>Name</span><span>:</span></label>
                <input onChange={(e) => setLessonName(e.target.value)} className='border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset' placeholder='Name' value={LessonName} required />
            </Form.Field>
            <Form.Field className='flex justify-between w-full items-center gap-[20px]'>
                <label className='text-dblue font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>Description</span><span>:</span></label>
                <input onChange={(e) => setLessonDescription(e.target.value)} className='border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset' placeholder='Description' value={LessonDescription} required />
            </Form.Field>
            <Form.Field className='flex justify-between w-full items-center gap-[20px]'>
                <label className='text-dblue font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>Duration</span><span>:</span></label>
                <input onChange={(e) => setLessonDuration(e.target.value)} className='border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset' placeholder='Duration' value={LessonDuration} required />
            </Form.Field>
            <Form.Field className='flex justify-between w-full items-center gap-[20px]'>
                <label className='text-dblue font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>URL</span><span>:</span></label>
                <input onChange={(e) => setLessonURL(e.target.value)} className='border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset' placeholder='URL' value={LessonURL} required />
            </Form.Field>
            <Button type='submit' className='flex w-full bg-dblue text-white font-gtaHeadingText2 text-[1.5em] rounded-xl justify-center align-center px-6 py-3 border-[1px] border-white border-solid hover:opacity-70 transition-all duration-[0.1s] active:scale-[0.98]'>Add New Lesson</Button>
        </Form>
    );
};


const ReadLessons = () => {
    
    const [LessonData,setLessonData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8001/api/v1/selfDefense/lessons')
        .then((response)=>{
                setLessonData(response.data)
        })
    },[])
    return (
        <>
            <div className='w-screen h-screen'>
                <Table singleLine className='w-full h-full  flex flex-col'>
                    <Table.Header className='bg-dblue text-whitish'>
                        <Table.Row className='w-full h-[5em] flex '>
                            <Table.HeaderCell  className='w-[5%] h-full border-x-[1px] border-x-solid border-x-whitish'><span className='w-full h-full flex justify-center items-center '>Id</span></Table.HeaderCell>
                            <Table.HeaderCell  className='w-[10%] h-full border-x-[1px] border-x-solid border-x-whitish'><span className='w-full h-full flex justify-center items-center '>Name</span></Table.HeaderCell>
                            <Table.HeaderCell  className='w-[20%] overflow-y-scroll h-full border-x-[1px] border-x-solid border-x-whitish'><span className='w-full h-full flex justify-center items-center '>Description</span></Table.HeaderCell>
                            <Table.HeaderCell  className='w-[5%] h-full border-x-[1px] border-x-solid border-x-whitish'><span className='w-full h-full flex justify-center items-center '>Duration</span></Table.HeaderCell>
                            <Table.HeaderCell  className='w-[35%] h-full border-x-[1px] border-x-solid border-x-whitish overflow-scroll'><span className='w-full h-full flex justify-center items-center'>URL</span></Table.HeaderCell>
                            <Table.HeaderCell  className='w-[13%] h-full border-x-[1px] border-x-solid border-x-whitish'><span className='w-full h-full flex justify-center items-center '>Update</span></Table.HeaderCell>
                            <Table.HeaderCell  className='w-[13%] h-full border-x-[1px] border-x-solid border-x-whitish'><span className='w-full h-full flex justify-center items-center '>Delete</span></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body className='w-screen h-[80%]'>
                        {LessonData.map((data)=>{
                            return(
                                <Table.Row key={data.LessonId} className='w-full h-[6em] flex'>
                                    <Table.Cell className='w-[5%] h-full border-[1px] border-solid border-dblue'><span className='w-full h-full flex justify-center items-center '>{data.LessonId}</span></Table.Cell>
                                    <Table.Cell className='w-[10%] h-full border-[1px]  border-solid border-dblue'><span className='w-full h-full flex justify-center items-center '>{data.LessonName}</span></Table.Cell>
                                    <Table.Cell className='w-[20%] overflow-y-scroll h-full border-[1px]  border-solid border-dblue'><span className='w-full h-full flex justify-center items-center' >{data.LessonDescription}</span></Table.Cell>
                                    <Table.Cell className='w-[5%] h-full border-[1px]  border-solid border-dblue'><span className='w-full h-full flex justify-center items-center'>{data.LessonDuration}</span></Table.Cell>
                                    <Table.Cell className='w-[35%] h-full border-[1px]  border-solid border-dblue overflow-scroll'><span className='w-full h-full flex justify-center items-center '>{data.LessonURL}</span></Table.Cell>
                                    <Table.Cell  className='w-[13%] h-full border-[1px] border-solid border-dblue'><span className='w-full h-full flex justify-center items-center '><button className='px-8 py-3 bg-dblue text-white border-[1px] border-solid rounded-lg active:scale-95 hover:opacity-60 transition-all duration-[0.1s] '>Update</button></span></Table.Cell>
                                    <Table.Cell  className='w-[13%] h-full border-[1px] border-solid border-dblue'><span className='w-full h-full flex justify-center items-center '><button onClick={() => deleteLesson(data.id)} className='px-6 py-3 bg-dblue text-white border-[1px] border-solid rounded-lg active:scale-95 hover:opacity-60 transition-all duration-[0.1s] '>Delete</button></span></Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            </div>
        </>
    )
}

const deleteLesson = (id) => {
    axios.delete(`http://localhost:8001/api/v1/selfDefense/lessons/${id}`)
}

const getData = () => {
    axios.get(`http://localhost:8001/api/v1/selfDefense/lessons`)
        .then((getData) => {
             setAPIData(getData.data);
         })
}


export default SelfDefenseAdmin;
