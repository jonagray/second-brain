require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const recordsRoutes = require('./routes/records');
const tagsRoutes = require('./routes/tags');
const authorize = require('./middleware/authorize');
const cors = require('cors');

app.use(express.json());

// Use it before any route definitions
app.use(cors({
  origin: 'http://localhost:3001', // Adjust this to match the URL of frontend application
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow session cookie from browser to pass through
}));

// Public route
app.get('/', (req, res) => {
  res.send('Welcome to the Second Brain API');
});

// User Authentication Routes
app.use('/api/users', userRoutes);
app.use('/api/records', recordsRoutes);
app.use('/api/tags', tagsRoutes);

// Protected route example
app.get('/api/protected', authorize, (req, res) => {
    res.json("Access to protected data granted");
});

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});