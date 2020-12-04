require('dotenv-safe').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect(`${process.env.MONGODB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.log.bind(console, 'connection error:'));
db.once('open', () => {
  console.info('Conexão feita com sucesso');
});

const index = require('./routes/index');
const leitores = require('./routes/leitoresRoute');
const books = require('./routes/livrosRoute');

app.use('/', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Alow-Headers',
    'Origin', 'X-Request-With', 'Content-Type', 'Accept'
  );
  console.info('Nova requisição realizada');
  next();
});

app.use('/', index);
app.use('/leitores', leitores);
app.use('/livros', books);

module.exports = app;