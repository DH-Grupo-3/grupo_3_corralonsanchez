const { Router } = require('express');
const router = Router();
const { body } = require('express-validator');
const {
	show,
	index,
	create,
	userStorage,
	login,
	processLogin,
} = require('../controllers/userController');

// Validaciones
const validateForm = [
	body('full_name').notEmpty().withMessage('Debes introducir tú nombre completo'),
	body('email').notEmpty().isEmail().withMessage('Debes introducir un email válido'),
	body('password').notEmpty().withMessage('Debes introducir una contraseña válida'),
	body('dni').notEmpty().withMessage('Debes introducir DNI'),
	body('date_of_birth').notEmpty().withMessage('Debes introducir fecha de nacimiento'),
];

router.get('/list', index);

router.get('/register', create);

router.get('/login', login);

router.post('/login', [], login);

router.post('/register', validateForm, userStorage), router.get('/:id', show);

module.exports = router;
