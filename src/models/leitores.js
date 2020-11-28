const mongoose = require('mongoose');
const { livrosSchema } = require('./livros');

const leitoresSchema = new mongoose.Schema({
  nome: { type: String },
  email: { type: String },
  bairro: { type: String },
  livros: [livrosSchema]
}, {
  versionKey: false
});

const leitoresModel = mongoose.model('leitores', leitoresSchema);

module.exports = {
  leitoresModel,
  leitoresSchema
};