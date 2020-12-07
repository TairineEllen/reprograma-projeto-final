const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
  titulo: { type: String },
  autoria: { type: String },
  bairro: { type: String },
  disponivel: { type: Boolean },
  
}, {
  versionKey: false
});

const booksModel = mongoose.model('books', booksSchema);

module.exports = {
  booksModel,
  booksSchema
};