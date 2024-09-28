import React, { useState } from 'react';
import './task.css';
const Task = ({ tasks, onSubmit }) => {  // Destructure props
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('');
  const [newDescription, setNewDescription] = useState('');

  // Handle form submission
  const addTask = (event) => {
    event.preventDefault();
    const taskObject = {
      title: newTitle,
      description: newDescription,
      priority: newPriority,
      id: tasks.length + 1,  // Unique id logic here can be improved
      completed: false
    };
    // Call the onSubmit function passed as a prop with the form data
    onSubmit(taskObject);
    
    // Reset the form after submission
    setNewTitle('');
    setNewPriority('');
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value);
  }

  const handlePriorityChange = (event) => {
    setNewPriority(event.target.value);
  };

  return (
    <form onSubmit={addTask}>
      <div>
        Title: 
        <input 
          value={newTitle} 
          onChange={handleTitleChange} 
          placeholder="Enter task title" 
          required 
        />
      </div>
      <div>
        Description 
        <textarea col = "50" row = "50" value={newTitle} onChange={handleDescriptionChange} placeholder="Enter task description" required
        
        />
      </div>
      <div>
        <label>Priority: </label>
        <select value={newPriority} onChange={handlePriorityChange} required>
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default Task;
