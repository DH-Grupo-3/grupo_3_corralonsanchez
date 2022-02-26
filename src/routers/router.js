const router = require('express').Router();
const controller = require('../controllers/baseController');
const multer = require('multer');
const folder = require('../middlewares/storage');
const upload = multer({ storage: folder('products') });

router.route('/').get(controller.getIndex);

router.route('/login').get(controller.login);

router.route('/register').get(controller.register);

module.exports = router;
