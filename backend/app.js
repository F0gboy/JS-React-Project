const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('./database/posts.db');

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY, user_id INTEGER, content TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)`);

// Get all posts with user information
app.get('/posts', (req, res) => {
  db.all(`
    SELECT posts.id, posts.content, posts.timestamp, users.username
    FROM posts
    JOIN users ON posts.user_id = users.id
    ORDER BY posts.timestamp DESC
  `, [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// Add a new post
app.post('/posts', (req, res) => {
  const { user_id, content } = req.body;
  db.run('INSERT INTO posts (user_id, content) VALUES (?, ?)', [user_id, content], function (err) {
    if (err) return res.status(500).send(err.message);
    res.json({ id: this.lastID, user_id, content });
  });
});

// Start server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));