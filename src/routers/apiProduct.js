const router = require('express').Router();
const controller = require('../controllers/apiProduct');

router.route('/').get(controller.getAll);

router.route('/:id').get(controller.getProductByid);

module.exports = router;
