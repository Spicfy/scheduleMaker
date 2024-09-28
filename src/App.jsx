import { useState } from 'react';
import Task from './components/task/task';  // Make sure the import path is correct
import DisplayTasks from './components/DisplayTasks/DisplayTasks';
import ScheduleGrid from './components/ScheduleGrid/ScheduleGrid'; 
import LoginSignUp from './components/LoginSignUp/LoginSignUp';

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
    <>

      <h1>Welcome to your schedule maker (name subject to change)</h1>
      <LoginSignUp />
      <div>
      <div className='schedule_table'>
        <ScheduleGrid schedule={hardcodedSchedule} />
      </div>

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
    </>
  );
}

export default App;
