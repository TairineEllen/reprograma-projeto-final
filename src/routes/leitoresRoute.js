const express = require('express');
const router = express.Router();
const controller = require('../controllers/leitoresController');
const { getBooksByReader } = require('../controllers/livrosController');


router.post('/', controller.registerNewReader);
router.get('/', controller.getAllReaders);
router.get('/:idReader', controller.getReaderById);
router.get('/:idReader/livros', getBooksByReader);
router.put('/:idReader', controller.updateReader);
router.delete('/:idReader', controller.deleteReader);

module.exports = router;


