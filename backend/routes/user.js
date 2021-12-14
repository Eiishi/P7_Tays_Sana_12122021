const express = require("express");
const router = express.Router();

/*import du contrôleur*/
const userCtrl = require("../controllers/user");

/*routeurs : inscription, connexion, modification, suppression*/
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/profile/:id', userCtrl.updateAccount);
router.delete('/profile/:id', userCtrl.deleteAccount);

module.exports = router;