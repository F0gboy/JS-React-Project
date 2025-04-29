import React, { useState, useEffect } from 'react';
import './Post.css'; // Optional: Keep this if you're using custom styles

function Post() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [userId] = useState(1); // Replace with actual logged-in user ID
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState(null);

  // Fetch existing posts from backend
  useEffect(() => {
    fetch('http://localhost:3001/posts')
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setPosts(sorted);
      })
      .catch((err) => {
        console.error('Error fetching posts:', err);
        setError('Failed to fetch posts');
      });
  }, []);

  // Handle new post submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPost.trim()) {
      setError('Please write something before posting!');
      return;
    }

    setIsPosting(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, content: newPost }),
      });

      if (!res.ok) throw new Error('Failed to create post');

      const createdPost = await res.json();
      setPosts((prev) => [createdPost, ...prev]); // Add new post to top
      setNewPost('');
    } catch (err) {
      console.error(err);
      setError('Error while posting. Please try again.');
    } finally {
      setIsPosting(false);
    }
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
          rows="4"
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="post-button" disabled={isPosting}>
          {isPosting ? 'Posting...' : 'Post'}
        </button>
      </form>

      <div className="feed">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <strong className="post-username">{post.username || 'User'}</strong>
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
