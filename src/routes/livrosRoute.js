const express = require('express');
const router = express.Router();
const controller = require('../controllers/livrosController');

router.get('/', controller.getAllBooks);
router.post('/', controller.registerNewBook);
router.put('/:id', controller.updateBook);

module.exports = router;


