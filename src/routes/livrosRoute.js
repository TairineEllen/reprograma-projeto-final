const express = require('express');
const router = express.Router();
const controller = require('../controllers/livrosController');

router.get('/', controller.getAllBooks);
router.get('/disponivel', controller.getAvailableBooks);
router.post('/', controller.registerNewBook);
router.put('/:id', controller.updateBook);
router.patch('/:id', controller.updateLocationAndStatus);
router.delete('/:id', controller.deleteBook);

module.exports = router;


