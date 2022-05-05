const { product, category, buy, buydetail } = require('../database/models');

const controller = {
	getAll: async (req, res) => {
		try {
			const categories = await category.findAll();
			const products = await product.findAll();
			let countByCategory = {};
			for (let category in categories) {
				let name = category.dataValue.name;
				console.log(name);
				let count = 0;
				for (let product in products) {
					if (category.id === product.idCategory) count++;
				}
				countByCategory = Object.assign(countByCategory, { name: name, count: count });
			}
			console.log(countByCategory);

			let ferreteria = products.map((product) => {
				if (product.idCategory === 1) {
					return product;
				}
			});

			// res.json(products);

			if (!products) {
				res
					.status(404)
					.json({ error: true, message: 'no se encontraron productos en la base de datos.' });
			}

			res.status(200).json({
				count: products.length,
				data: products,
			});
		} catch (error) {
			res.status(500).send({ message: error });
		}
	},

	getProductByid: async (req, res) => {
		try {
			const productId = await product.findByPk(req.params.id);

			if (!productId) {
				res
					.status(404)
					.json({ error: true, message: 'no se entro el producto en la base de datos.' });
			}

			res.status(200).json({
				data: productId,
			});
		} catch (error) {
			res.status(500).send({ message: error });
		}
	},
};

module.exports = controller;
