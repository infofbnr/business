const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.use(bodyParser.json());

// Create or connect to the SQLite database
const db = new sqlite3.Database('database.db'); // Replace with the path to your SQLite database file in production

// Create the 'users' table in the database
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);
});

// Registration endpoint
app.post('/register', (req, res) => {
  const { fullName, username, email, password } = req.body;

  // Hash the password before storing it in the database
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Insert the user into the database
    const insertUserQuery = `
      INSERT INTO users (fullName, username, email, password)
      VALUES (?, ?, ?, ?)
    `;

    db.run(insertUserQuery, [fullName, username, email, hashedPassword], function (err) {
      if (err) {
        // Handle duplicate username or email errors
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(409).json({ message: 'Username or email already exists' });
        }
        return res.status(500).json({ message: 'Internal server error' });
      }

      return res.status(201).json({ message: 'Registration successful' });
    });
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user in the database
  const selectUserQuery = `
    SELECT id, username, password
    FROM users
    WHERE username = ?
  `;

  db.get(selectUserQuery, [username], (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (!result) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate a JWT token
      const token = jwt.sign({ id: user.id, username: user.username }, 'your_secret_key');

      // Respond with the token
      return res.json({ token });
    });
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
