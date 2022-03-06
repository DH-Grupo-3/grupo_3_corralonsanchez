const { Router } = require('express');
const router = Router();
const { body } = require('express-validator');
const {
	show,
	index,
	register,
	processRegister,
	login,
	loginProcess,
} = require('../controllers/user');

// Validaciones
const validateForm = [
	body('full_name').notEmpty().withMessage('Debes introducir tú nombre completo'),
	body('email').notEmpty().withMessage('Debes introducir un email válido').bail()
				 .isEmail().withMessage('Debes introducir un email válido'),
	body('password').notEmpty().withMessage('Debes introducir una contraseña válida'),
	body('dni').notEmpty().withMessage('Debes introducir DNI'),
	body('date_of_birth').notEmpty().withMessage('Debes introducir fecha de nacimiento'),
	body('password2').custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('Las contraseñas no coinciden');
		}
		return true;
	}),
];

router.get('/list', index);

router.get('/register', register);

router.get('/login', login);

router.post('/login', loginProcess);

router.post('/register', validateForm, processRegister);

router.get('/:id', show);

module.exports = router;