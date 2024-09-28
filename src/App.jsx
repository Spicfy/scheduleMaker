import React from 'react';
 // Ensure the import path is correct
import LoginSignUp from './components/LoginSignUp/LoginSignUp';
import HomePage from './components/HomePage/HomePage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function App() {


  return (
    <Router>
  
        <nav>
          <Link to="/home">Home</Link>
          <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginSignUp />} />
        </Routes>
    
    </Router>
  );
}

export default App;
