const mongoose = require('mongoose');
const { booksSchema } = require('./livros')

const readersSchema = new mongoose.Schema({
  nome: { type: String },
  email: { type: String },
  senha: { type: String },
  livros: [booksSchema]
}, {
  versionKey: false
});

const readersModel = mongoose.model('readers', readersSchema);

module.exports = {
  readersModel,
  readersSchema
};

// const mongoose = require('mongoose');

// const leitoresSchema = new mongoose.Schema({
//   codLeitor: { type: Number },
//   nome: { type: String },
//   email: { type: String },
//   senha: { type: String }
// }, {
//   versionKey: false
// });

// const leitoresModel = mongoose.model('leitores', leitoresSchema);

// module.exports = {
//   leitoresModel,
//   leitoresSchema
// };
