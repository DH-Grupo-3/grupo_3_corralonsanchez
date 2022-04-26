const { Router } = require('express');
const router = Router();
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
const validateForm = require('../middlewares/validateFormMiddleware');
const validateLogin = require('../middlewares/validateLoginMiddleware');

router.get('/register', guestMiddleware, register);

router.get('/login', guestMiddleware, login);

router.post('/login', validateLogin, loginProcess);

router.get('/profile', authMiddleware, profile);

router.post('/register', validateForm, create);

router.get('/edit/:id', editar);

router.post('/edit/:id', validateForm, update);

router.get('/logout', logout);

module.exports = router;

