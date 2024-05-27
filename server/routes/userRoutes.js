const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getUserById } = require('../controllers/user.controllers');

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:userId', getUserById);

module.exports = router;