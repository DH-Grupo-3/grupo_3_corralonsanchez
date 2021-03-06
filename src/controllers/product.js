// const model = require('../models/product');
const { validationResult } = require('express-validator');
const { product, category, buy, buydetail } = require('../database/models');

const controller = {
	getAll: async (req, res) => {
		try {
			const products = await product.findAll();
			res.render('product/productList', { products: products });
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},
	getCreateForm: async (req, res) => {
		const categories = await category.findAll();
		res.render('product/productForm', { categories: categories });
	},

	storageProduct: async (req, res) => {
		try {
			let errores = validationResult(req);
			if (!errores.isEmpty()) {
				const categories = await category.findAll();
				return res.render('product/productForm', {
					errores: errores.mapped(),
					categories: categories,
					old: req.body,
				});
			}
			req.body.files = req.files;
			console.log(req.body.files);
			const newProduct = await product.create({
				name: req.body.product_name,
				description: req.body.product_description,
				price: req.body.product_price,
				stock: req.body.product_stock,
				offer: req.body.ofer,
				image: req.body.files[0] ? req.body.files[0].filename : 'notimage.png',
				idCategory: req.body.category,
			});
			console.log(newProduct);
			res.redirect('/products');
		} catch (error) {
			res.status(500).send({ message: error.stack });
		}
	},
	getProductByid: async (req, res) => {
		try {
			const productId = await product.findByPk(req.params.id);
			res.render('product/productDetail', { product: productId });
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},

	editProduct: async (req, res) => {
		try {
			let errores = validationResult(req);
			if (!errores.isEmpty()) {
				const categories = await category.findAll();
				return res.render('product/productForm', {
					errores: errores.mapped(),
					categories: categories,
					old: req.body,
				});
			}
			const categoryProduct = await category.findAll();
			const productToEdit = await product.findByPk(req.params.id, { include: 'category' });
			res.render('product/productEdit', { product: productToEdit, categories: categoryProduct });
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},
	updateProduct: async (req, res) => {
		try {
			req.body.files = req.files;
			const productToEdit = await product.findByPk(req.params.id);
			await productToEdit.update(
				{
					name: req.body.product_name,
					description: req.body.product_description,
					price: req.body.product_price,
					stock: req.body.product_stock,
					offer: req.body.ofer,
					image: req.body.files[0] ? req.body.files[0].filename : 'notimage.png',
					idCategory: req.body.category,
				},
				{
					where: {
						id: req.params.id,
					},
				},
			);
			res.redirect('/products/' + req.params.id);
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},
	deleteProduct: async (req, res) => {
		try {
			const productToDelete = await product.destroy({
				where: {
					id: req.params.id,
				},
			});
			return res.redirect('/products');
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},
};

module.exports = controller;
