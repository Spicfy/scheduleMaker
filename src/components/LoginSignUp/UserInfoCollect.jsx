
// Test Page,please dont modify this. it is detached from rest of files too
import { useState } from 'react';
import { getAuth } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { getFirestore, doc, setDoc } from 'firebase/firestore'; 
import firebase from '../__FirebaseImplement/firebase'; //import firebase

const UserInfoCollect = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const location = useLocation(); 
  const userEmail = location.state?.email; // emailCredential passed

 /* const collectUserInfo = async (e) => {
    e.preventDefault();
    try {
      console.log('User signed up and data stored successfully');
      // Store data under userAccount
    } catch (error) {
      console.error('Error signing up: ', error.message);
    }
  };*/

  return (
    <div>
      <h1>Hello,</h1>
      <p>Email: {userEmail}</p>
      { }
    </div>
  );
};

export default UserInfoCollect;
