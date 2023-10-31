import React, { useEffect, useState } from 'react'
import {RiDeleteBin5Fill} from "react-icons/ri";
import { BsFillCheckCircleFill, BsFillCircleFill } from "react-icons/bs";
import './Todo.css'
import { BiSolidEdit } from "react-icons/bi";
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import TodoInput from './TodoInput'

export default function Todo() {
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggleBtn, setToggleBtn] = useState('')
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');

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
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
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
const toggleTodo = async (val) => {
  try {
    const newStatus = val.isActive ? false : true;
    await axios.put(`https://todo-list-backend-f713.vercel.app/api/task/${val._id}`, {
      isActive: newStatus,
    });
    getResponce();
  } catch (error) {
    console.error('Error toggling todo:', error);
  }
};

const editTodo = async (val) => {
  try {
    await axios.put(`https://todo-list-backend-f713.vercel.app/api/task/${val._id}`, {
      title: editedTitle,
    });
    setEditTodoId(null);
    setEditedTitle('') // Clear the input field
    getResponce();
  } catch (error) {
    console.error('Error editing todo:', error);
  }
}

//  const togelTodo=(val)=>{
//   try {
//     const newStatus = val.isActive ? false : true;
//     console.log(val.isActive,newStatus )
//     axios.put(`https://todo-list-bakend-f713.vercel.app/api/task/${val._id}`, {
//       isActive: newStatus,
//     });

//     // Set the toggleBtn state to the current value of isActive
//   } catch (error) {
//     console.log(error);
//   }
//  }

useEffect(() => {
  getResponce()
}, []);

// useEffect(()=>{
//   getResponce()
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
              <div className='check' onClick={() => toggleTodo(e)}>
                {e.isActive ? (
                  <BsFillCircleFill className='icon' />
                    ) : (
                  <BsFillCheckCircleFill className='icon' />
                )}
              </div>
            {/* ////////edit///// */}
              {editTodoId === e._id ? (
                <input type="text"  value={editedTitle} onChange={(e) => {console.log (e.target.value)
                setEditedTitle(e.target.value)}} 
                />
                  ) : (
                <p style={e.isActive ?{}:{textDecoration:"line-through"}}>{e.title}</p>
               )}
            <span >
              {editTodoId === e._id ? (
              <button onClick={() => editTodo(e)}>Save</button>
              ) : (
              <BiSolidEdit className='edit' onClick={() => setEditTodoId(e._id)} />
              )}
              <RiDeleteBin5Fill className='del' onClick={() => deleteTodo(e._id)} />
            </span>
            </div>
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
