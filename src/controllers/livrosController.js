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
      return res.status(500).send('Leitor não encontrado');
    }
    if (reader.livros.length > 0) {
      return res.status(200).send(reader.livros);
    } else {
      return res.status(404).send('Esse leitor ainda não possui livros cadastrados');
    };    
  });
};

// const getAllBooks = (req, res) => {
//   const parametros = req.query;
//   const bairro = req.query.bairro;
//   const disponivel = req.query.disponivel;
//   console.log(parametros)
//   console.log(Object.keys(parametros))
//   console.log(Object.values(parametros))
//   const bairro2 = new RegExp(`^${bairro}$`, 'i')
//   console.log(bairro2)
//   livrosModel.find({ bairro: new RegExp(`^${bairro}$`, 'i'), disponivel: disponivel }, (err, livros) => {
//     res.send(livros)
//   });
  
// };

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
  livrosModel.find((err, livros) => {
    const newBook = new livrosModel({
      codLivro: livros[livros.length - 1].codLivro + 1,
      ...req.body
    });
    
  newBook.save(err => {
    if (err) {
      return res.status(424).send({ message: err.message });
    };
    return res.status(201).send(newBook);
  });
  })
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
  getBooksByReader,
  getAvailableBooks,
  registerNewBook,
  updateBook,
  updateLocationAndStatus,
  deleteBook
};