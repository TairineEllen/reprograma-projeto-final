const express = require('express');
const router = express.Router();
const controller = require('../controllers/leitoresController');

router.post('/', controller.registerNewReader);
router.get('/', controller.getAllReaders);

module.exports = router;


