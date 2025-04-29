import React, { useState, useEffect } from 'react';
import './Post.css'; // Import the CSS file for styling

function Post() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [userId, setUserId] = useState(1); // Replace with the actual logged-in user ID

  // Fetch posts from backend
  useEffect(() => {
    fetch('http://localhost:3001/posts')
      .then((res) => res.json())
      .then((data) => {
        // Sort posts by timestamp in descending order
        const sortedPosts = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setPosts(sortedPosts);
      });
  }, []);

  // Handle new post submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, content: newPost }),
    })
      .then((res) => res.json())
      .then((post) => setPosts((prev) => [post, ...prev])); // Prepend the new post
    setNewPost('');
  };

  return (
    <div className="post-container">
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
          className="post-input"
        />
        <button type="submit" className="post-button">Post</button>
      </form>
      <div className="feed">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <strong className="post-username">{post.username}</strong>
              <span className="post-timestamp">{new Date(post.timestamp).toLocaleString()}</span>
            </div>
            <p className="post-content">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Post;