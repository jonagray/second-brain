const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all records
router.get('/', async (req, res) => {
    try {
        const allRecords = await pool.query("SELECT * FROM records");
        res.json(allRecords.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Get a single record by ID
// router.get('/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const record = await pool.query("SELECT * FROM records WHERE id = $1", [id]);
//         res.json(record.rows[0]);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

router.get('/search', async (req, res) => {
  const { query } = req.query; // Get the search query from query parameters

  if (!query) {
      return res.json([]); // Return an empty array if no query is provided
  }

  try {
      const results = await pool.query(
          "SELECT * FROM records WHERE title ILIKE $1 OR user_summary ILIKE $1 OR chatgpt_summary ILIKE $1",
          [`%${query}%`] // Use ILIKE for case-insensitive matching, and '%' wildcards for partial matches
      );
      res.json(results.rows);
  } catch (err) {
      console.error(err.message);
      res.status(500).json("Server error");
  }
});


// Create a new record
router.post('/', async (req, res) => {
    const { title, user_summary, link, chatgpt_summary } = req.body;
    try {
        const newRecord = await pool.query(
            "INSERT INTO records (title, user_summary, link, chatgpt_summary) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, user_summary, link, chatgpt_summary]
        );
        res.json(newRecord.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Update a record
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, user_summary, link, chatgpt_summary } = req.body;
    try {
        const updateRecord = await pool.query(
            "UPDATE records SET title = $1, user_summary = $2, link = $3, chatgpt_summary = $4 WHERE id = $5 RETURNING *",
            [title, user_summary, link, chatgpt_summary, id]
        );
        res.json(updateRecord.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a record
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM records WHERE id = $1", [id]);
        res.json("Record was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;
