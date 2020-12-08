const { booksModel } = require('../models/livros');
const { readersModel } = require('../models/leitores');

const getAllBooks = (req, res) => {
  booksModel.find((err, books) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    };
    return res.status(200).send(books);
  });
};

const getBooksByReader = (req, res) => {
  const idReader = req.params.idReader;
  readersModel.findById(idReader, (err, reader) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    };
    if (!reader) {
      return res.status(500).send('Leitor(a) não encontrado(a)');
    }
    if (!reader.livros.length) {
      return res.status(404).send('Esse(a) leitor(a) ainda não possui livros cadastrados');
    } else {
      return res.status(200).send(reader.livros);
    };
  });
};

const getAvailableBooks = (req, res) => {
  booksModel.find({ disponivel: true }, (err, books) => {
    if (err) {
      return res.status(424).send({ message: err.message });
    };
    if (!books.length) {
      return res.status(404).send('Não há livros disponíveis para empréstimo');
    } else {
      return res.status(200).send(books);
    };
  });
};

const registerNewBook = (req, res) => {
  const idReader = req.params.idReader;
  const newBook = new booksModel(req.body);

  newBook.save(err => {
    if (err) {
      return res.status(500).send({ message: err.message });
    };
  });

  readersModel.findById(idReader, (err, reader) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    };
    if (!reader) {
      return res.status(404).send('Leitor(a) não encontrado(a)')
    } else {
      reader.livros.push(newBook);
      reader.save();
      return res.status(201).send(reader.livros);
    };
  });
};

const updateBook = (req, res) => {
  const idReader = req.params.idReader;
  readersModel.findById(idReader, (err, reader) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    };
    if (!reader) {
      return res.status(404).send('Leitor(a) não encontrado(a)');
    } else {
      const idBook = req.params.idBook;
      booksModel.findByIdAndUpdate(idBook, req.body, { new: true }, (err, book) => {
        if (err) {
          return res.status(500).send({ message: err.message });
        };
        if (!book) {
          return res.status(404).send('Livro não encontrado');
        } else {
          return res.status(200).send(book);
        };
      });
      const booktToBeUpdated = reader.livros.find(book => book._id == idBook);
      const index = reader.livros.indexOf(booktToBeUpdated);
      reader.livros.splice(index, 1, req.body);
      reader.save();
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
  const idReader = req.params.idReader;
  readersModel.findById(idReader, (err, reader) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    };
    if (!reader) {
      return res.status(404).send('Leitor(a) não encontrado(a)');
    } else {
      const idBook = req.params.idBook;
      booksModel.findByIdAndDelete(idBook, (err, book) => {
        if (err) {
          return res.status(500).send({ message: err.message });
        };
        if (!book) {
          return res.status(404).send('Livro não encontrado');
        } else {
          return res.status(200).send('Livro excluído com sucesso');
        };
      });
      const bookToBeDeleted = reader.livros.find(book => book._id == idBook);
      const index = reader.livros.indexOf(bookToBeDeleted);
      reader.livros.splice(index, 1);
      reader.save();
    };
  });
};

module.exports = {
  getAllBooks,
  getBooksByReader,
  getAvailableBooks,
  registerNewBook,
  updateBook,
  updateLocationAndStatus,
  deleteBook
};