// Import React
import React, { useEffect, useRef, useState } from 'react';
import './LoginSignUp.css'

// Import User for DB
import User from '../__FirebaseImplement/user'
// Importing DB features
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { setDoc, doc, collection} from 'firebase/firestore';  // greateFirestore data in 'users'
import { databaseAuth, database } from '../__FirebaseImplement/firebase';

// Srouces
import email_icon from '../../assets/email.png'
import password_icon from '../../assets/password.png'

// Page Jumping with React Router
import { useNavigate } from 'react-router-dom';



// Importing Notyf Toast
import { Notyf } from 'notyf'; 
import 'notyf/notyf.min.css';

const LoginSignUp = () => {

    const [action, setAction] = useState('Log In');
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    const [user, setUser] = useState(null); // Store User Data

    // -----> Jump to Home Page with userId logged in
    /*const jumpToMain = (userId) =>{
        navigate(`/home`);

    }*/

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

        if (!userEmail || !userPassword) {
            // You can show a toast or an alert here
            alert("Email and password are required.");
            return;
        }
        // test inputs
        console.log('Email:', userEmail);
        console.log('Password:', userPassword);



        // call signUp + pass references
            if (action === 'Sign Up') {
                    await signUp(navigate, userEmail, userPassword);
             } else {
        
                    await logIn(navigate, userEmail, userPassword);
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
    const logIn = async (navigate, userEmail, userPassword) => {
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

        // Try to Log In
        try {
            // Get current user.
            // Get userId from current user
            const currentUserCredential = await signInWithEmailAndPassword(databaseAuth, userEmail, userPassword);
            //console.log("User Logged in Successfully");
            console.log('Log In Clicked');
            notyf.success('Log-In successfully!');

            const userId = currentUserCredential.user.uid;
            console.log(userId);

            // Jump to Main, carrying userId (to later retrieve Snapshot)
            navigate('/home');

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
    const signUp = async (navigate, userEmail, userPassword) => {


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
            const signInMethods = await fetchSignInMethodsForEmail(databaseAuth, userEmail);
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
                const currentUserCredential = await createUserWithEmailAndPassword(databaseAuth, userEmail, userPassword);
                console.log("credentials", currentUserCredential);
                console.log('User registered successfully!');
                
                notyf.success('User registered');

                // TODO: Create CurrenUser
                // (demo) Implement empty user Account for Admin (I am fixing bugs but use this for now)
                const userId = currentUserCredential.user.uid;
                const userDocRef = await setDoc(doc(database,"users",userId), {
                    userId: userId,  // get docmentId through userId?
                    registeredTasks: []

                });

               /* collection(database,"users").doc(userId).set(
                    {userId: userId,  // get docmentId through userId?
                    registeredTasks: []});
*/

                    console.log('Email:', userEmail);
                    console.log('Password:',userPassword);
                    console.log("Firestore Document Created with: ", userDocRef.id);

                navigate('/home');

            }catch(error){
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Unkown Error',errorCode, errorMessage);
                notyf.error('Error signing up.');
                // ..
            };   

   
         
        }
        //const user = userCredential.user;

export default LoginSignUp;
