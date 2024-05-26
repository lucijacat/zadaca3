const express = require('express');
const router = express.Router();


// Route to create a new user
router.post('/', async (req, res) => {
  try {
    const { username, email } = req.body;
    // const newUser = await User.create({ username, email });
    // res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

// // Route to get all users
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.findAll();
//     res.json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to fetch users' });
//   }
// });

// // Route to get a user by ID with read and to-be-read lists and reviews
// router.get('/:userId', async (req, res) => {
//   const userId = req.params.userId;
//   try {
//     const user = await User.findByPk(userId, {
//       include: [
//         { model: ReadList, include: [Book] },
//         { model: ToBeReadList, include: [Book] },
//         { model: Review, include: [Book] }
//       ]
//     });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to fetch user data' });
//   }
// });

module.exports = router;