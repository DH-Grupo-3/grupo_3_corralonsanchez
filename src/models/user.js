const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const model = {
	file: resolve(__dirname, '../data', 'users.json'),
	read: () => readFileSync(model.file),
	convert: (data) => JSON.stringify(data, null, 2),
	write: (data) => writeFileSync(model.file, model.convert(data)),
	list: () => JSON.parse(model.read()).sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)),
	match: (propiedad, valor) => model.list().find((usuario) => usuario[propiedad] == valor),
	generate: (data) =>
		Object({
			id:
				model.list().length > 0
					? model
							.list()

							.pop().id + 1
					: 1,
			fullName: data.full_name,
			email: data.email,
			password: data.password,
			dni: Number(data.dni),
			birth: data.date_of_birth,
		}),
	create: (data) => {
		let lista = model.list();
		lista.push(data);
		model.write(lista);
	},
	update: (data) => {
		let usuarios = model.list();
		usuarios = usuarios.map((usuario) => {
			if (usuario.id == data.id) {
				usuario.fullName = data.fullName;
				usuario.email = data.email;
				usuario.password = data.password;
				usuario.dni = data.dni;
				usuario.birth = data.birth;
				return usuario;
			}
			return usuario;
		});
		model.write(usuarios);
	},
	trash: (id) => {
		let usuarios = model.list();
		model.write(usuarios.filter((usuario) => usuario.id != id));
	},
};

module.exports = model;
