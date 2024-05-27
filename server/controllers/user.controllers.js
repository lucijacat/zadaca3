const db = require('../db');

const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const query = 'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *';
    const values = [username, email];
    const { rows } = await db.query(query, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create user' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const query = 'SELECT * FROM users';
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.userId;
  try {
    const query = `
      SELECT users.*, 
             readlists.id AS read_list_id, 
             readlists.bookid AS read_list_book_id, 
             books.name AS books_name
      FROM users
      LEFT JOIN readlists ON users.id = readlists.userid
      LEFT JOIN books ON books.id = readlists.bookid
      WHERE users.id = $1`;
    const { rows: rows_readlist } = await db.query(query, [userId]);

    if (rows_readlist.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = {
      id: rows_readlist[0].id,
      username: rows_readlist[0].username,
      email: rows_readlist[0].email,
      readList: [],
      toBeReadList: [],
      reviews: []
    };

    rows_readlist.forEach(row => {
      if (row.read_list_book_id) {
        user.readList.push({ id: row.read_list_book_id, name: row.books_name });
      }
    });
    const query1 = `
      SELECT tobereadlists.id AS to_be_read_list_id, 
             tobereadlists.bookid AS to_be_read_list_book_id, 
             books.name AS books_name
      FROM tobereadlists
      LEFT JOIN books ON books.id = tobereadlists.bookid
      WHERE tobereadlists.userid = $1`;

    const { rows: rows_tobereadlist } = await db.query(query1, [userId]);
    if (rows_tobereadlist.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    rows_tobereadlist.forEach(row => {
      if (row.to_be_read_list_book_id) {
        user.toBeReadList.push({ id: row.to_be_read_list_book_id, name: row.books_name });
      }
    });
    const query2 = `
      SELECT reviews.id AS review_id, 
             reviews.bookid AS review_book_id, 
             reviews.comment AS review_comment, 
             reviews.rating AS review_rating,
             books.name AS books_name
      FROM reviews
      LEFT JOIN books ON books.id = reviews.bookid
      WHERE reviews.userid = $1`;

    const { rows: rows_reviews } = await db.query(query2, [userId]);
    if (rows_reviews.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    rows_reviews.forEach(row => {
      if (row.review_id) {
        user.reviews.push({
          id: row.review_id,
          bookId: row.review_book_id,
          rating: row.review_rating,
          comment: row.review_comment,
          name: row.books_name
        });
      }
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch user data' });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};
