const { leitoresModel } = require('../models/leitores');
const { livrosModel } = require('../models/livros');

const registerNewReader = (req, res) => {  
  const newReader = new leitoresModel({
    nome: req.body.nome,
    email: req.body.email,
    bairro: req.body.bairro,
    livros: req.body.livros.map(livro => {
      const book = new livrosModel({
        titulo: livro.titulo,
        autoria: livro.autoria,
        disponivel: livro.disponivel
      });

      book.save(err => {
        if (err) {
          return res.status(424).send({ message: err.message });
        };        
      }); 
      return book;     
    })
  });   

  newReader.save(err => {
    if (err) {
      return res.status(424).send({ message: err.message });
    };
    return res.status(201).send(newReader);
  });  
};

const getAllReaders = (req, res) => {
  leitoresModel.find({}, { nome: 1, email: 1, bairro: 1}, (err, leitores) => {
    if (err) {
      return res.status(424).send({ message: err.message });
    };   
    return res.status(200).send(leitores);
  });
  
};

module.exports = {
  registerNewReader,
  getAllReaders
};