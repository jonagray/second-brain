const express = require('express');
const router = express.Router();
const pool = require('../db'); // Adjust the path as necessary

// Get all tags
router.get('/', async (req, res) => {
    try {
        const allTags = await pool.query("SELECT * FROM tags");
        res.json(allTags.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get a single tag by ID
// router.get('/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const tag = await pool.query("SELECT * FROM tags WHERE id = $1", [id]);
//         if (tag.rows.length === 0) {
//             return res.status(404).json("Tag not found");
//         }
//         res.json(tag.rows[0]);
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
          "SELECT * FROM tags WHERE name ILIKE $1",
          [`%${query}%`] // Use ILIKE for case-insensitive matching, and '%' wildcards for partial matches
      );
      res.json(results.rows);
  } catch (err) {
      console.error(err.message);
      res.status(500).json("Server error");
  }
});


// Create a new tag
router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const newTag = await pool.query(
            "INSERT INTO tags (name) VALUES ($1) RETURNING *",
            [name]
        );
        res.json(newTag.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Update a tag
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updateTag = await pool.query(
            "UPDATE tags SET name = $1 WHERE id = $2 RETURNING *",
            [name, id]
        );
        if (updateTag.rows.length === 0) {
            return res.status(404).json("Tag not found");
        }
        res.json(updateTag.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a tag
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteTag = await pool.query("DELETE FROM tags WHERE id = $1 RETURNING *", [id]);
        if (deleteTag.rows.length === 0) {
            return res.status(404).json("Tag not found");
        }
        res.json("Tag was deleted");
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;
