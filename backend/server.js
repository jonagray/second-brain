require('dotenv').config();

// Import the express module
const express = require('express');


// Create an Express application
const app = express();

// Define a port number
const port = process.env.DB_PORT;

// Define a route for the root URL ('/')
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Make the application listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const pool = require('./db');  // Adjust the path based on where you place db.js

// Example query
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
});
