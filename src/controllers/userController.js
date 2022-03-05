const { validationResult } = require('express-validator');
const { match, list, generate, create, update, trash, filter } = require('../models/user');

const controller = {
	index: (req, res) => {
		const { search } = req.query;

		return search
			? res.render('user/userList', {
					title: 'Search |' + search,
					productos: filter('name', search),
			  })
			: res.render('user/userlist', { title: 'Users List', users: list() });
	},
	show: (req, res) => {
		const { id } = req.params;
		let user = id ? match('id', id) : null;
		return user
			? res.render('user/userShow', {
					title: 'User',
					user: user,
			  })
			: res.render('error', {
					title: 'Error',
					error: 'No se encontró ningún usuario',
			  });
	},
	create: (req, res) => res.render('register', { title: 'Register' }),
	userStorage: (req, res) => {
		let errores = validationResult(req);
		if (!errores.isEmpty() && req.body.password !== req.body.password2) {
			return res.render('register', {
				errores: errores.array(),

				old: req.body,
			});
		}
		req.body.files = req.files;

		const nuevo = generate(req.body);
		create(nuevo);
		return res.redirect('/users/' + nuevo.id);
	},
	update: (req, res) => {
		const { id } = req.params;
		let producto = id ? match('id', id) : null;
		return producto
			? res.render('product/update', {
					title: 'Actualizando',
					producto: producto,
			  })
			: res.render('error', {
					title: 'Error',
					error: 'No se encontró ningún producto',
			  });
	},
	modify: (req, res) => {
		req.body.files = req.files;
		update(req.body);
		return res.redirect('/productos/' + req.body.id);
	},
	remove: (req, res) => {
		trash(req.body.id);
		return res.redirect('/productos');
	},
	login: (req, res) => {
		return res.render('login');
	},
};
module.exports = controller;
