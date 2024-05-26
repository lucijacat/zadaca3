const express = require('express');
const router = express.Router();

// Route to add a book to the read list
router.post('/', async (req, res) => {
  const { userId, bookId } = req.body;
  // try {
  //   const readListItem = await ReadList.create({ userId, bookId });
  //   res.status(201).json(readListItem);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: 'Failed to add book to read list' });
  // }
});

module.exports = router;
