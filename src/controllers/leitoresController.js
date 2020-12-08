const { readersModel } = require('../models/leitores');
const { booksModel } = require('../models/livros');

const registerNewReader = (req, res) => {
  const newReader = new readersModel(req.body);
  newReader.livros.map(livro => {
    const newBook = new booksModel(livro);
    newBook.save(err => {
      if (err) {
        return res.status(500).send({ message: err.message });
      };
    });    
  }); 
  
  newReader.save((err) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    };
    return res.status(201).send(newReader);
  });
};

const getAllReaders = (req, res) => {
  readersModel.find({}, { nome: 1, email: 1, livros: 1 }, (err, readers) => {
    if (err) {
      return res.status(424).send({ message: err.message });
    };
    return res.status(200).send(readers);
  });
};

const getReaderById = (req, res) => {
  const idReader = req.params.idReader;  
  readersModel.findById(idReader, (err, reader) => {
    if (!reader) {
      return res.status(404).send('Leitor não encontrado');
    };
    return res.status(200).send(reader);
  });
};

const updateReader = (req, res) => {
  const idReader = req.params.idReader;
  readersModel.find({ _id: idReader }, (err, reader) => {
    if (!reader) {
      return res.status(404).send('Leitor não encontrado');
    } else {
      readersModel.updateOne({ _id: idReader }, { $set: req.body }, err => {
        if (err) {
          return res.status(424).send({ message: err.message });
        };
        return res.status(200).send('Informações atualizadas com sucesso!');
      });
    };
  });
};

const deleteReader = (req, res) => {
  const idReader = req.params.idReader;
  readersModel.findByIdAndDelete(idReader, (err, reader) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    };

    if (!reader) {
      return res.status(404).send('Leitor não encontrado');
    };

    return res.status(200).send('Leitor excluído com sucesso');    
  });
};

module.exports = {
  registerNewReader,
  getAllReaders,
  getReaderById,
  updateReader,
  deleteReader
};