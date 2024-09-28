import { useState } from 'react';
import { getAuth } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';

import { getFirestore, doc, setDoc } from 'firebase/firestore'; 
import firebase from '../__FirebaseImplement/firebase'; //import firebase

const SignUpFormDetailed = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  const collectUserInfo = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store data under userAccount
      //@
      await setDoc(doc(db, 'users', user.uid), {
        userName: userName,
        email: user.email,
        createdAt: new Date()
      });
      console.log('User signed up and data stored successfully');
    } catch (error) {
      console.error('Error signing up: ', error.message);
    }
  };

  return (
    <form onSubmit={collectUserInfo}>
      <input 
        type="text" 
        placeholder="Username" 
        value={userName} 
        onChange={(e) => setUserName(e.target.value)} 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpFormDetailed;