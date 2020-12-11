const mongoose = require('mongoose');
const { booksSchema } = require('./livros');
const { isEmail } = require('validator');


const readersSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, validate: [ isEmail, 'Email inválido' ] },
  senha: { type: String, required: true },
  livros: [booksSchema]
}, {
  versionKey: false
});

const readersModel = mongoose.model('readers', readersSchema);

module.exports = {
  readersModel,
  readersSchema
};
