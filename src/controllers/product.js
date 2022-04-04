// const model = require('../models/product');
const { product, category, buy, buydetail } = require('../database/models');

const controller = {
	getAll: async (req, res) => {
		try {
			const products = await product.findAll();
			res.render('/product/productList', { products: products });
		} catch (error) {
			res.status(500).send({message: error});
		}
	},
	getCreateForm: (req, res) => {
		res.render('product/productForm');
	},
	storageProduct: async (req, res) => {
		try {
			req.body.files = req.files;
			const newProduct = await product.create({
				name: req.body.product_name,
				description: req.body.product_description,
				price: req.body.product_price,
				stock: req.body.product_stock,
				offer: req.body.ofer,
				image: req.body.product_image,
				idCategory: req.body.category
			});
			// model.create(newProduct);
			// return res.redirect('/products/' + nuevo.id + '/edit');	
			res.redirect('/product/productList');
		} catch (error) {
			res.status(500).send({message: error});
		}
	},
	getProductByid: async (req, res) => {
		try {
			const product = await product.findByPk(req.params.id);
			res.render('/product/productDetail', { product });
		} catch (error) {
			res.status(500).send({message: error});
		}
	},
	editProduct: async (req, res) => {
		try {
			const product = await product.findByPk(req.params.id);
			const category = await category.findAll();
			res.render('/product/productEdit', { product: product, category: category }); 
		} catch (error) {
			res.status(500).send({message: error});
		}
		// const { id } = req.params;
		// let product = id ? model.match('id', id) : null;
		// return product
		// 	? res.render('productEdit', {
		// 			product: product,
		// 	  })
		// 	: res.render('error', { error: 'No se encontro ningun producto' });
	},
	updateProduct: async (req, res) => {
		try {
			req.body.files = req.files;
			const editProduct = await product.update({
				name: req.body.product_name,
				description: req.body.product_description,
				price: req.body.product_price,
				stock: req.body.product_stock,
				offer: req.body.ofer,
				image: req.body.product_image,
				idCategory: req.body.category
			}, {
				where: {
					id: req.params.id
				}
			});
			res.redirect('/product/' + req.params.id);
		} catch (error) {
			res.status(500).send({message: error});
		}
		// const { id } = req.body;
		// console.log(req.body);
		// model.update(req.body);
		// return res.redirect('/products/' + id + '/edit');
	},
	deleteProduct: async (req, res) => {
		try {
			const productDelete = await product.destroy({
				where: {
					id: req.params.id
				}
			});
			return res.redirect('/product/productList');
		} catch (error) {
			res.status(500).send({message: error});
		}
	},
};

module.exports = controller;
