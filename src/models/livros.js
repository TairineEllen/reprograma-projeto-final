const mongoose = require('mongoose');

const livrosSchema = new mongoose.Schema({
  titulo: { type: String },
  autoria: { type: String },
  disponivel: { type: Boolean }
}, {
  versionKey: false
});

const livrosModel = mongoose.model('livros', livrosSchema);

module.exports = {
  livrosModel,
  livrosSchema
};