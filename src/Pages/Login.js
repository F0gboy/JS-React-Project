// Login.js
import React, { useState } from 'react';
import './Css.css';
import { useNavigate } from 'react-router-dom';

function Login () {
  const[username,setUserName]= useState("");
  const [password,setUserPassword]=useState("");
  const [error,setError]= useState("");
  const navigate= useNavigate();

  

  const handleLogin = async () => {
    if (username.trim() === "" || password.trim() === "") {
      setError("Both fields are required");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        setError(data.error || "Login failed");
      } else {
        alert("Login successful!");
        navigate('/home', { state: { username } });
      }
  
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    }
  };
  
  return (
  <div className="form-container">
      <h2>Login Page</h2>
      <h3 style={{color:"red"}}> {error}</h3>
      <div className="form-group">
        <label className='label'>User name</label>
        <input type="text" 
        value={username}
        onChange={(e)=> setUserName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className='label'>Password</label>
        <input type="password" 
        value={password}
        onChange={(e)=> setUserPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Log in  </button>
   
    </div>
);

}

export default Login;
