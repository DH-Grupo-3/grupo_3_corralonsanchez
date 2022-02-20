const router = require('express').Router();
const { show, index, create } = require('../controllers/user');

router.route('/list').get(index);

router.route('/register').get(create);

router.route('/:id').get(show);

module.exports = router;
