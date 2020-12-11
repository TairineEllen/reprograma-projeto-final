const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autoria: { type: String },
  bairro: { type: String, required: true },
  disponivel: { type: Boolean, required: true },
  
}, {
  versionKey: false
});

const booksModel = mongoose.model('books', booksSchema);

module.exports = {
  booksModel,
  booksSchema
};