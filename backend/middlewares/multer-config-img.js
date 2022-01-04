const multer = require('multer');

/*conversion des mime types en extensions*/
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'  
};

/*fonction de stockage dans le dossier images avec renommage du fichier*/
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'photos');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('photo');