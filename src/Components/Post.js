import React, { useState, useEffect } from 'react';
import './Post.css'; // Import the CSS file for styling

function Post() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [userId, setUserId] = useState(1); // Replace with the actual logged-in user ID

  // Fetch posts from backend
  useEffect(() => {
    fetch('http://localhost:5000/posts')
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
    fetch('http://localhost:5000/posts', {
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
import React, { useState } from 'react';

function Post() {
  const [content, setContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);  // For at vise, når vi er i gang med at oprette et opslag
  const [error, setError] = useState(null);  // For at håndtere fejl ved oprettelse af opslag

  // Funktion til at sende POST-anmodning til backend
  const handlePost = async () => {
    if (!content) {
      setError('Please write something before posting!');
      return; // Stop hvis der ikke er noget indhold
    }

    setIsPosting(true); // Aktivér "loading" tilstand

    try {
      // Send POST-anmodning til backend med både user_id og content
      const response = await fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 1, // Her kan du bruge den rigtige user_id når du har login-funktionalitet
          content: content,
        }), // Data der sendes til backend
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const data = await response.json();
      console.log('New post created:', data);

      // Nullify the form and error state after success
      setContent('');
      setError(null);

      alert('Post created successfully!'); // Du kan vælge at vise en besked til brugeren
    } catch (err) {
      console.error('Error posting:', err);
      setError('Error while posting! Please try again.');
    } finally {
      setIsPosting(false); // Sluk "loading" tilstand
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <textarea 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a new post..."
        rows="4"
        cols="50"
      />
      <div>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Vis fejlbeskeder */}
      </div>
      <button 
        onClick={handlePost} 
        disabled={isPosting}  // Deaktiver knappen mens vi opretter opslag
      >
        {isPosting ? 'Posting...' : 'Post'}
      </button>
    </div>
  );
}

export default Post;
export default Post;
