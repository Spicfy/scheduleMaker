import React, {useRef, useState} from 'react'
import './LoginSignUp.css'

import user_icon from '../../assets/person.png'
import email_icon from '../../assets/email.png'
import password_icon from '../../assets/password.png'

// Import DB features
import firebase from '../../firebase';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";

const LoginSignUp = () => {

    const [action, setAction] = useState('Sign Up')
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const usernameRef = useRef(null)

    /* DEBUG: has focus 
    const handleFocus = () => {
        console.log(emailRef.current.value);
        console.log(passwordRef.current.value);
        console.log(usernameRef.current.value);
    };*/

    const handleActionChange = (newAction) => {
        setAction(newAction);
    };

    const handleSubmit = async (e) => {
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
                    <input type="email" placeholder="Email Id" ref={emailRef}/>
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder="Password" ref={passwordRef}/>
                </div>

        </div>
        {action == "Sign Up"?<div></div>:<div className="forgot-password">Forgot Password? <span>Click Here!</span></div>}
        <div className="submit-container">
            <div className={action==="Sign Up"?"submit gray":"submit"} onClick={() => { handleActionChange('Sign Up'); handleSubmit(); }}>Sign Up</div>
            <div className={action==="Login" ? "submit gray":"submit"} onClick={() => { handleActionChange('Login'); handleSubmit(); }}>Login</div>
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

        try {
            await signInWithEmailAndPassword(firebase.databaseAuth, userEmail, userPassword);
            console.log("User Logged in Successfully");
            // Jump to Greeting and load Schedule
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Logging error:",errorCode, errorMessage);
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

        //1. Check if user already exist. If so, refuse submission
        try {
            const signInMethods = await fetchSignInMethodsForEmail(firebase.databaseAuth, userEmail);
            if (signInMethods.length > 0) {
                console.log("This email address has already been used for registration.");
                return; // if user already exists, dont proceed
            }
        }catch(error)
        {}

        // 2. Creating New User
            console.log('Sign_Up Clicked');
            console.log('Email:', userEmail);
            console.log('Password:',userPassword);
        try {
            await createUserWithEmailAndPassword(firebase.databaseAuth, userEmail, userPassword);
                console.log('User signed up successfully!');
                // Jump to UserInfoCollect Page
            } catch(error){
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Error signing up',errorCode, errorMessage);
                // ..
            };   
        }
        //const user = userCredential.user;
    // ...
    

    // Display Greeting MSG/Interface, jump to ScheduleGrid
    const Greetings = () => {

    }

import './LoginSignUp.css'

export default LoginSignUp
