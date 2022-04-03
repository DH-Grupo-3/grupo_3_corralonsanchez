const { Router } = require('express');
const router = Router();
const {
	show,
	index,
	register,
	processRegister,
	login,
	loginProcess,
	profile,
	logout,
} = require('../controllers/user');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const validateForm = require('../middlewares/validateFormMiddleware');

router.get('/list', index);

router.get('/register', guestMiddleware, register);

router.get('/login', guestMiddleware, login);

router.post('/login', loginProcess);

router.get('/profile', authMiddleware, profile);

router.post('/register', validateForm, processRegister);

router.get('/logout', logout);

router.get('/:id', show);

module.exports = router;
