// Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username,setUserName]= useState("");
  const [userpassword, setUserPassword]= useState("");
  const [error, setError]=useState("");
  
  const navigate= useNavigate();
  const handleRegistration = async () => {
    if (username.trim() === "" || userpassword.trim() === "") {
      setError("Both fields are required");
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: userpassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
      } else {
        alert("Registration successful!");
        navigate("/login"); // Redirect to homepage or login
      }

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    }
      
    
  };
  
  return (
    <div className="form-container">
      
        <h2>Registration page</h2>

        <h3 style={{color: "red"}}>{error}</h3>
        
        <div className="form-group">
          <label className='label'>User name</label>
          <input type="text"
           value={username}
           onChange={(e)=>setUserName(e.target.value)}
           />
        </div>
  
        <div className="form-group">
          <label className='label'>Password</label>
          <input type="password"
          value={userpassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        
        </div>
        <button onClick={handleRegistration}> Create a new account  </button>
     
      </div>
  );
}

export default Register;
