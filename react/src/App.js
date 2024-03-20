import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Form from './Form';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import Cookies from 'js-cookie';

function App() {
  // Check if the user has a JWT token in cookies
  let isLoggedIn = null
  useEffect(() => {
    isLoggedIn = Cookies.get('jwtToken');
    
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn && <Route path="/" element={<Navigate to="/profile" />} />}

        {!isLoggedIn && <Route path="/" element={<Login />} />}
        {!isLoggedIn && <Route path="/signup" element={<Signup />} />}

        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
