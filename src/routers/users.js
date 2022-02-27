const router = require('express').Router();
const { show, index, create, storage } = require('../controllers/user');

router.route('/list').get(index);

router.route('/register').get(create);

router.route('/register').post(storage);

router.route('/:id').get(show);

module.exports = router;
