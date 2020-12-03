const { livrosModel } = require('../models/livros');

const getAllBooks = (req, res) => {
  const parametros = req.query;  
  livrosModel.find(parametros, (err, livros) => {
    if (err) {
      return res.status(424).send({ message: err.message });
    };
    return res.status(200).send(livros);
  });
};

const getAvailableBooks = (req, res) => {
  livrosModel.find({ disponivel: true }, (err, livros) => {
    if (err) {
      return res.status(424).send({ message: err.message });
    }; 
    if (!livros.length) {
      return res.status(404).send('Não há livros disponíveis para empréstimo');
    } else {
      return res.status(200).send(livros);
    };
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
      return res.status(404).send('Livro não encontrado');
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

const updateLocationAndStatus = (req, res) => {
  const id = req.params.id;
  livrosModel.find({ _id: id }, (err, livro) => {
    if (!livro) {
      return res.status(404).send('Livro não encontrado');
    } else {
      livrosModel.updateOne({ _id: id }, { $set: { disponivel: req.body.disponivel, bairro: req.body.bairro } }, err => {
        if (err) {
          return res.status(424).send({ message: err.message });
        };
        return res.status(200).send('Status do livro atualizado com sucesso');
      });
    };
  });  
};

const deleteBook = (req, res) => {
  const id = req.params.id;
  livrosModel.find({ _id: id }, (err, livro) => {
    if (!livro) {
      return res.status(404).send('Livro não encontrado');
    } else {
      livrosModel.deleteOne({ _id: id }, err => {
        if (err) {
          return res.status(424).send({ message: err.message });
        };
        return res.status(200).send('Livro excluído com sucesso');
      });
    };
  });
};

module.exports = {
  getAllBooks,
  getAvailableBooks,
  registerNewBook,
  updateBook,
  updateLocationAndStatus,
  deleteBook
};