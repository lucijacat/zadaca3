const express = require('express');
const router = express.Router();
const { createBook, getBooks, searchBooks } = require('../controllers/book.controllers');


// Route to add a new book
router.post('/', createBook);
router.get('/', getBooks);
router.get('/search-books', searchBooks);

module.exports = router;
