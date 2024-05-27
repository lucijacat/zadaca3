const db = require('../db');

const addToReadList = async (req, res) => {
  const { userId, bookId } = req.body;
  try {
    const query = 'INSERT INTO readlists (userid, bookid) VALUES ($1, $2) RETURNING *';
    const values = [userId, bookId];
    const { rows } = await db.query(query, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add book to read list' });
  }
};

const getBooksFromReadList = async (req, res) => {
    const { userId } = req.params;
    try {
      const query = 'SELECT * FROM readlist WHERE userid = $1';
      const { rows } = await db.query(query, [userId]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch books from read list' });
    }
};

module.exports = {
    addToReadList,
    getBooksFromReadList,
};
