const express = require('express');
const router = express.Router();
const controller = require('../controllers/leitoresController');
const { getBooksByReader, registerNewBook, updateBook, deleteBook } = require('../controllers/livrosController');


router.post('/', controller.registerNewReader);
router.post('/login', controller.login);

router.get('/', controller.getAllReaders);
router.get('/:idReader', controller.getReaderById);
router.put('/:idReader', controller.updateReader);
router.delete('/:idReader', controller.deleteReader);

router.post('/:idReader/livros', registerNewBook);
router.get('/:idReader/livros', getBooksByReader);
router.put('/:idReader/livros/:idBook', updateBook);
router.delete('/:idReader/livros/:idBook', deleteBook);

module.exports = router;


