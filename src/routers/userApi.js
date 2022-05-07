const router = require('express').Router();
const controller = require('../controllers/userApi');

router.route('/').get(controller.getAll);

router.route('/:id').get(controller.getUserByid);

module.exports = router;
