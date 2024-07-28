import React, { useEffect,useState } from 'react';
import axios from 'axios';
import {Table,Button} from 'semantic-ui-react'

const UserTipsAdmin = () => {


    return (
        <>
            <div className='flex justify-between py-6 px-3 items-center'>
                <span className='text-dblue font-gtaHeadingText1 text-[4em]'>User Tip Admin Portal !</span>
            </div>
            <GetUserTips/>
        </>
    )
}

const GetUserTips = () => {

    const [tipData, settipData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/api/v1/userTips/tips')
            .then((response) => {
                settipData(response.data)
            })
            .catch((error)=>{
                console.log("Getting error in fetching tips",error)
            })
            
    }, [])

    const deleteTip = (id) => {
        //delelting lesson by its id => data._id
        axios.delete(`http://localhost:4000/api/v1/selfDefense/lessons/${id}`)
    }

    return (
        <>
            <div className='w-screen h-screen py-6 px-3'>
                <Table singleLine className='w-full h-full  flex flex-col'>
                    <Table.Header className='bg-dblue text-whitish'>
                        <Table.Row className='w-full h-[5em] flex '>
                            <Table.HeaderCell className='w-[15%] h-full border-x-[1px] border-x-solid border-x-dblue'><span className='w-full h-full flex justify-center items-center '>Catagory</span></Table.HeaderCell>
                            <Table.HeaderCell className='w-[30%] overflow-y-scroll h-full border-x-[1px] border-x-solid border-x-dblue'><span className='w-full h-full flex justify-center items-center '>Description</span></Table.HeaderCell>
                            <Table.HeaderCell className='w-[10%] h-full border-x-[1px] border-x-solid border-x-dblue'><span className='w-full h-full flex justify-center items-center '>Date</span></Table.HeaderCell>
                            <Table.HeaderCell className='w-[35%] h-full border-x-[1px] border-x-solid border-x-dblue overflow-y-scroll'><span className='w-full h-full flex justify-center items-center'>Files</span></Table.HeaderCell>
                            <Table.HeaderCell className='w-[10%] h-full border-x-[1px] border-x-solid border-x-dblue'><span className='w-full h-full flex justify-center items-center '>Delete</span></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body className='w-screen h-[80%]'>
                        {tipData.map((data) => {
                            return (
                                <Table.Row key={data._id} className='w-full h-[6em] flex'>
                                    <Table.Cell className='w-[15%] h-full border-[1px]  border-solid border-dblue'><span className='w-full h-full flex justify-center items-center '>{data.tipCategory}</span></Table.Cell>
                                    <Table.Cell className='w-[30%] overflow-y-scroll h-full border-[1px]  border-solid border-dblue'><span className='w-full h-full flex justify-center items-center' >{data.tipDescription}</span></Table.Cell>
                                    <Table.Cell className='w-[10%] h-full border-[1px]  border-solid border-dblue'><span className='w-full h-full flex justify-center items-center'>{data.tipDate}</span></Table.Cell>
                                    <Table.Cell className='w-[35%] h-full border-[1px]  border-solid border-dblue overflow-scroll'><span className='w-full h-full flex justify-center items-center '>{data.tipfiles}</span></Table.Cell>
                                    <Table.Cell className='w-[10%] h-full border-[1px] border-solid border-dblue'><span className='w-full h-full flex justify-center items-center '><button onClick={() => deleteTip(data._id)} className='px-6 py-3 bg-dblue text-white border-[1px] border-solid rounded-lg active:scale-95 hover:opacity-60 transition-all duration-[0.1s] '>Delete</button></span></Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            </div>
        </>
    )

    
}


export default UserTipsAdmin;