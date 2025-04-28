import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';

function App() {
  useEffect(() => {
    fetch('http://localhost:5000/posts')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <Router>
      <Routes>
        {/* Set Home as the default route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
