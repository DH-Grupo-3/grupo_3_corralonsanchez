const path = require('path');
const views = path.join(__dirname, '../views');

exports.getIndex = (req, res, next) => {
	res.render('index');
};

exports.login = (req, res, next) => {
	res.render('login');
};

exports.register = (req, res, next) => {
	res.render('register');
};

exports.productDetail = (req, res, next) => {
	res.render('productDetail');
};

exports.productCart = (req, res, next) => {
	res.render('productCart');
};

exports.productForm = (req, res, next) => {
	res.render('productForm');
};

exports.productEdit = (req, res, next) => {
	res.render('productEdit');
};

exports.productList = (req, res, next) => {
	res.render('productList');
};
