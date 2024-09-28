import React from 'react'
import './HomePage.css'


const HomePage = () => {
  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  return (
    <div>
      <div className="main">
        <div className="left-content">
          <h1>Hi $USER_NAME,</h1>
          <div className="title">Schedule Maker</div>
          <div className="subtitle">your personalized schedule :</div>
          <div className="time-range">
          </div>
        </div>
        <div className="right-content">
          <div className="user-info">
            <button className="logout-btn">LOG OUT</button>
            <div className="user-avatar"></div>
          </div>
          <div className="date">{todayDate}</div>
        </div>
      </div>

    </div>
  )
}

export default HomePage