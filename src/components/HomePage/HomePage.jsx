import React, {useState} from 'react'
import './HomePage.css'
import Task from '../Task/Task'
import DisplayTasks from '../DisplayTasks/DisplayTasks'
import ScheduleGrid from '../ScheduleGrid/ScheduleGrid'


const HomePage = () => {
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
  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  return (
    <div className="everything">
      <div className="main">
        <div className="left-content">
          <h1>Hi $USER_NAME,</h1>
          <div className="title">Schedule Maker</div>
          <div className="subtitle">your personalized schedule :</div>
          <div className="time-range">

        </div>
        <div className="right-content">
          <div className="user-info">
            <button className="logout-btn">LOG OUT</button>
            <div className="user-avatar"></div>
          </div>
          <div className="date">{todayDate}</div>
        </div>
      </div>
      <div className="task-view">
          <div className='schedule_table'>
            <button onClick={handleScheduleToggle}>
              {showSchedule ? 'Hide Schedule' : 'View Schedule'}
            </button>
            {/* Conditionally render ScheduleGrid based on showSchedule state */}
            {showSchedule && <ScheduleGrid schedule={hardcodedSchedule} display={showSchedule} />}
          </div>
          <div className="display-tasks">
            <Task
              tasks={tasks}  // This will always be the same for all new tasks
              onSubmit={handleTaskSubmit}
            />
            <h2>Tasks</h2>
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
    </div>
  )
}

export default HomePage