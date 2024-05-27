const db = require('../db');

const createReview = async (req, res) => {
    const { userId, bookId, rating, comment } = req.body;

    try {
        const query = 'INSERT INTO reviews (userid, bookid, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [userId, bookId, rating, comment];
        const { rows } = await db.query(query, values);
        
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getReviewsByBookId = async (req, res) => {
    const { bookId } = req.params;

    try {
        const query = 'SELECT * FROM reviews WHERE bookid = $1';
        const { rows } = await db.query(query, [bookId]);
        
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAllReviews = async (req, res) => {
    try {
        const query = 'SELECT * FROM reviews';
        const { rows } = await db.query(query);
        
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

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

const deleteReview = async (req, res) => {
    const reviewId = req.params.reviewId;
    try {
      const query = 'DELETE FROM reviews WHERE id = $1 RETURNING *';
      const { rows } = await db.query(query, [reviewId]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Review not found' });
      }
      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete review' });
    }
};
  
const updateReview = async (req, res) => {
    const reviewId = req.params.reviewId;
    const { userid, comment, rating } = req.body;
    try {
        const query = 'UPDATE reviews SET comment = $1, rating = $2 WHERE id = $3 RETURNING *';
        const values = [comment, rating, reviewId];
        const { rows } = await db.query(query, values);
        if (rows.length === 0) {
        return res.status(404).json({ message: 'Review not found' });
        }

        const query1 = 
        `SELECT reviews.id AS review_id, 
            reviews.bookid AS review_book_id, 
            reviews.comment AS review_comment, 
            reviews.rating AS review_rating,
            books.name AS books_name
        FROM reviews
        LEFT JOIN books ON books.id = reviews.bookid`;

        const { rows: new_rows } = await db.query(query1);
        const reviews = [];
        new_rows.forEach(row => {
            if (row.review_id) {
                reviews.push({
                    id: row.review_id,
                    bookId: row.review_book_id,
                    rating: row.review_rating,
                    comment: row.review_comment,
                    name: row.books_name
                });
            }
        });
        
        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update review' });
    }  
};

module.exports = {
    createReview,
    getReviewsByBookId,
    getAllReviews,
    getReviewsByUserId,
    deleteReview, 
    updateReview,
};
