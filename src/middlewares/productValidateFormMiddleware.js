const { body } = require('express-validator');

const validateForm = [
	body('product_name')
		.notEmpty()
		.withMessage('Debes introducir un nombre para el producto.')
		.bail(),
	body('product_price')
		.notEmpty()
		.withMessage('Debes introducir un precio para el producto.')
		.bail(),
	body('category').notEmpty().withMessage('Selecciona una categoria.').bail(),
	body('product_stock').notEmpty().withMessage('Debes introducir el stock discponible.').bail(),
	body('ofer').notEmpty().withMessage('Selecciona si esta en oferta.').bail(),
];

module.exports = validateForm;
