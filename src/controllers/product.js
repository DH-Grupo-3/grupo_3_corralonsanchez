const model = require('../models/product');

const controller = {
	getAll: (req, res) => {
		res.render('productList', { products: model.list() });
	},
	getCreateForm: (req, res) => {
		res.render('productForm');
	},
	storageProduct: (req, res) => {
		req.body.files = req.files;
		const nuevo = model.generate(req.body);
		model.create(nuevo);
		return res.redirect('/products/' + nuevo.id + '/edit');
	},
	getProductByid: (req, res) => {
		const { id } = req.params;
		const product = model.match('id', id);
		res.render('productDetail', { product });
	},
	editProduct: (req, res) => {
		const { id } = req.params;
		let product = id ? model.match('id', id) : null;
		return product
			? res.render('productEdit', {
					product: product,
			  })
			: res.render('error', { error: 'No se encontro ningun producto' });
	},
	updateProduct: (req, res) => {
		req.body.files = req.files;
		const { id } = req.body;
		console.log(req.body);
		model.update(req.body);
		return res.redirect('/products/' + id + '/edit');
	},
	deleteProduct: (req, res) => {
		model.trash(req.body.id);
		return res.redirect('/productList');
	},
};

module.exports = controller;
