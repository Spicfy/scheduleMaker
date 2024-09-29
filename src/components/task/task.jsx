import React, { useState,useEffect } from 'react';

//import firebase features for adding tasks
import { databaseAuth, database } from '../__FirebaseImplement/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc, addDoc, collection, updateDoc, arrayUnion } from 'firebase/firestore';  // Additional Info + Tasks

import './task.css';

const Task = ({ tasks, onSubmit }) => {  // Destructure props
  const [newTitle, setTaskTitle] = useState('');
  const [newPriority, setTaskPriority] = useState('');
  const [newDescription, setTaskDescription] = useState('');

  const [userUid, setUserUid] = useState(null);
  const [userDoc, setUserDoc] = useState(null);

  useEffect(() => {
    // Check if logged in
    const unsubscribe = onAuthStateChanged(databaseAuth, async (user) => {
      if (user) {

        //if logged-in : can get userUid
        setUserUid(user.uid);
        const docRef = doc(database, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        //docSnap = di


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

  // Handle form submission
  const addTask = async (event) => {
    event.preventDefault();
    
    // Construct the task object
    const taskObject = {
      title: newTitle,
      description: newDescription,
      priority: newPriority,
      completed: false
    
    };

    try {
      /*
      //get userTask while putting it into
      const userTasksRef = collection(database, 'users', userUid, 'tasks'); 
      const docRef = await addDoc(userTasksRef, taskObject); // Add task to Firestore
    // Call the onSubmit function passed as a prop with the form data
    onSubmit(taskObject);
    await updateDoc(userDocRef, {
      tasks: arrayUnion(taskObject) //
    });*/

    const userTasksRef = collection(database, 'users', userUid, 'tasks'); 
    const userDocRef = await addDoc(userTasksRef, taskObject); // Add task to Firestore
    // Call the onSubmit function passed as a prop with the form data
    onSubmit(taskObject);
    await updateDoc(userDocRef, {
      tasks: arrayUnion(taskObject) //
    });

    console.log('Task added:', taskObject);
    console.log('Task stored with ID:', userDocRef.id);
    // OBJ with all the Data stored
    console.log('Stored task data:', taskObject);
    taskObject

    // Reset form fields
    setTaskTitle('');
    setTaskPriority('');
    setTaskDescription('');

    // C-GPT Part
   /* const response = await fetch('http://localhost:5000/home', { // Adjust the URL as needed
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task: taskObject }), // Wrap taskObject in another object with the key 'task'
    });*/

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = response.json();
    console.log('Response from server:', data);
    
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

  return (
    <form onSubmit={addTask} className="task-form">
      <div className="form-group">
        <label htmlFor="title">Title: </label>
        <input
          id="title"
          type="text"
          value={newTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Enter task title"

          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description: </label>
        <textarea
          id="description"
          value={newDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Enter task description"
          rows="5"
          cols="30"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority: </label>
        <select
          id="priority"
          value={newPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
          required
        >
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
     

      <button type="submit" className="submit-btn">Add Task</button>
      </div>
    </form>
  );
};

export default Task;
