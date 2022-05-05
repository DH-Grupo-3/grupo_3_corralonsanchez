const router = require('express').Router();
const controller = require('../controllers/product');
const multer = require('multer');
const storage = require('../middlewares/storage');
const upload = multer({ storage: storage('products') });
const validateForm = require('../middlewares/productValidateFormMiddleware');

router
	.route('/')
	.get(controller.getAll)
	.post(upload.any(), validateForm, controller.storageProduct);
router.route('/create').get(controller.getCreateForm);
router.route('/:id/edit').get(controller.editProduct);
router
	.route('/:id')
	.get(controller.getProductByid)
	.put(upload.any(), validateForm, controller.updateProduct)
	.delete(controller.deleteProduct);

module.exports = router;
