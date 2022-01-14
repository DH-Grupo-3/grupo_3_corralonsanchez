const app = require('./app.js');
const PUERTO = 3000;

app.listen(PUERTO, (req, res) => {
  console.log(`Servidor escuchando puerto ${PUERTO}`);
});
