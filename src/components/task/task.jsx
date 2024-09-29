import React, { useState } from 'react';
import './task.css';

const Task = ({ tasks, onSubmit }) => {  // Destructure props
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('');
  const [newDescription, setNewDescription] = useState('');

  // Handle form submission
  const addTask = (event) => {
    event.preventDefault();
    
    // Construct the task object
    const taskObject = {
      title: newTitle,
      description: newDescription,
      priority: newPriority,
      id: tasks.length + 1,  // You could use a more robust method for ID generation
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
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description: </label>
        <textarea
          id="description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
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
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
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
