import React from 'react'

const Point = ({totalTasks}) => {
    const total = totalTasks.length;

    const completed = totalTasks.filter(task => task.completed).length;

    
    return (
    <div>
        
    </div>
  )
}

export default Point
