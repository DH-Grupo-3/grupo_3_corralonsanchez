const router = require('express').Router();
const controller = require('../controllers/baseController');
const multer = require('multer');
const folder = require('../middlewares/storage');
const upload = multer({ storage: folder('products') });

router.route('/').get(controller.getIndex);

router.route('/login').get(controller.login);

router.route('/register').get(controller.register);

router.route('/productdetail').get(controller.productDetail).post(controller.storage);

router.route('/productcart').get(controller.productCart);

router.route('/productform').get(controller.productForm);

router.route('/productedit').get(controller.productEdit);

router
	.route('/productList')
	.get(controller.productList)
	// .post(controller.storage)
	.put(controller.modify)
	.delete(controller.trash);

router.route('/productedit/:id').get(controller.update);

module.exports = router;
