import React, {useRef, useState} from 'react'
import './LoginSignUp.css'

import user_icon from '../../assets/person.png'
import email_icon from '../../assets/email.png'
import password_icon from '../../assets/password.png'

// Import DB features
import firebase from '../../firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const LoginSignUp = () => {

    const [action, setAction] = useState('Sign Up')
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const usernameRef = useRef(null)

    /* Test: has focus 
    const handleFocus = () => {
        console.log(emailRef.current.value);
        console.log(passwordRef.current.value);
        console.log(usernameRef.current.value);
    };*/

    const handleSubmit = () => {
        const userEmail = emailRef.current.value;
        const userPasswordValue = passwordRef.current.value;
        const userName = usernameRef.current.value;

        // test inputs
        console.log('Email:', emailValue);
        console.log('Password:', passwordValue);
    };

  return (
    <div className="container">
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
                {action==="Login"?<div></div>:<div className="input">
                    <img src={user_icon} alt="" />
                    <input type="userName" placeholder="Name" ref={usernameRef}/>
                </div>}
                

                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder="Email Id" ref={emailRef}/>
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder="Password" ref={passwordRef}/>
                </div>
        </div>
        {action==="Sign Up"?<div></div>:<div className="forgot-password">Forgot Password? <span>Click Here!</span></div>}
        <div className="submit-container">
            <div className={action==="Login"?"submit gray":"submit"} onClick={signUp}>Sign up</div>
            <div className={action==="Sign Up"?"submit gray":"submit"} onClick={logIn}>Login</div>
        </div>
        
    </div>
  )
}

/*
    Log - in
     1. Exist? No--> Return
     2. Fetch from Firebase
     3. Store,change to schedule page
 */
 const logIn = () => {
    
  };

/*
    Sign - up
    1. Exist? Yes-> please log in
    2. Constraints
    3. Store info to DB
    4. Log in*/
    const signUp = async (e) => {
        console.log('signUp clicked');
        e.preventDefault();
        //Set state: signed_up
        try {
        await createUserWithEmailAndPassword(firebase.databaseAuth, userEmail, userPasswordValue);
            console.log('User signed up successfully!');
        } catch(error){
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          };   
    // ...
}
import './LoginSignUp.css'

export default LoginSignUp
