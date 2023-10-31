import React, { useState } from 'react'
import "./TodoInput.css"
import { Form, Button } from 'react-bootstrap';

export default function TodoInput({data}) {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
   
  const handleAddTask = () => {
    if (task.trim() !== '') {
       data(task);
      setTask('');
    }
  };
   
  return (
    <div>
  <Form className="display">
    <Form.Group controlId="taskInput" className="mb-3">
      <Form.Control
        className="input"
        type="text"
        placeholder="Enter a task"
        onChange={(e) => {
          console.log(e.target.value);
          setTask(e.target.value);
        }}
      />
    </Form.Group>
    <Button
      variant="primary"
      type="button"
      className="custom-button"
      onClick={handleAddTask}
    >
      Submit
    </Button>
  </Form>
</div>

  )
}
