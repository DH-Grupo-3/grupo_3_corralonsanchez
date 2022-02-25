const router = require('express').Router();
const controller = require('../controllers/baseController');
const multer = require('multer');
const folder = require('../middlewares/storage');
const upload = multer({ storage: folder('products') });

router.route('/products').get().post();
router.route('/products/create');
router.route('/products/:id').get().put().delete();
router.route('/products/:id/edit').get();

module.exports = router;
