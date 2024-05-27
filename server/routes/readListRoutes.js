const express = require('express');
const router = express.Router();
const readListController = require('../controllers/readList.controllers');

router.post('/', readListController.addToReadList);

router.get('/:userId', readListController.getBooksFromReadList);

module.exports = router;
