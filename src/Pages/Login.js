// Login.js
import React, { useState } from 'react';
import './Css.css';
import { useNavigate } from 'react-router-dom';

function Login () {
  const[username,setUserName]= useState("");
  const [password,setUserPassword]=useState("");
  const [error,setError]= useState("");
  const navigate= useNavigate();

  

  const handleLogin =  () => {
    if (username.trim() === "" || password.trim() === "") {
      setError("Both fields are required");
      return;
    }
  
   
      navigate('/home', { state: { username } });

  }
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
