const db = require('../db');
const axios = require('axios');

const createBook = async (req, res) => {
    const { name, author, description } = req.body;

    try {
        const checkQuery = 'SELECT id FROM books WHERE name = $1';
        const checkValues = [name];
        const { rows: existingBooks } = await db.query(checkQuery, checkValues);

        let bookId;

        if (existingBooks.length > 0) {
            bookId = existingBooks[0].id;
        } else {
            const insertQuery = 'INSERT INTO books (name, author, description) VALUES ($1, $2, $3) RETURNING id';
            const insertValues = [name, author, description];
            const { rows } = await db.query(insertQuery, insertValues);
            bookId = rows[0].id;
        }

        res.json({ id: bookId });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


const getBooks = async (req, res) => {
    try {
        const query = 'SELECT * FROM books';
        const { rows } = await db.query(query);
        
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const searchBooks = async (req, res) => {
    try {
        const query = req.query.q;
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
        res.json(response.data.items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch books from Google Books API' });
    }
};

module.exports = {
    createBook,
    getBooks,
    searchBooks,
};
