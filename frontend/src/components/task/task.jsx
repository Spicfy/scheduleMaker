import React, { useState } from 'react';

const Task = ({ title, description, priority, onSubmit }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('');

  // Handle form submission

  const addTask = (event) => {
    event.preventDefault();
    const taskObject = {
      title: newTitle,
      priority: newPriority,
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSubmit function passed as a prop with the form data
    onSubmit({ formTitle, formDescription, formPriority });
    
    // Optionally reset the form after submission
    setFormTitle('');
    setFormDescription('');
    setFormPriority('');
  };
  const handleTitleChange = (event) =>{
    setNewTitle
  }

  return (
    <form onSubmit = {addTask}>
      <div>title: <input value={newName} onChange = {handleTitleChange} 
      placeholder = "Enter task title" required 
      /></div>
      <div>
        <label>priority: </label>
        <select value={newPriority} onChange={handlePriorityChange} required>
          <option value=""></option>
        </select>
      </div>
    </form>
  );

export default Task;
