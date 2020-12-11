const express = require('express');
const router = express.Router();
const controller = require('../controllers/livrosController');

router.get('/', controller.getAllBooks);
router.get('/disponivel', controller.getAvailableBooks);
router.patch('/:idBook', controller.updateLocationAndStatus);

module.exports = router;