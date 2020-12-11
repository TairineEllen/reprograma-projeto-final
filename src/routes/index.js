const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send({
    "titulo": "Gira o Livro",
    "version": "1.0.0"
  });
});

module.exports = router;