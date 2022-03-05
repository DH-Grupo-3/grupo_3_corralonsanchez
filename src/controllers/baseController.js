const path = require('path');
const views = path.join(__dirname, '../views');
const model = require('../models/product');

exports.getIndex = (req, res, next) => {
	res.render('index');
};

exports.login = (req, res, next) => {
	res.render('login');
};

exports.register = (req, res, next) => {
	res.render('register');
};
