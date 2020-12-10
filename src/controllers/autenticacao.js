const auth = (req, res) => {
  const authHeader = req.get('authorization')
  if (!authHeader) {
    return res.status(401).send('Acesso negado: login necessário');
  };
  const token = authHeader.split(' ')[1];
  return token
};

module.exports = { auth };