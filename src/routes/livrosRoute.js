const express = require('express');
const router = express.Router();
const controller = require('../controllers/livrosController');

router.get('/', controller.getAllBooks);
//router.post('/', controller.registerNewBook);

module.exports = router;


