const multer = require('multer');

const MIME_TYPE = {
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'image/png': 'png',
};

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, files, cb) => {
    const mime = MIME_TYPE[files.mimetype];
    if (!mime) return cb(null, false);
    cb(null, true);
  },
});
