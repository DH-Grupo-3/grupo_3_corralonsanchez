const path = require('path');
const multer = require('multer');

const storage = (folder) =>
	multer.diskStorage({
		destination: (req, file, cb) => cb(null, path.resolve(__dirname, '../../uploads', folder)),
		filename: (req, file, cb) => cb(null, file.originalname),
	});

module.exports = storage;
