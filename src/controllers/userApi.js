const { user } = require('../database/models');

const controller = {
	getAll: async (req, res) => {
		try {
			let users = await user.findAll();

			if (!users) {
				res
					.status(404)
					.json({ error: true, message: 'no se encontraron usuarios en la base de datos.' });
			}

			users = users.map((user) => {
				user.dataValues.detail = `/api/users/${user.id}`;
				return user;
			});

			res.status(200).json({
				count: users.length,
				users: users,
			});
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},

	getUserByid: async (req, res) => {
		try {
			let userById = await user.findByPk(req.params.id);

			if (!userById) {
				res
					.status(404)
					.json({ error: true, message: 'no se encontraron usuarios en la base de datos.' });
			}

			delete userById.dataValues.password;
			delete userById.dataValues.isAdmin;
			delete userById.dataValues.dni;

			res.status(200).json(userById);
		} catch (error) {
			res.status(500).send({ message: error.stack });
		}
	},
};

module.exports = controller;
