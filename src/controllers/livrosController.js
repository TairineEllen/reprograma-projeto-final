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

const updateBook = (req, res) => {
  const id = req.params.id;
  livrosModel.find({ _id: id }, (err, livro) => {
    if (!livro) {
      return res.status(404).send('Livro não encontrado')
    } else {
      livrosModel.updateOne({ _id: id }, { $set: req.body }, err => {
        if (err) {
          return res.status(424).send({ message: err.message });
        };
        return res.status(200).send('Informações atualizadas com sucesso');
      });      
    };
  });
};

module.exports = {
  getAllBooks,
  registerNewBook,
  updateBook
};