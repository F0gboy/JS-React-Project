import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Header from './Components/Header';

function App() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/posts')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <Router>
      <Header username={username} />

      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#eee' }}>
        {/* <Link to="/">Home</Link> */}
        <Link to="/login">Log in / Log out </Link>
        <Link to="/register">Register</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home username={username} />} />*/
        {/* fallback route */}
        <Route path="*" element={<Login username={username} />} />
      </Routes>
    </Router>
  );
}

export default App;

//<Link to="/home">Home</Link>