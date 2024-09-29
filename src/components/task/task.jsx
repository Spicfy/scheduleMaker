import React, { useState } from 'react';

//import firebase features for adding tasks
import firebase from '../__FirebaseImplement/firebase';  //get registered DB for project
import { doc, setDoc, getDoc, addDoc, collection, updateDoc, arrayUnion } from 'firebase/firestore';  // Additional Info + Tasks

import './task.css';

const Task = ({ tasks, onSubmit }) => {  // Destructure props
  const [newTitle, setTaskTitle] = useState('');
  const [newPriority, setTaskPriority] = useState('');
  const [newDescription, setTaskDescription] = useState('');

  // Handle form submission
  const addTask = async (event) => {
    event.preventDefault();
    
    // Construct the task object
    const newTask = {
      title: newTitle,
      description: newDescription,
      priority: newPriority,
      completed: false
    };

    try {
  
    // Call the onSubmit function passed as a prop with the form data
    onSubmit(taskObject);
    
    // Reset form fields
    setNewTitle('');
    setNewPriority('');
    setNewDescription('');

    const response = fetch('http://localhost:5000/home', { // Adjust the URL as needed
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task: taskObject }), // Wrap taskObject in another object with the key 'task'
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = response.json();
    console.log('Response from server:', data);
    
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

  return (
    <form onSubmit={addTask} className="task-form">
      <div className="form-group">
        <label htmlFor="title">Title: </label>
        <input
          id="title"
          type="text"
          value={newTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description: </label>
        <textarea
          id="description"
          value={newDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Enter task description"
          rows="5"
          cols="30"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority: </label>
        <select
          id="priority"
          value={oritynewPri}
          onChange={(e) => setTaskPriority(e.target.value)}
          required
        >
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
     

      <button type="submit" className="submit-btn">Add Task</button>
      </div>
    </form>
  );
};

export default Task;
