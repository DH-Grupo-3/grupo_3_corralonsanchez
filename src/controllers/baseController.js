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

exports.storage = (req, res) => {
	let newProduct = model.generate(req.body);
	model.create(newProduct);
	return res.redirect("productList");
};

exports.update = (req, res) => {
	const {id} = req.params
	let product = id ? model.match("id", id) : null
	console.log(typeof id)
	return product ? res.render("productEdit", { 
		product:product}) : res.render("error", {error: "No se encontro ningun producto"})
};

exports.modify = (req, res) => {
	// req.body.files = req.files;
	model.update(req.body);
	return res.redirect("/productList")
};
