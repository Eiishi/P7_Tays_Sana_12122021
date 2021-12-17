/*imports*/
const express = require("express");
const router = express.Router();

/*import du middleware d'authentification et de multer configuré pour les gifs*/
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config-gif");

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
router.get('/:gifId', auth, gifCtrl.getOneGif);
router.post('/', auth, multer, gifCtrl.shareGif);
router.delete('/:gifId', auth, gifCtrl.deleteGif);
router.get('/:gifId/comments', auth, gifCtrl.showComments);
router.post('/:gifId/comments', auth, gifCtrl.addComment);
router.delete('/:gifId/comments/:idComment', auth, gifCtrl.deleteComment);

module.exports = router;