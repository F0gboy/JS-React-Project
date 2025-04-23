import React, { useState, useEffect } from 'react';

function Post() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  // Fetch posts from backend
  useEffect(() => {
    fetch('http://localhost:5000/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  // Handle new post submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newPost }),
    })
      .then((res) => res.json())
      .then((post) => setPosts((prev) => [...prev, post]));
    setNewPost('');
  };

  return (
    <div>
      <h2>Posts</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write a post..."
        />
        <button type="submit">Post</button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default Post;