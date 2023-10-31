import React, { useEffect, useState } from 'react'
import {RiDeleteBin5Fill} from "react-icons/ri";
import { BsFillCheckCircleFill, BsFillCircleFill } from "react-icons/bs";
import './Todo.css'
import { BiSolidEdit } from "react-icons/bi";
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import TodoInput from './TodoInput'
import Modal from 'react-bootstrap/Modal';
 

export default function Todo() {
  const [todo, setTodo] = useState([]);
  const [editedTitle, setEditedTitle] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [text, setText] = useState('') 

const Postdata = async (text) => {
  try {
    const response = await axios.post('https://todo-list-bakend-f713.vercel.app/api/task', {
      // description: text,
      title:text,
      isActive:true
    });
    const newTodo = response.data.data;
    setTodo([...todo, newTodo]);
  } catch (error) {
    console.error('Error adding todo:', error);
  }
};

const getResponce=()=>{
  axios.get("https://todo-list-bakend-f713.vercel.app/api/task")
    .then(({ data }) => {
      setTodo(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`https://todo-list-bakend-f713.vercel.app/api/task/${id}`);
    getResponce()
 } catch (error) {
    console.error(error);
 }
};
 

const editTodo = async (val) => {
  try {
    await axios.put(`https://todo-list-backend-f713.vercel.app/api/task/${val._id}`, {
      title:text,
    });
    setEditedTitle('') // Clear the input field
    getResponce();
  } catch (error) {
    console.error('Error editing todo:', error);
  }
}

const onChangeEdite=(e)=>{
  e.preventDefault()
setText(e.target.value)
}

const togelTodo=async(val)=>{
  console.log("val", val)
  try {
    const newStatus = val.isActive ? false : true;
    console.log(val.isActive,newStatus )
    await axios.put(`https://todo-list-bakend-f713.vercel.app/api/task/${val._id}`, {
      isActive: newStatus,
    });
    getResponce()
    // Set the toggleBtn state to the current value of isActive
  } catch (error) {
    console.log(error);
  }
 }


useEffect(() => {
  getResponce()
}, []);

// useEffect(()=>{

//   //  togelTodo(toggleBtn)
//    getResponce()
// },[toggleBtn])

  return (
    <div className='container'>
      <h2>Todo List</h2>
      <TodoInput data={Postdata} />
      <div className="row"> 
      {  
        todo && todo.length > 0 ? (
          todo.map((e) => 
        {
          return  (
            <div className="col-md-6">
              <div className='todo' key={e._id}>
              {/* /////togglee//// */}
                <div className='check' onClick={() => togelTodo(e)}>
                  {e.isActive ? (
                    <BsFillCircleFill className='icon' />
                      ) : (
                    <BsFillCheckCircleFill className='icon' />
                  )}
                </div>
              {/* ////////edit///// */}
                    
                <p style={e.isActive ? {textDecoration:"none"} :{textDecoration:"line-through"}}>{e.title}</p>
              <span >
                <BiSolidEdit className='edit' onClick={handleShow} />
                <RiDeleteBin5Fill className='del' onClick={() => deleteTodo(e._id)} />
              </span>
              </div>
              <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={editTodo}>
            <input value={e?.title} type='text' onChange={onChangeEdite}/>
            <input type='button' value="Submit" />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
            </div>
          )
        }
        )
        ) : (
          <p>No todo items available.</p>
        )
      }
      </div>
   
    </div>
  )
}
