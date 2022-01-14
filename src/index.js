const app = require('./app.js');

app.listen(app.get('port'), (req, res) => {
  console.log(`Server listening on http://localhost:${app.get('port')}`);
});
