const { livrosModel } = require('../models/livros');

const getAllBooks = (req, res) => {
  livrosModel.find((err, livros) => {
    if (err) {
      return res.status(424).send({ message: err.message });
    };
    return res.status(200).send(livros);
  });
};

const registerNewBook = (req, res) => {
  const newBook = new livrosModel(req.body);
  newBook.save(err => {
    if (err) {
      return res.status(424).send({ message: err.message });
    };
    return res.status(201).send(newBook);
  });
};

module.exports = {
  getAllBooks,
  registerNewBook
};