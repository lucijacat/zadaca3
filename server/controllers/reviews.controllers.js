const db = require('../db');

// Create a new review
const createReview = async (req, res) => {
    const { bookId, rating, comment } = req.body;

    try {
        const query = 'INSERT INTO reviews (book_id, rating, comment) VALUES ($1, $2, $3) RETURNING *';
        const values = [bookId, rating, comment];
        const { rows } = await db.query(query, values);
        
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get all reviews for a specific book
const getReviewsByBookId = async (req, res) => {
    const { bookId } = req.params;

    try {
        const query = 'SELECT * FROM reviews WHERE book_id = $1';
        const { rows } = await db.query(query, [bookId]);
        
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get all reviews
const getAllReviews = async (req, res) => {
    try {
        const query = 'SELECT * FROM reviews';
        const { rows } = await db.query(query);
        
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Function to get all reviews written by a specific user
const getReviewsByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        const query = 'SELECT * FROM reviews WHERE user_id = $1';
        const { rows } = await db.query(query, [userId]);
        
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createReview,
    getReviewsByBookId,
    getAllReviews,
    getReviewsByUserId,
};
