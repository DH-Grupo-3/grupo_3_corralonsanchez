const { product, category, buy, buydetail } = require('../database/models');

const controller = {
	getAll: async (req, res) => {
		try {
			const categories = await category.findAll();
			const products = await product.findAll({ include: [{ model: category, as: 'category' }] });

			let countByCategory = [];
			for (let category of categories) {
				let count = 0;
				let obj = new Object();

				for (let product of products) {
					obj.name = category.name;
					if (category.id === product.idCategory) {
						count++;
					}
				}
				obj.count = count;
				countByCategory.push(obj);
			}

			if (!products) {
				res
					.status(404)
					.json({ error: true, message: 'no se encontraron productos en la base de datos.' });
			}

			res.status(200).json({
				count: products.length,
				countByCategory: countByCategory,
				products: products,
			});
		} catch (error) {
			res.status(500).send({ message: error.message });
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
