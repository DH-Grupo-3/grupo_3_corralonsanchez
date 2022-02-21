const path = require('path');
const multer = require('multer');

const storage = (folder) =>
	multer.diskStorage({
		storage: {
			destination: (req, file, cb) => cb(null, path.resolve(__dirname, '../../uploads', folder)),
			filename: (req, file, cb) =>
				cb(null, file.filedname + '-' + Date.now() + path.extname(file.filedname)),
		},
	});

module.exports = storage;
