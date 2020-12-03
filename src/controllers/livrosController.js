const { livrosModel } = require('../models/livros');
const { leitoresModel } = require('../models/leitores');

const getAllBooks = (req, res) => {
  livrosModel.find((err, livros) => {
    if (err) {
      return res.status(424).send({ message: err.message });
    };
    return res.status(200).send(livros);
  });
};

module.exports = {
  getAllBooks
};