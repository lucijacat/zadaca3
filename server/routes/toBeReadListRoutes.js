const express = require('express');
const router = express.Router();

// Route to add a book to the to-be-read list
router.post('/', async (req, res) => {
  const { userId, bookId } = req.body;
  // try {
  //   const toBeReadListItem = await ToBeReadList.create({ userId, bookId });
  //   res.status(201).json(toBeReadListItem);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: 'Failed to add book to to-be-read list' });
  // }
});

module.exports = router;
