const path = require('path');
const views = path.join(__dirname, '../views');

exports.getIndex = (req, res, next) => {
  res.sendFile('index.html');
};

exports.login = (req, res, next) => {
  res.sendFile(views + '/login.html');
};

exports.register = (req, res, next) => {
  res.sendFile(views + '/register.html');
};

exports.productDetail = (req, res, next) => {
  res.sendFile(views + '/productDetail.html');
};

exports.productCart = (req, res, next) => {
  res.sendFile(views + '/productCart.html');
};
