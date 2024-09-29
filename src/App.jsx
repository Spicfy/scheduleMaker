import { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // 移除多余的 BrowserRouter


import DisplayTasks from './components/DisplayTasks/DisplayTasks';
import ScheduleGrid from './components/ScheduleGrid/ScheduleGrid'; 
import LoginSignUp from './components/LoginSignUp/LoginSignUp';
import SignUpFormDetailed from './components/LoginSignUp/SignUpFormDetailed';
import HomePage from './components/HomePage/HomePage';

import './App.css';

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

  const [showSchedule, setShowSchedule] = useState(false); // State to toggle schedule

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

  const handleScheduleToggle = () => {
    setShowSchedule(!showSchedule); // Toggle the schedule display
  };

  return (

    <Router>
  
        <nav>
          <Link to="/home" className="btn">Home</Link>
          <Link to="/login" className="btn">Login</Link>
        </nav>
        <Routes>
          <Route path="/home" element={<HomePage />}  />
          <Route path="/login" element={<LoginSignUp />} />
        </Routes>
    
    </Router>
  );
}

export default App;
