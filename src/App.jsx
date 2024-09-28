import { useState } from 'react';
import Task from './components/task/task';  // Make sure the import path is correct
import DisplayTasks from './components/DisplayTasks/DisplayTasks';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', priority: 'High', completed: false },
    { id: 2, title: 'Task 2', priority: 'Medium', completed: false },
  ]);

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
      <div>
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
