const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Set up Express
const app = express();
// app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = 3001;

// Create or open SQLite database
const db = new sqlite3.Database(path.resolve(__dirname, 'database.db'), (err) => {
  if (err) return console.error(err.message);
  console.log('Connected to SQLite database ✅');
});

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      profile_pic TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      content TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER,
      user_id INTEGER,
      comment TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES posts(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
});

// Middleware for global request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware for CORS and handling JSON bodies
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Static files

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

// Default route
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

    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password], function (err) {
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

    // res.json({ message: 'Login successful', userId: user.id });
    res.json({ message: 'Login successful', username: user.username, userId: user.id });
  });
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// PROFILE PICTURE UPLOAD route



app.post('/upload-profile-pic', upload.single('profilePic'), (req, res) => {
  console.log('Uploaded file:', req.file);

  const userId = req.body.userId;
  console.log("User ID from form:", userId);

  // Convert Windows-style backslashes to URL-safe forward slashes
  const normalizedPath = req.file ? req.file.path.replace(/\\/g, '/') : null;

  if (!normalizedPath) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  db.run(`UPDATE users SET profile_pic = ? WHERE id = ?`, [normalizedPath, userId], function (err) {
    if (err) {
      console.error('Error saving profile picture:', err.message);
      return res.status(500).json({ error: 'Failed to save profile picture' });
    }

    res.status(200).json({ message: 'Profile picture updated successfully', filePath: normalizedPath });
  });
});


// GET PROFILE PICTURE route
app.get('/get-profile-pic/:id', (req, res) => {
  const userId = req.params.id;

  db.get(`SELECT profile_pic FROM users WHERE id = ?`, [userId], (err, row) => {
    if (err) {
      console.error('Error fetching profile picture:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!row || !row.profile_pic) {
      return res.status(404).json({ error: 'Profile picture not found' });
    }

    res.status(200).json({ profile_pic: row.profile_pic });
  });
});
