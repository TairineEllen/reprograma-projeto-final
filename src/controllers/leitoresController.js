const { leitoresModel } = require('../models/leitores');

const getAllLeitores = (req, res) => {
  leitoresModel.find((err, leitores) => {
    if (err) {
      return console.log('erro')
    }
    return res.send('rolou')
  })
}

module.exports = {
  getAllLeitores
}