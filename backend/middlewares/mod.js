const jwt = require('jsonwebtoken');
const user = require('../../../../Projet 6/Piiquante/Web-Developer-P6/backend/models/user');

/*vérification que l'utilisateur est le propriétaire de l'objet à supprimer
OU qu'il est modérateur*/
module.exports = (req, res, next) => {
  try {
    if (req.body.userId !== gif(user_id) &&
        user(moderateur) == false) {
      throw '403: unauthorized request';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};