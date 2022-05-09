const { product, category, buy, buydetail } = require('../database/models');

const controller = {
	getAll: async (req, res) => {
		try {
			const categories = await category.findAll();
			let products = await product.findAll({ include: [{ model: category, as: 'category' }] });
			let countByCategory = [];

			for (let category of categories) {
				let count = 0;
				let obj = new Object();
				obj.name = category.name;

				for (let product of products) {
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

			products = products.map((product) => {
				product.dataValues.detail = `/api/products/${product.id}`;
				productId.dataValues.imgUrl = `/api/img/?img=${productId.image}`;
				return product;
			});

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
			let productId = await product.findByPk(req.params.id, {
				include: [{ model: category, as: 'category' }],
			});

			if (!productId) {
				res
					.status(404)
					.json({ error: true, message: 'no se entro el producto en la base de datos.' });
			}

			productId.dataValues.imgUrl = `/api/img/?img=${productId.image}`;

			res.status(200).json({
				data: productId,
			});
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},
};

module.exports = controller;
