const express = require("express");
const router = express.Router();

/*import du middleware d'authentification et de multer configuré pour les photos*/
const auth = require("../middlewares/auth");

/*import du contrôleur*/
const userCtrl = require("../controllers/user");

/**routeurs :
 * inscription
 * connexion
 * modification
 * suppression
 * affichage d'un utilisateur
 */
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/profile/:userId', auth, userCtrl.updateAccount);
router.delete('/profile/:userId', auth, userCtrl.deleteAccount);
router.get('/profile/:userId', auth, userCtrl.getOneUser);

module.exports = router;