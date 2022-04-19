const { body } = require('express-validator');

const validateForm = [
	body('full_name').notEmpty().withMessage('Debes introducir tú nombre completo'),
	body('address').notEmpty().withMessage('Debes introducir una dirección'),
	body('cel').notEmpty().withMessage('Debes introducir un teléfono'),
	body('email')
		.notEmpty()
		.withMessage('Debes introducir un email válido')
		.bail()
		.isEmail()
		.withMessage('Debes introducir un email válido'),
	body('password')
		.notEmpty()
		.withMessage('Debes introducir una contraseña válida')
		.bail()
		.isLength({ min: 8 })
		.withMessage('La contraseña debe tener mínimo 8 caracteres'),
	body('dni').notEmpty().withMessage('Debes introducir DNI'),
	body('date_of_birth').notEmpty().withMessage('Debes introducir fecha de nacimiento'),
	body('password2').custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('Las contraseñas no coinciden');
		}
		return true;
	}),
];
module.exports = validateForm;
