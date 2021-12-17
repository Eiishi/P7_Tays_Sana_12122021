const multer = require('multer');

/*conversion des mime types en extensions*/
const MIME_TYPES = {
    'image/gif': 'gif'
};

/*fonction de stockage dans le dossier images avec renommage du fichier*/
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'gifs');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('gif');