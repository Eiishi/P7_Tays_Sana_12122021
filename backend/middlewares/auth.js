const jwt = require('jsonwebtoken');

/*vérification du token d'authentification et de l'userId pour permettre ou non les requêtes*/
module.exports = (req, res, next) => {
  try {
    const token = JSON.parse(req.headers.authorization.split(' ')[0]);
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== JSON.stringify(userId)) {
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