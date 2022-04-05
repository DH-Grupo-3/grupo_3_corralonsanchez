const { validationResult } = require('express-validator');
const { match, list, generate, create, update, trash, filter } = require('../models/user');
const bcrypt = require('bcrypt');
const db = require('../database/models');
const controller = {
	index: (req, res) => {
		const { search } = req.query;

		return search
			? res.render('user/userList', {
					title: 'Search |' + search,
					users: filter('full_name', search),
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
	register: (req, res) => res.render('register', { title: 'Register' }),
	// .cookie('testing','mensaje',{masAge:1000*30),

	processRegister: async (req, res) => {
		let errores = validationResult(req);
		if (!errores.isEmpty()) {
			return res.render('register', {
				errores: errores.mapped(),

				old: req.body,
			});
		}
		const listaUsuarios = await db.user.findAll();
		const match = async (propiedad, valor) =>
			await listaUsuarios.find((user) => user[propiedad] == valor);
		const userInDb = await match('email', req.body.email);

		if (userInDb) {
			return res.render('register', {
				errores: {
					email: {
						msg: 'Este email ya está registrado',
					},
				},
				old: req.body,
			});
		}
		const generate = (data) =>
			Object({
				fullName: data.full_name,
				email: data.email,
				address: data.address,
				cel: data.cel,
				password: data.password,
				dni: data.dni,
				dayOfBirth: data.date_of_birth,
				isAdmin: 0,
			});
		const saltos = 10;
		req.body.files = req.files;
		req.body.password = bcrypt.hashSync(req.body.password, saltos);
		const newUser = await generate(req.body);
		db.user.create(newUser);
		return res.redirect('/users/login');
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
	loginProcess: (req, res) => {
		let userToLogin = match('email', req.body.email);
		if (userToLogin) {
			let passwordOk = bcrypt.compareSync(req.body.password, userToLogin.password);
			if (passwordOk) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if (req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60 * 2 });
				}

				return res.redirect('/users/profile');
			}
			return res.render('login', {
				errores: {
					email: {
						msg: 'Las credenciales son inválidas',
					},
				},
			});
		}

		return res.render('login', {
			errores: {
				email: {
					msg: 'Credenciales inválidas',
				},
			},
		});
	},
	profile: (req, res) => {
		console.log(req.cookies.userEmail);
		return res.render('user/profile', {
			user: req.session.userLogged,
		});
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},
};

module.exports = controller;

