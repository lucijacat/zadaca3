const express = require('express');
const router = express.Router();
const { createReview, getReviewsByBookId, getAllReviews, getReviewsByUserId } = require('../controllers/reviews.controllers');

router.post('/', createReview);
router.get('/book/:bookId', getReviewsByBookId);
router.get('/', getAllReviews);
router.get('/user/:userId', getReviewsByUserId);

module.exports = router;
