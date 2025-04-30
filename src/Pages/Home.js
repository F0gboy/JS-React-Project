import React from 'react';
import Header from '../Components/Header';
import Post from '../Components/Post';
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const username = location.state?.username || "Guest";
  const userId = location.state?.userId || 1; // Replace with actual user ID

  return (
    <div>
      <Header username={username} />
      <Post userId={userId} />
    </div>
  );
}

export default Home;
