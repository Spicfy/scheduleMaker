import React, {useState} from 'react'
import checkmark from '../../assets/checkmark.svg'
import './DisplayTasks.css'
const DisplayTasks = ({task, onToggle}) => {
  const toggleComplete = () => {
     onToggle(task.id)
  }
  return (
    console.log(task),
    <li>{task.title} 
    <br />
    <br />
    Priority: {task.priority}
    
    <div className={task.completed == true? "complete": "not-complete"}>
      <button onClick={toggleComplete}>
        {task.completed == false ? 'Not complete' : 'Completed'}
        {task.completed && <img src={checkmark} />}
      </button>
    </div>
    </li>
  )
}

export default DisplayTasks
