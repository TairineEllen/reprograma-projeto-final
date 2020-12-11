const { readersModel } = require('../models/leitores');
const { booksModel } = require('../models/livros');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const { auth } = require('./autenticacao');

const registerNewReader = (req, res) => {
  const password = bcrypt.hashSync(req.body.senha, 10);
  req.body.senha = password;
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

const login = (req, res) => {
  readersModel.findOne({ email: req.body.email }, (err, reader) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    };
    if (!reader) {
      return res.status(404).send('Não existe leitor(a) cadastrado(a) com esse email');
    };

    const password = bcrypt.compareSync(req.body.senha, reader.senha);
    if (!password) {
      return res.status(403).send('Acesso negado: senha incorreta');
    };

    const token = jwt.sign({ email: reader.email }, SECRET);
    return res.status(200).send(token);
  });
};

const getAllReaders = (req, res) => {
  const token = auth(req, res);

  jwt.verify(token, SECRET, err => {
    if (err) {
      return res.status(403).send('Acesso negado: token inválido');
    };

    readersModel.find({}, { nome: 1, email: 1, livros: 1 }, (err, readers) => {
      if (err) {
        return res.status(424).send({ message: err.message });
      };
      return res.status(200).send(readers);
    });
  });
};

const getReaderById = (req, res) => {
  const token = auth(req, res);

  jwt.verify(token, SECRET, err => {
    if (err) {
      return res.status(403).send('Acesso negado: token inválido');
    };

    const idReader = req.params.idReader;
    readersModel.findById(idReader, { nome: 1, email: 1, livros: 1 }, (err, reader) => {
      if (!reader) {
        return res.status(404).send('Leitor não encontrado');
      };
      return res.status(200).send(reader);
    });
  });
};

const updateReader = (req, res) => {  
  const token = auth(req, res);

  jwt.verify(token, SECRET, err => {
    if (err) {
      return res.status(403).send('Acesso negado: token inválido');
    };

    const idReader = req.params.idReader;

    const newPassword = bcrypt.hashSync(req.body.senha, 10);
    req.body.senha = newPassword;

    readersModel.findByIdAndUpdate(idReader, req.body, { new: true }, (err, reader) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      };
      if (!reader) {
        return res.status(404).send('Leitor não encontrado');
      };
      return res.status(200).send(reader);
    });
  });
};


const deleteReader = (req, res) => {
  const token = auth(req, res);

  jwt.verify(token, SECRET, err => {
    if (err) {
      return res.status(403).send('Acesso negado: token inválido');
    };
    const idReader = req.params.idReader;
    readersModel.findById(idReader, (err, reader) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      };
      if (!reader) {
        return res.status(404).send('Leitor(a) não encontrado(a)');
      } else if (reader.livros.length) {
        return res.status(405).send('Leitor possui livros cadastrados e não pode ser excluído.');
      } else {
        readersModel.findByIdAndDelete(idReader, err => {
          if (err) {
            return res.status(500).send({ message: err.message });
          };
          return res.status(200).send('Leitor(a) excluído(a) com sucesso');
        });
      };
    });
  });
};

module.exports = {
  registerNewReader,
  login,
  getAllReaders,
  getReaderById,
  updateReader,
  deleteReader
};