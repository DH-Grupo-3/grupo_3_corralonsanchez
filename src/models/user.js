const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const model = {
	file: resolve(__dirname, '../data', 'users.json'),
	read: () => readFileSync(model.file),
	convert: (data) => JSON.stringify(data, null, 2),
	write: (data) => writeFileSync(model.file, model.convert(data)),
	list: () => JSON.parse(model.read()),
	filter: (propiedad, valor) =>
		model
			.list()
			.filter((producto) =>
				typeof valor !== 'string' ? user[propiedad] == valor : user[propiedad].includes(valor),
			),
	match: (propiedad, valor) => model.list().find((user) => user[propiedad] == valor),
	generate: (data) =>
		Object({
			id:
				model.list().length > 0
					? model
							.list()
							.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
							.pop().id + 1
					: 1,
			full_name: data.full_name,
			email: data.email,
			password: data.password,
			dni: Number(data.dni),
			date_of_birth: data.date_of_birth,
		}),
	create: (data) => {
		let lista = model.list().sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
		lista.push(data);
		model.write(lista);
	},
	update: (data) => {
		let usuarios = model.list().sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
		usuarios = usuarios.map((usuario) => {
			if (usuario.id == data.id) {
				usuario.full_name = data.full_name;
				usuario.email = data.email;
				usuario.password = data.password;
				usuario.dni = data.dni;
				usuario.date_of_birth = data.date_of_birth;
				return usuario;
			}
			return usuario;
		});
		model.write(usuarios);
	},
	trash: (id) => {
		let usuarios = model.list().sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
		model.write(usuarios.filter((usuario) => usuario.id != id));
	},
};

module.exports = model;
