import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';

function App() {
  return (
    <Router>
      
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
      <a href="/">Home</a>
      <a href="/login">Login</a>
      <a href="/register">Register</a>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
