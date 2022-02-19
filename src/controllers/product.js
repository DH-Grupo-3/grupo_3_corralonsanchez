const { list, all, filter, match } = require('../models/product');

const controller = {
	getAll: (req, res) => {
		const contex = all();
		return res.render('index.html', { contex });
	},
	createProduct: (req, res) => {},
	getProductByid: (req, res) => {},
	editProduct: (req, res) => {},
	saveProduct: (req, res) => {},
	updateProduct: (req, res) => {},
	deleteProduct: (req, res) => {},
};

module.exports = { controller };
