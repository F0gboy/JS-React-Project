import React, { useState } from 'react';
import Header from '../Components/Header';
import { useLocation } from 'react-router-dom';
import Post from '../Components/Post';

function Home() {
  const location = useLocation();
  const username = location.state?.username || "Guest";

  // State for at holde styr på opslagene
  const [posts, setPosts] = useState([
    { id: 1, content: "Første opslag", author: "Guest" },
    { id: 2, content: "Andet opslag", author: "Guest" }
  ]);

  return (
    <div>
      <Header username={username} />

      <div>
        {posts.map(post => (
          <Post key={post.id} content={post.content} author={post.author} />
        ))}
      </div>
    </div>
  );
}

export default Home;
// 