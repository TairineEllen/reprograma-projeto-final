const app = require('./src/app');
const port = process.env.PORT;

app.listen(port, () => {
  console.info(`API rodando da porta ${port}`);
});