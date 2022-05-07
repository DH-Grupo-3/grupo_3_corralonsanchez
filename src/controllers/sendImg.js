const path = require('path');
const fs = require('fs');

exports.sendImg = (req, res) => {
	if (fs.existsSync(path.resolve(__dirname, `../../uploads/products/${req.query.img}`)))
		res.status(200).sendFile(path.resolve(__dirname, `../../uploads/products/${req.query.img}`));
	else res.status(404).sendFile(path.resolve(__dirname, `../../uploads/products/notimage.png`));
};
