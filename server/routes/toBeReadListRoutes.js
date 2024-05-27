const express = require('express');
const router = express.Router();
const toBeReadListController = require('../controllers/toBeReadList.controllers');

router.post('/', toBeReadListController.addToToBeReadList);

router.get('/:userId', toBeReadListController.getBooksFromToBeReadList);

module.exports = router;
