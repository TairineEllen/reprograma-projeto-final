const express = require('express');
const router = express.Router();
const controller = require('../controllers/leitoresController');

router.get('/', controller.getAllLeitores);

module.exports = router;


