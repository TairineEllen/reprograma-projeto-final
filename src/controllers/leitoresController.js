const { leitoresModel } = require('../models/leitores');
const { livrosModel } = require('../models/livros');

const registerNewReader = (req, res) => {  
  const newReader = new leitoresModel({
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    livros: req.body.livros.map(livro => {
      const book = new livrosModel({
        titulo: livro.titulo,
        autoria: livro.autoria,
        disponivel: livro.disponivel,
        bairro: livro.bairro
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
  leitoresModel.find({}, { nome: 1, email: 1}, (err, leitores) => {
    if (err) {
      return res.status(424).send({ message: err.message });
    };   
    return res.status(200).send(leitores);
  });  
};

const updateReader = (req, res) => {
  const id = req.params.id;
  leitoresModel.find({ _id: id }, (err, leitor) => {    
    if (!leitor) {
      return res.status(404).send('Leitor não encontrado');
    } else {
      leitoresModel.updateOne({ _id: id }, { $set: req.body }, err => {
        if (err) {
          return res.status(424).send({ message: err.message });
        };
        return res.status(200).send('Informações atualizadas com sucesso!');         
      });      
    };         
  }); 
};

const deleteReader = (req, res) => {
  const id = req.params.id;
  leitoresModel.find({ _id: id }, (err, leitor) => {
    if (!leitor) {
      return res.status(404).res.send('Leitor não encontrado');
    } else {
      leitoresModel.deleteOne({ _id: id }, err => {
        if (err) {
          return res.status(424).send({ message: err.message });
        };
        return res.status(200).send('Leitor excluído com sucesso');
      });
    };
  });
};

module.exports = {
  registerNewReader,
  getAllReaders,
  updateReader,
  deleteReader
};