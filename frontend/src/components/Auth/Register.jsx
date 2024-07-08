import React, { useEffect, useState } from "react";

const Login=()=>{
    const [user, setUser]=useState({email:"", password: ""});
    const [loggedIn, setLoggedIn]=useState(false);
    const navigate= useNavigate();

    const inputHandler=(e)=>{
        setUser({...user, [e.target.name] : e.target.value});
    };

    const  handleSubmit= async()=>{
        try{
            const response=await fetch("https://books-app-tkcq.onrender.com/users/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)
            });

            
            if(!response.ok){
                throw new Error(`HTTP error, Status: ${response.status}`)
            }
             
            const data=await response.json();
            console.log('Response data:', data);

            if(data.accessToken){
                alert("User login successfully");
                console.log('token:',data.accessToken);
                setLoggedIn(true);
            }
            
        } catch(err){
            console.log(err);
            alert('Please try again.')
        }
    };

    useEffect(()=>{
        if(loggedIn){
            navigate('/');
        }
    },[loggedIn, navigate]);

    return (
        <div>
            <input
              type="text"
              name="email"
              placeholder="email"
              value={user.email}
              onChange={inputHandler}
            />

            <input
              type="password"
              name="password"
              placeholder="password"
              value={user.password}
              onChange={inputHandler}
            />

            <button type="button" onClick={handleSubmit}>
                Login
            </button>
        </div>
    )
}

export default Login;