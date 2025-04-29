const db = require('./db'); // Sørg for, at db.js er importeret
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware til CORS og JSON
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
  
app.use(express.json());  // Middleware til at parse JSON i request body

// POST-rute til at tilføje en kommentar
app.post('/comments', (req, res) => {
  // Log hvad der modtages i anmodningen
  console.log('Received POST request on /comments:', req.body);

  const { post_id, user_id, comment } = req.body;  // Hent data fra request body

  // Kontroller, om alle nødvendige data er sendt med
  if (!post_id || !user_id || !comment) {
    return res.status(400).json({ error: 'Missing required fields: post_id, user_id, or comment' });
  }

  // SQL-forespørgsel til at indsætte kommentar i databasen
  const query = "INSERT INTO comments (post_id, user_id, comment) VALUES (?, ?, ?)";
  
  db.run(query, [post_id, user_id, comment], function(err) {
    if (err) {
      console.error('Error inserting comment:', err.message);  // Log fejl
      return res.status(500).json({ error: err.message });  // Hvis der er en fejl
    }
    // Hvis kommentar er tilføjet, returner info om den nye kommentar
    console.log('Comment added with ID:', this.lastID);  // Log succes
    res.status(201).json({
      id: this.lastID,  // ID på den nye kommentar
      post_id,
      user_id,
      comment,
    });
  });
});

// GET-rute til at hente kommentarer for et specifikt opslag
app.get('/comments/:postId', (req, res) => {
  const postId = req.params.postId;
  
  // Log hvad der modtages i GET anmodningen
  console.log('Received GET request on /comments/' + postId);

  // SQL-forespørgsel til at hente kommentarer for et specifikt opslag
  db.all("SELECT * FROM comments WHERE post_id = ?", [postId], (err, rows) => {
    if (err) {
      console.error('Error fetching comments:', err.message);  // Log fejl
      return res.status(500).json({ error: err.message });
    }
    console.log('Found comments:', rows);  // Log de fundne kommentarer
    res.json(rows); // Returner alle kommentarer for opslaget
  });
});

// Standard rute til at tjekke, om serveren kører
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Start serveren
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
