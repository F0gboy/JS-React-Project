import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Header from './Components/Header';

function App() {
  const [username, setUsername] = useState('');

  return (
    <Router>
      <Header username={username} />

      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#eee' }}>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
