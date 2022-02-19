const router = require('express').Router();
const controller = require('../controllers/baseController');

router.route('/').get(controller.getIndex);

router.route('/login').get(controller.login);

router.route('/register').get(controller.register);

router.route('/productdetail').get(controller.productDetail);

router.route('/productcart').get(controller.productCart);

router.route('/productform').get(controller.productForm);
    
router.route('/productedit').get(controller.productEdit);

router.route('/productList')
    .get(controller.productList)
    .post(controller.storage)
    .put(controller.modify);

router.route('/productedit/:id').get(controller.update);
    
module.exports = router;
