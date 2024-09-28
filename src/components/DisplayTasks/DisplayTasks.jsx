import React, {useState} from 'react'

const DisplayTasks = ({task, onToggle}) => {
  const toggleComplete = () => {
     onToggle(task.id)
  }
  return (
    console.log(task),
    <li>{task.title} 
    <br />
    Priority: {task.priority}
    
    <div className={task.completed == true? "complete": "not-complete"}>
      <button onClick={toggleComplete}>{task.completed== false? 'Not complete': 'Completed'}</button>
    </div>
    </li>
  )
}

export default DisplayTasks
