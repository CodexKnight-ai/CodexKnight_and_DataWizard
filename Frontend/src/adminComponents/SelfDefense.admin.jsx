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


import React, { useState } from 'react';
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

    const [LessonId, setId] = useState('')
    const [LessonName, setLessonName] = useState('')
    const [LessonDescription, setLessonDescription] = useState('')
    const [LessonDuration, setLessonDuration] = useState('')
    const [LessonStatus, setLessonStatus] = useState(false)
    const [LessonImage, setLessonImage] = useState('')
    const [LessonURL, setLessonURL] = useState('')

    

   

    const postLesson = (event) => {

        event.preventDefault();

        axios.post(`http://localhost:8001/api/v1/selfDefense/lessons`, {
            LessonId,
            LessonName,
            LessonDescription,
            LessonDuration,
            LessonStatus,
            LessonImage,
            LessonURL
        })
            .then(response => console.log('Lesson added:', response))
            .catch(err => console.log(err));

    }
    return (
        <>
            <Form className='flex flex-col gap-[40px] px-[10px] py-[10px] w-[50vw] h-screen justify-around items-between font-gtaHeadingText2'>
                <h1 className='font-gtaHeadingText1 text-dblue text-[3em] flex justify-center items-center'>Add Lesson</h1>
                <Form.Field className='flex justify-between w-full items-center gap-[20px]'>
                    <label className='text-dblue font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>Id</span><span>:</span></label>
                    <input onChange={(e) => setId(e.target.value)} className='border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.05] transition ease-in-out duration-300 focus:shadow-gray-500 focus:shadow-2xl' placeholder='Id' />
                </Form.Field>
                <Form.Field className='flex justify-between w-full items-center gap-[20px]'>
                    <label className='text-dblue font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>Name</span><span>:</span></label>
                    <input onChange={(e) => setLessonName(e.target.value)} className='border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.05] transition ease-in-out duration-300 focus:shadow-gray-500 focus:shadow-2xl' placeholder='Name' />
                </Form.Field>
                <Form.Field className='flex justify-between w-full items-center gap-[20px]'>
                    <label className='text-dblue font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>Description</span><span>:</span></label>
                    <input onChange={(e) => setLessonDescription(e.target.value)} className='border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.05] transition ease-in-out duration-300 focus:shadow-gray-500 focus:shadow-2xl' placeholder='Description' />
                </Form.Field>
                <Form.Field className='flex justify-between w-full items-center gap-[20px]'>
                    <label className='text-dblue font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>Duration</span><span>:</span></label>
                    <input onChange={(e) => setLessonDuration(e.target.value)} className='border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.05] transition ease-in-out duration-300 focus:shadow-gray-500 focus:shadow-2xl' placeholder='Duration' />
                </Form.Field>
                <Form.Field className='flex justify-between w-full items-center gap-[20px]'>
                    <label className='text-dblue font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>Status</span><span>:</span></label>
                    <input onChange={(e) => setLessonStatus(e.target.value)} className='border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.05] transition ease-in-out duration-300 focus:shadow-gray-500 focus:shadow-2xl' placeholder='Status' />
                </Form.Field>
                <Form.Field className='flex justify-between w-full items-center gap-[20px]'>
                    <label className='text-dblue font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>Image</span><span>:</span></label>
                    <input onChange={(e) => setLessonImage(e.target.value)} className='border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.05] transition ease-in-out duration-300 focus:shadow-gray-500 focus:shadow-2xl' placeholder='Image' />
                </Form.Field>
                <Form.Field className='flex justify-between w-full items-center gap-[20px]'>
                    <label className='text-dblue font-gtaHeadingText2 flex justify-between w-full items-center text-[1.5em]'><span>URL</span><span>:</span></label>
                    <input onChange={(e) => setLessonURL(e.target.value)} className='border-none outline-none w-full rounded-[15px] p-4 bg-white shadow-inset focus:bg-white focus:transform focus:scale-[1.05] transition ease-in-out duration-300 focus:shadow-gray-500 focus:shadow-2xl' placeholder='URL' />
                </Form.Field>

                <Button type='submit' onClick={postLesson} className='flex w-full bg-dblue text-white font-gtaHeadingText2 text-[1.5em] rounded-xl justify-center align-center px-6 py-3 border-[1px] border-white border-solid hover:bg-white  hover:text-dblue hover:border-white hover:shadow-inset hover:shadow-gray-400 transition-all duration-[0.3s] active:opacity-40'>Add New Lesson</Button>
            </Form>
        </>
    )
}

const ReadLessons = () => {

    return (
        <>
            <div>
                <Table singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Duration</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Image</Table.HeaderCell>
                            <Table.HeaderCell>URL</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        
                    </Table.Body>
                </Table>
            </div>
        </>
    )
}


export default SelfDefenseAdmin;
