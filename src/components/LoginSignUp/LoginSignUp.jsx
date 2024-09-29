// React
import React, { useEffect, useRef, useState } from 'react';
import './LoginSignUp.css'

// Import User and Tasks for DB
import User from '../__FirebaseImplement/user'

// Srouces
import email_icon from '../../assets/email.png'
import password_icon from '../../assets/password.png'

// Page Jumping with React Router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Importing DB features
import firebase from '../__FirebaseImplement/firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc, addDoc, collection, updateDoc, arrayUnion } from 'firebase/firestore';  // Additional Info + Tasks
// Importing Notyf Toast
import { Notyf } from 'notyf'; 
import 'notyf/notyf.min.css';

const LoginSignUp = () => {

    const [action, setAction] = useState('Log In');
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    const [user, setUser] = useState(null); // Store User Data

    /* DEBUG: has focus 
    const handleFocus = () => {
        console.log(emailRef.current.value);
        console.log(passwordRef.current.value);
    };*/

    const handleActionChange = (newAction) => {
        setAction(newAction);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const userEmail = emailRef.current.value;
        const userPassword = passwordRef.current.value;

        // test inputs
        console.log('Email:', userEmail);
        console.log('Password:', userPassword);



        // call signUp + pass references
            if (action === 'Sign Up') {
                    await signUp(userEmail, userPassword);
             } else {
                    await logIn(userEmail, userPassword);
                }
    };

  return (
     <div className="container">
        
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>

        <div className="inputs">
                {action == "Login"?<div></div>:<div></div>}
                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder="Email Address" ref={emailRef}/>
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder="Password" ref={passwordRef}/>
                </div>

        </div>
    
        {action == "Sign Up"?<div></div>:<div className="forgot-password">Forgot Password? <span>Click Here!</span></div>}
        <div className="submit-container">
            <div className={action==="Sign Up"?"submit gray":"submit"} onClick={(e) => { handleActionChange('Sign Up'); handleSubmit(e); }}>Sign Up</div>
            <div className={action==="Login" ? "submit gray":"submit"} onClick={(e) => { handleActionChange('Login'); handleSubmit(e); }}>Login</div>
        </div>
        
    </div>
  )
}


/*
    Log - in
     1. Fetch from Firebase
        1.1 Wrong Password
        1.2 Nonexisent email => ask if want to sign up?
     2. Greetings, change to Schedule page
 */
    const logIn = async (userEmail, userPassword) => {
        console.log('Log In Clicked');
        console.log('Logging in with:', userEmail, userPassword);

        // Create an instance of Notyf
        // Position relates to container position


        //Container position (decided where the Toast message appears)
            const container = document.querySelector('.container');
            const rect = container.getBoundingClientRect();
    
            const toastX = rect.left+(rect.width/2) ; 
            const toastY = rect.top+(rect.top/2);       
        const notyf = new Notyf({
            position: {
                x: toastX,
                y: toastY,
              }
        });

        try {
            await signInWithEmailAndPassword(firebase.databaseAuth, userEmail, userPassword);
            console.log("User Logged in Successfully");
            notyf.success('Signed-In successfully!');


            // Jump to Greeting and load Schedule


        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/user-not-found') {
                console.log('Not Registered');
                notyf.error("Account doesn't exist. Please register!");

            } else if (errorCode === 'auth/wrong-password') {
                console.log('Wrong Credentials');
                notyf.error("Wrong password :(");
            } else {
                console.log('Unkown Error',errorCode, errorMessage);
            }
        }
    };

/*
    Sign Up
    @param userEmail
    @param userPassword
    1. Exist? Yes-> please log in
    2. Check for constraints -> if pass, create acount
    3. Store email + password info to DB
    *4. Log in, jump to ask more info
*/
    const signUp = async (userEmail, userPassword) => {


        // Create an instance of Notyf
         //Container position (decided where the Toast message appears)
            const container = document.querySelector('.container');
            const rect = container.getBoundingClientRect();
        
            const toastX = rect.left+(rect.width/2) ; 
            const toastY = rect.top+(rect.top/2);       
            
            const notyf = new Notyf({
                position: {
                    x: toastX,
                    y: toastY,
                  }
            });

        //1. Check if user already exist. If so, refuse submission
        // ** if user exist but usernameInfo is inexistent, means user quit before filling out 
        // 2nd registration page.
        // in this case, delete current account and re-create
        try {
            const signInMethods = await fetchSignInMethodsForEmail(firebase.databaseAuth, userEmail);
            if (signInMethods.length > 0) {
                if(true)
                {
                    //modify here
                    notyf.error("Account already exists.");
                    return;
                }
                else
                {
                    notyf.error("Account already exists.");
                }
                
                return; // if user already exists, dont proceed
            }
        }catch(error)
        {}

        // 2. Creating New User
            console.log('Sign_Up Clicked');
            console.log('Email:', userEmail);
            console.log('Password:',userPassword);
        try {
                const currentUserCredential = await createUserWithEmailAndPassword(firebase.databaseAuth, userEmail, userPassword);
                console.log("credentials", currentUserCredential);
                console.log('User signed up successfully!');
                notyf.success('User registered');

                // TODO: Create CurrenUser
                // (demo) Implement empty user Account for Admin (I am fixing bugs but use this for now)
                const user = currentUserCredential.user;
                // Instance of User
                const newUser = new User(userEmail, userPassword);
                
                 // Add to firebase
                const userDocRef = await addDoc(collection(firebase.database, "users"), {
                    email: newUser.userEmail,
                    name: newUser.userName,
                    workingStyle: newUser.workingStyle,
                    favTasks: newUser.favTasks,
                    dayStart: newUser.dayStart,
                    dayEnd: newUser.dayEnd,

                    // Tasks
                    registeredTasks: []
                 });// if undefined,make empty

                    console.log('Email:', userEmail);
                    console.log('Password:',userPassword);
                    console.log("User added with ID: ", userDocRef.id);

                    addTask(userDocRef.id);

            }catch(error){
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Unkown Error',errorCode, errorMessage);
                notyf.error('Error signing up.');
                // ..
            };   

   
         
        }
        //const user = userCredential.user;
    // ...
    

    // Display Greeting MSG/Interface, jump to ScheduleGrid
    const Greetings = () => {

    }

    //addTask Test
    async function addTask(userId) {
        const title = prompt("Task Title:");
        const description = prompt("Task Descript:");
        const startTime = prompt("Start Time:");
        const endTime = prompt("End Time:");

        const currentUser = userId;
        console.log('Current User:', currentUser);
        // Check_Input
        if (!title || !description || !startTime || !endTime) {
            alert("Need all of them");
            return;
        }
    
        const newTask = {
            title: title,
            description: description,
            startTime: startTime,
            endTime: endTime,
        };
        /*const userDocRef = doc(firebase.database, "users", currentUser); //Link json doc associated to User
        console.log('current Document', userDocRef);*/
        const userDocRef = doc(firebase.database, "users", userId);
        // Debug: if doc doesnt eist
        try {
            console.log('Current User:', currentUser);
            const userDoc = await getDoc(userDocRef);
            if (!userDoc.exists()) {
                console.error("No such user document!");
                return;
            }
            // Renew 
            await updateDoc(userDocRef, {
                registeredTasks: arrayUnion(newTask), // Add Task
            });
    
            console.log("Added:", newTask);
            alert("Task Added！");
    
        } catch (error) {
            console.error("Task not added: ", error);
            alert("Addition failed。");
        }
    }
    
    

export default LoginSignUp
