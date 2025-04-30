import React from 'react';
import Header from '../Components/Header';
import Post from '../Components/Post';
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const username = location.state?.username || "Guest";
  const userId = location.state?.userId; // Ensure this is passed from login

  return (
    <div>
      <Header username={username} />
      <Post userId={userId} />
    </div>
  );
}

export default Home;
