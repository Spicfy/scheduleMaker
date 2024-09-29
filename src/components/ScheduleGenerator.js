// ScheduleGenerator.js
import React, { useState } from 'react';

const ScheduleGenerator = () => {
  const [schedule, setSchedule] = useState('');
  const [userPreferences, setUserPreferences] = useState({
    hobby: '',
    workingStyle: '',
    breakPreference: '',
    dayStart: '',
    dayEnd: '',
  });
  const [tasks, setTasks] = useState([{ taskname: '', taskdescription: '', priority: '', difficulty: '' }]);

  const handleUserPrefChange = (e) => {
    const { name, value } = e.target;
    setUserPreferences((prev) => ({ ...prev, [name]: value }));
  };

  const handleTaskChange = (e, index) => {
    const { name, value } = e.target;
    const newTasks = [...tasks];
    newTasks[index][name] = value;
    setTasks(newTasks);
  };

  const handleAddTask = () => {
    setTasks([...tasks, { taskname: '', taskdescription: '', priority: '', difficulty: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInput = { ...userPreferences, tasks };

    try {
      const response = await fetch('http://127.0.0.1:5000/generate-schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
        return;
      }

      const data = await response.json();
      if (data.schedule) {
        setSchedule(data.schedule);
      } else {
        alert('Error generating schedule');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error generating schedule');
    }
  };

  return (
    <div>
      <h1>Daily Task Scheduler</h1>
      <form onSubmit={handleSubmit}>
        <h3>User Preferences</h3>
        <input name="hobby" placeholder="Hobby" onChange={handleUserPrefChange} />
        <input name="workingStyle" placeholder="Working Style" onChange={handleUserPrefChange} />
        <input name="breakPreference" placeholder="Break Preference" onChange={handleUserPrefChange} />
        <input name="dayStart" placeholder="Day Start" onChange={handleUserPrefChange} />
        <input name="dayEnd" placeholder="Day End" onChange={handle} />
        </form>
        </div>
  );
}
