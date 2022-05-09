const router = require('express').Router();
const controller = require('../controllers/productApi');

router.route('/').get(controller.getAll);

router.route('/:id').get(controller.getProductByid);

module.exports = router;
