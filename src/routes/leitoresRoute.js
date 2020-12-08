const express = require('express');
const router = express.Router();
const controller = require('../controllers/leitoresController');
const { getBooksByReader, registerNewBook } = require('../controllers/livrosController');


router.post('/', controller.registerNewReader);
router.post('/:idReader/livros', registerNewBook);
router.get('/', controller.getAllReaders);
router.get('/:idReader', controller.getReaderById);
router.get('/:idReader/livros', getBooksByReader);
router.put('/:idReader', controller.updateReader);
router.delete('/:idReader', controller.deleteReader);

module.exports = router;


