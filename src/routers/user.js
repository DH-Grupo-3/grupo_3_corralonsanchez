const { Router } = require('express');
const router = Router();
const { body } = require('express-validator');
const {
	register,
	create,
	login,
	loginProcess,
	profile,
	logout,
	editar,
	update,
} = require('../controllers/user');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// Validaciones
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

router.get('/register', guestMiddleware, register);

router.get('/login', guestMiddleware, login);

router.post('/login', loginProcess);

router.get('/profile', authMiddleware, profile);

router.post('/register', validateForm, create);

router.get('/edit/:id', editar);

router.post('/edit/:id', validateForm, update);

router.get('/logout', logout);

module.exports = router;

