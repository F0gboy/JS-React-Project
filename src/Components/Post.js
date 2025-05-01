import React, { useState, useEffect } from 'react';
import './Post.css'; // Optional: Keep this if you're using custom styles

function Post({ userId }) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState(null);
  // Track posts liked by the current user (in this session)
  const [likedPosts, setLikedPosts] = useState({});
  // Store comment inputs keyed by post ID
  const [commentInputs, setCommentInputs] = useState({});
  // Store comments for each post
  const [comments, setComments] = useState({});

  // Fetch existing posts and their comments from backend
  useEffect(() => {
    fetch('http://localhost:3001/posts')
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setPosts(sorted);
        // Fetch comments for each post after posts are fetched
        sorted.forEach(post => {
          fetchComments(post.id);
        });
      })
      .catch((err) => {
        console.error('Error fetching posts:', err);
        setError('Failed to fetch posts');
      });
  }, []);

  // Fetch comments for a specific post
  const fetchComments = (postId) => {
    fetch(`http://localhost:3001/posts/${postId}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments((prevComments) => ({
          ...prevComments,
          [postId]: data,
        }));
      })
      .catch((err) => console.error('Error fetching comments:', err));
  };

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
      setPosts((prev) => [createdPost, ...prev]);
      setNewPost('');
    } catch (err) {
      console.error(err);
      setError('Error while posting. Please try again.');
    } finally {
      setIsPosting(false);
    }
  };

  // Toggle like/unlike on a post
  const toggleLike = async (postId) => {
    if (likedPosts[postId]) {
      // Unlike the post
      try {
        const res = await fetch('http://localhost:3001/likes', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId, post_id: postId }),
        });
        if (!res.ok) throw new Error('Unable to unlike');
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId ? { ...p, likes_count: (p.likes_count || 1) - 1 } : p
          )
        );
        setLikedPosts({ ...likedPosts, [postId]: false });
      } catch (error) {
        console.error('Error unliking post:', error);
      }
    } else {
      // Like the post
      try {
        const res = await fetch('http://localhost:3001/likes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId, post_id: postId }),
        });
        if (!res.ok) throw new Error('Unable to like');
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId ? { ...p, likes_count: (p.likes_count || 0) + 1 } : p
          )
        );
        setLikedPosts({ ...likedPosts, [postId]: true });
      } catch (error) {
        console.error('Error liking post:', error);
      }
    }
  };

  // Handle changes to comment input for a post
  const handleCommentChange = (postId, value) => {
    setCommentInputs({ ...commentInputs, [postId]: value });
  };

  // Handle comment submission for a specific post
  const handleCommentSubmit = async (postId) => {
    const comment = commentInputs[postId];
    if (!comment || !comment.trim()) return;
    try {
      const res = await fetch('http://localhost:3001/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId, user_id: userId, comment }),
      });
      if (!res.ok) throw new Error('Failed to add comment');
      setCommentInputs({ ...commentInputs, [postId]: '' });
      fetchComments(postId); // Re-fetch comments after submitting
    } catch (error) {
      console.error('Error adding comment:', error);
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
              <span className="post-timestamp">
                {new Date(post.timestamp).toLocaleString()}
              </span>
            </div>
            <p className="post-content">{post.content}</p>
            <div className="post-actions">
              <button onClick={() => toggleLike(post.id)}>
                {likedPosts[post.id] ? 'Unlike' : 'Like'} ({post.likes_count || 0})
              </button>
            </div>

            <div className="post-comments">
              <div className="comment-input">
                <input
                  type="text"
                  value={commentInputs[post.id] || ''}
                  onChange={(e) => handleCommentChange(post.id, e.target.value)}
                  placeholder="Write a comment..."
                />
                <button onClick={() => handleCommentSubmit(post.id)}>Comment</button>
              </div>

              <div className="comments-list">
                {comments[post.id] && comments[post.id].map((comment) => (
                  <div key={comment.id} className="comment">
                    <p><strong>{comment.username}:</strong> {comment.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Post;
