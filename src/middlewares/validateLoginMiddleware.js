const { body } = require('express-validator');

const validateLogin = [
	body('email')
		.notEmpty()
		.withMessage('Debes ingresar un email')
		.bail()
		.isEmail()
		.withMessage('Debes ingresar un email válido'),
	body('password')
		.notEmpty()
		.withMessage('Debes ingresar una contraseña')
		.bail(),
];
module.exports = validateLogin;
