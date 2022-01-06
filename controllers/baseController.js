const path = require('path');

exports.getIndex = (req, res, next) => {
  res.sendFile('index.html');
};
