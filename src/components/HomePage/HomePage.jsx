
import React, { useState,useEffect } from 'react';
import './HomePage.css';
import Task from '../task/task';
import DisplayTasks from '../DisplayTasks/DisplayTasks';
import ScheduleGrid from '../ScheduleGrid/ScheduleGrid';

// Receive user Param
import { useParams } from 'react-router-dom';
// Features concerning DB
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection} from 'firebase/firestore';  // greateFirestore data in 'users'
import { databaseAuth, database } from '../__FirebaseImplement/firebase';


const HomePage = () => {

  //get UserCredentials
  const [userUid, setUserUid] = useState(null);
  const [userDoc, setUserDoc] = useState(null);

  useEffect(() => {
    // Check if logged in
    const unsubscribe = onAuthStateChanged(databaseAuth, async (user) => {
      if (user) {

        //if logged-in : get userUid, and use Uid to fetch doc stoed in Firestore
        setUserUid(user.uid);
        const docRef = doc(database, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        console.log(user.uid);
        console.log(docSnap);


        if (docSnap.exists()) {
        setUserDoc(docSnap.data());
        } else {
            console.log('No such document!');
        }
      }// not logged in
        else {
        console.log('No user is signed in.');
        setUserUid(null);
        setUserDoc(null);
      }
    });

    return () => unsubscribe(); //unsubscribe
  }, []);

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', priority: 'High', completed: false },
    { id: 2, title: 'Task 2', priority: 'Medium', completed: false },
  ]);

  // Receive userID once jumped to HomePage
 /* const {userId} = useParams();
  console.log(userId);*/

  const hardcodedSchedule = {
    '9:00 AM': { taskName: 'Math Homework', duration: 2 },
    '11:00 AM': { taskName: 'Science Project', duration: 1 },
    '12:00 PM': { taskName: 'Lunch Break', duration: 1 },
    '1:00 PM': { taskName: 'English Essay', duration: 2 },
    '3:00 PM': { taskName: 'Free Time', duration: 1 },
  };

  const [showSchedule, setShowSchedule] = useState(false); // State to toggle schedule
  const [showTaskForm, setShowTaskForm] = useState(false); // State to toggle task form

  /*const handleTaskSubmit = (newTask) => {
    setTasks([...tasks, newTask]);
    setShowTaskForm(false); // Hide task form after adding task
  };*/
  const handleTaskSubmit = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]); // add
    setShowTaskForm(false); // hide
  };
  

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleScheduleToggle = () => {
    setShowSchedule(!showSchedule);
  };

  const handleShowTaskForm = () => {
    setShowTaskForm(true); // Show task form when the "Add Task" button is clicked
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
          <div className="time-range"></div>
          <div className="right-content">
            <div className="user-info">
              <button className="logout-btn">LOG OUT</button>
              <div className="user-avatar"></div>
            </div>
            <div className="date">{todayDate}</div>
          </div>
        </div>

        <div className="task-view">
          <button onClick={handleScheduleToggle} className="schedule-btn">
            {showSchedule ? 'Hide Schedule' : 'View Schedule'}
          </button>

          <div className="schedule_table">
            {showSchedule && <ScheduleGrid schedule={hardcodedSchedule} display={showSchedule} />}
          </div>

          <div className="display-tasks">
            {/* Add Task button */}
            {!showTaskForm && (
              <button onClick={handleShowTaskForm}>
                Add Task
              </button>
            )}

            {/* Conditionally render Task component when Add Task is clicked */}
            {showTaskForm && (
              //<Task tasks={tasks} onSubmit={handleTaskSubmit} />
              <Task tasks={tasks} onSubmit={handleTaskSubmit} userUid={userUid} />
            )}

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
  );
};

export default HomePage;
