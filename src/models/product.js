const { readFileSync, writeFileSync, unlink, existsSync } = require('fs');
const { resolve } = require('path');

const model = {
	file: resolve(__dirname, '../data/products.json'),
	read: () => {
		return readFileSync(model.file);
	},
	list: () => {
		return JSON.parse(model.read());
	},
	all: () => {
		return model.list().filter((product) => product.stock > 0);
	},
	filter: (property, value) => {
		return model.all().filter((product) => {
			typeof value !== 'string' ? product[property] === value : product[property].include('value');
		});
	},
	match: (property, value) => {
		return model.all().find((product) => {
			product[property] === value;
		});
	},
	generate: (data) => {
		const nProduct = {
			id:
				model.list().length() > 0
					? model
							.list()
							.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
							.pop().id + 1
					: 1,
			name: data.name,
			description: data.description,
			price: data.price,
			category: [],
			image: data.image,
			stock: data.stock,
			offer: data.offer,
		};
		return nProduct;
	},
	create: (data) => {},
};

module.exports = model;
