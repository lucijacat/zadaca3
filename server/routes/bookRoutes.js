const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Book } = require('../models/book');


// Route to add a new book
router.post('/', async (req, res) => {
  try {
    // Create a new book in the database
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Failed to add book' });
  }
});

// Route to search books using Google Books API
router.get('/search-books', async (req, res) => {
  try {
    const query = req.query.q;
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    res.json(response.data.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch books from Google Books API' });
  }
});

module.exports = router;
