const db = require('./db');

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));
  
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
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
        console.error("Error inserting user:", err.message);  // Add this line!
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

