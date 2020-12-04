const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Projeto Final - Reprograma');
});

module.exports = router;