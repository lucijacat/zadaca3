const express = require('express');
const router = express.Router();
const { Review } = require('../models/review');

// Route to create a new review
router.post('/', async (req, res) => {
  const { userId, bookId, comment, rating } = req.body;
  try {
    const newReview = await Review.create({ userId, bookId, comment, rating });
    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create review' });
  }
});

module.exports = router;
