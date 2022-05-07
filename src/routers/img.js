const router = require('express').Router();
const controller = require('../controllers/sendImg');
router.route('/?').get(controller.sendImg);

module.exports = router;
