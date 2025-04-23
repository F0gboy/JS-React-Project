const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('./database/posts.db');

// Middleware
app.use(cors());
app.use(express.json());

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY, content TEXT)`);

// Get all posts
app.get('/posts', (req, res) => {
  db.all('SELECT * FROM posts', [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// Add a new post
app.post('/posts', (req, res) => {
  const { content } = req.body;
  db.run('INSERT INTO posts (content) VALUES (?)', [content], function (err) {
    if (err) return res.status(500).send(err.message);
    res.json({ id: this.lastID, content });
  });
});

// Start server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));