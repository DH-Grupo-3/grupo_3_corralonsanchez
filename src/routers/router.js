const router = require('express').Router();
const controller = require('../controllers/baseController');

router.route('/').get(controller.getIndex);

router.route('/login').get(controller.login);

router.route('/register').get(controller.register);

router.route('/productdetail').get(controller.productDetail);

router.route('/productcart').get(controller.productCart);

module.exports = router;
