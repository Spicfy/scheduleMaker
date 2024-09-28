import { useState } from 'react'
import Task from './components/task/task'

function App() {
  
  const [tasks, setTasks] = useState([])

  const handleTaskSubmit = (newTask) => {
    setTasks([...tasks, newTask]);
  }

  return (
    <>
     <h1>Welcome to your schedule maker (name subject to change)</h1>
    <div>
      <h2>Tasks</h2>
      <Task 
      title= ""
      priority=""
      onSubmit={handleTaskSubmit}
      />
      <ul>
        {/* Map over tasks and display them */}
      </ul>
    </div>
    </>
  )
}

export default App
