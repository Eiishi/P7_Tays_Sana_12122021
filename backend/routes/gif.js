/*imports*/
const express = require("express");
const router = express.Router();

/*import du middleware d'authentification et de multer configuré*/
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

/*import contrôleur*/
const gifCtrl = require("../controllers/gif");

/** routeurs :
 * affichage de tous les gifs
 * affichage d'un seul gif
 * partage d'un gif
 * suppression d'un gif
 * affichage de tous les commentaires d'un gif
 * ajout d'un commentaire
 * suppression d'un commentaire
 */
router.get('/', auth, gifCtrl.getAllGifs);
router.get('/:id', auth, gifCtrl.getOneGif);
router.post('/', auth, multer, gifCtrl.shareGif);
router.delete('/:id', auth, gifCtrl.deleteGif);
router.get('/:id/comments', auth, gifCtrl.showComments);
router.post('/:id/comments', auth, gifCtrl.addComment);
router.delete('/:id/comments/:idComment', auth, gifCtrl.deleteComment);

module.exports = router;