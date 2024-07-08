import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const inputHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            if (!user.email || !user.password) {
                throw new Error('Please fill in all fields.');
            }

            const response = await fetch("https://books-app-tkcq.onrender.com/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                throw new Error(`HTTP error, Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Response data:', data);

            if (data.accessToken) {
                alert("User login successful");
                console.log('Token:', data.accessToken);
                localStorage.setItem('token', data.accessToken); // Store token in localStorage
                setLoggedIn(true);
            } else {
                throw new Error('Login failed. Please check your credentials.');
            }

        } catch (err) {
            console.error('Login Error:', err.message);
            setError(err.message);
        }
    };

    useEffect(() => {
        if (loggedIn) {
            navigate('/');
        }
    }, [loggedIn, navigate]);

    return (
        <div  style={{marginLeft:"100px",marginTop:"40px"}}>
            <input
                type="text"
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={inputHandler}
                required
            /> <br/> <br/>

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={inputHandler}
                required
            /> <br/> <br/>

            <button type="button" onClick={handleSubmit}>
                Login
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;
