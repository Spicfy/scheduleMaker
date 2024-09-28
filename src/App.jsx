import { useState } from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Task from './components/Task/task';
import DisplayTasks from './components/DisplayTasks/DisplayTasks';
import ScheduleGrid from './components/ScheduleGrid/ScheduleGrid'; 
import LoginSignUp from './components/LoginSignUp/LoginSignUp';

//Navigate between webpages
import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import SignUpFormDetailed from './components/LoginSignUp/SignUpFormDetailed';
=======
import Task from './components/task/task';  // Ensure the import path is correct
import DisplayTasks from './components/DisplayTasks/DisplayTasks';
import ScheduleGrid from './components/ScheduleGrid/ScheduleGrid'; 
import LoginSignUp from './components/LoginSignUp/LoginSignUp';
import HomePage from './components/HomePage/HomePage';
import { NavLink } from "react-router-dom";
import './App.css';
>>>>>>> 798d9f0420e479162db205a86b9368b3227e9e38

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', priority: 'High', completed: false },
    { id: 2, title: 'Task 2', priority: 'Medium', completed: false },
  ]);

  // Example of hard-coded schedule for testing
  const hardcodedSchedule = {
    "9:00 AM": { taskName: "Math Homework", duration: 2 },
    "11:00 AM": { taskName: "Science Project", duration: 1 },
    "12:00 PM": { taskName: "Lunch Break", duration: 1 },
    "1:00 PM": { taskName: "English Essay", duration: 2 },
    "3:00 PM": { taskName: "Free Time", duration: 1 },
  };

<<<<<<< HEAD
=======
  const [showSchedule, setShowSchedule] = useState(false); // State to toggle schedule

>>>>>>> 798d9f0420e479162db205a86b9368b3227e9e38
  const handleTaskSubmit = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
  
      <div className="structure">
        <LoginSignUp  />
        <HomePage />
        <div className="task-view">
          <div className='schedule_table'>
            <button onClick={handleScheduleToggle}>
              {showSchedule ? 'Hide Schedule' : 'View Schedule'}
            </button>
            {/* Conditionally render ScheduleGrid based on showSchedule state */}
            {showSchedule && <ScheduleGrid schedule={hardcodedSchedule} />}
          </div>
          
            <div className="display-task">
              <h2>Tasks</h2>
              <Task
                tasks={tasks}  // This will always be the same for all new tasks
                onSubmit={handleTaskSubmit}
              />
              <ul>
                {tasks.map((task) => (
                  <DisplayTasks
                    key={task.id}
                    task={task}
                    onToggle={toggleTaskCompletion}
                  />
                ))}
              </ul>
            </div>
        </div>
      </div>
  );
}

export default App;
