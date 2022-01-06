const router = require('express').Router();
const controller = require('../controllers/baseController');

router.route('/').get(controller.getIndex);

module.exports = router;
