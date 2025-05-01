const db = require('./db'); // Ensure db.js is imported
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware for CORS and JSON parsing
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
  
app.use(express.json());

// Endpoint to add a like to a post
app.post('/likes', (req, res) => {
  const { user_id, post_id } = req.body;
  if (!user_id || !post_id) {
    return res.status(400).json({ error: 'Missing required fields: user_id or post_id' });
  }
  db.run('INSERT INTO likes (user_id, post_id) VALUES (?, ?)', [user_id, post_id], function(err) {
    if (err) {
      console.error('Error liking post:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ likeId: this.lastID, user_id, post_id });
  });
});

// Endpoint to remove a like from a post (unlike)
app.delete('/likes', (req, res) => {
  const { user_id, post_id } = req.body;
  if (!user_id || !post_id) {
    return res.status(400).json({ error: 'Missing required fields: user_id or post_id' });
  }
  db.run('DELETE FROM likes WHERE user_id = ? AND post_id = ?', [user_id, post_id], function(err) {
    if (err) {
      console.error('Error unliking post:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Unliked successfully' });
  });
});

// POST route to add a new post
app.post('/posts', (req, res) => {
  const { user_id, content } = req.body;
  if (!user_id || !content) {
    return res.status(400).json({ error: 'Missing required fields: user_id or content' });
  }
  db.run('INSERT INTO posts (user_id, content) VALUES (?, ?)', [user_id, content], function(err) {
    if (err) {
      console.error('Error creating post:', err.message);
      return res.status(500).json({ error: err.message });
    }
    // Fetch the username of the user who created the post
    db.get('SELECT username FROM users WHERE id = ?', [user_id], (err, user) => {
      if (err) {
        console.error('Error fetching username:', err.message);
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        id: this.lastID,
        user_id,
        username: user.username,
        content,
        timestamp: new Date(),
      });
    });
  });
});

// GET route to fetch posts with user info and like count
app.get('/posts', (req, res) => {
  db.all(`
    SELECT posts.*, users.username,
      (SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.id) AS likes_count
    FROM posts 
    JOIN users ON posts.user_id = users.id 
    ORDER BY timestamp DESC
  `, (err, rows) => {
    if (err) {
      console.error('Error fetching posts:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// POST route to add a comment
app.post('/comments', (req, res) => {
  console.log('Received POST request on /comments:', req.body);
  const { post_id, user_id, comment } = req.body;
  if (!post_id || !user_id || !comment) {
    return res.status(400).json({ error: 'Missing required fields: post_id, user_id, or comment' });
  }
  const query = "INSERT INTO comments (post_id, user_id, comment) VALUES (?, ?, ?)";
  db.run(query, [post_id, user_id, comment], function(err) {
    if (err) {
      console.error('Error inserting comment:', err.message);
      return res.status(500).json({ error: err.message });
    }
    console.log('Comment added with ID:', this.lastID);
    res.status(201).json({
      id: this.lastID,
      post_id,
      user_id,
      comment,
    });
  });
});

// GET route for a simple server check
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// REGISTER route
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (row) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password], function(err) {
      if (err) {
        console.error("Error inserting user:", err.message);
        return res.status(500).json({ error: 'Failed to register user' });
      }
      res.status(201).json({ message: 'User registered successfully', userId: this.lastID });
    });   
  });
});

// LOGIN route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(400).json({ error: 'User not found' });
    if (user.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
    res.json({ message: 'Login successful', userId: user.id });
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

// GET route to fetch comments for a specific post
app.get('/posts/:id/comments', (req, res) => {
  const postId = req.params.id;
  db.all(`
    SELECT comments.*, users.username
    FROM comments
    JOIN users ON comments.user_id = users.id
    WHERE comments.post_id = ?
    ORDER BY comments.timestamp ASC
  `, [postId], (err, rows) => {
    if (err) {
      console.error('Error fetching comments:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});
