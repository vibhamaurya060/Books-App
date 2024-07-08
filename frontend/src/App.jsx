import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AuthService from './services/AuthService';
import Book from './components/Book/Book';


const App = () => {
  const [user, setUser] = useState(null);

  const checkLoggedInUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userData = await AuthService.getUserData(token);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };
  
  // Check logged-in user on component mount
  useEffect(() => {
    checkLoggedInUser();
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    checkLoggedInUser();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={logout} />
      <Routes>
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/register" element={<Register />} />

          <Route path="/" element={<Book />} />
          
      </Routes>
    </Router>
  );
};

export default App;
