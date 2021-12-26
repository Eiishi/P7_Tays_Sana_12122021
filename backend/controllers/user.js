/*imports*/
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/databaseConfig');

/**fonction d'inscription
 * vérification de la sécurité du MDP
 * hashage du MDP
 * insertion du nouvel utilisateur dans la DB
 */

exports.signup = (req, res) => {
    try {
  
      function validatePassword(password) {
        return /\S{8,}/.test(password);
      }
  
      if (validatePassword(req.body.mot_de_passe) == false) {
        return res.status(400).json({ message: 'Niveau de sécurité du mot de passe trop faible.'});
      } else {
        bcrypt.hash(req.body.mot_de_passe, 10)
        .then(hash => {
          if (req.file) {
            db.db.query(`INSERT INTO user 
            (nom, prenom, mail, mot_de_passe, photo_url) VALUES 
            ('${req.body.nom}', 
            '${req.body.prenom}', 
            '${req.body.mail}', 
            '${hash}', 
            '${req.protocol}://${req.get('host')}/photos/${req.file.filename}');`, 
            function(err, result) {
                if (err) throw err;
                return res.status(201).json({
                  userId: result.id,
                  token: jwt.sign(
                    { userId: result.id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                    )
                  })
                })
          } else {
            db.db.query(`INSERT INTO user 
            (nom, prenom, mail, mot_de_passe) VALUES 
            ('${req.body.nom}', 
            '${req.body.prenom}', 
            '${req.body.mail}', 
            '${hash}');`, 
            function(err, result) {
              if (err) throw err;
              return res.status(201).json({
                userId: result.insertId,
                token: jwt.sign(
                  { userId: result.insertId },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '24h' }
                  )
              })
            })
          }
        })
        .catch(() => res.status(500).json({ message: 'Une erreur côté serveur est survenue. Veuillez réessayer ultérieurement.' }));
    }
    } catch(err) {return res.status(500).json({error: err.message})}
};

/**fonction de connexion
 * recherche de l'utilisateur avec l'email dans la DB
 * comparaison du MDP hashé avec celui de l'user trouvé
 * retour de l'userID et du token d'authentification
 */
 exports.login = (req, res, next) => {

  db.db.query(`SELECT * FROM user WHERE mail = "${req.body.mail}"`, 
  function(err, result) {
    if (err) throw err;
    bcrypt.compare(req.body.mot_de_passe, result[0].mot_de_passe)
    .then(valid => {
      if (!valid) {
        return res.status(401).json({ error: 'Mot de passe incorrect !' });
      }
      return res.status(200).json({
        userId: result[0].id,
        token: jwt.sign(
          { userId: result[0].id },
          'RANDOM_TOKEN_SECRET',
          { expiresIn: '24h' }
          )
      })
    })
    .catch(error => res.status(500).json({ error }));
  });
};

/* mettre à jour son profil */

exports.updateAccount = (req, res, next) => {

  function validatePassword(password) {
    return /\S{8,}/.test(password);
  }

  if (validatePassword(req.body.mot_de_passe) == false) {
    return res.status(400).json({ message: 'Niveau de sécurité du mot de passe trop faible.'});
  } else {
    console.log(req.body.mot_de_passe);
    bcrypt.hash(req.body.mot_de_passe, 10)
    .then(hash => {
      if (req.file) {
        console.log("cas un");
        db.db.query(`UPDATE user SET (${req.body.modified}, mot_de_passe = ${hash}, photo_url = ${req.protocol}://${req.get('host')}/photos/${req.file.filename}) WHERE id = ${req.params.userId};`, 
        function(err, result) {
          if (err) throw err;
          return res.status(200).json({ message: "successful !" })
      })
      } else {
        console.log("k2");
        db.db.query(`UPDATE user SET (${req.body.modified}, mot_de_passe = ${hash}) WHERE id = ${req.params.userId};`, 
        function(err, result) {
          if (err) throw err;
          return res.status(200).json({ message: "successful !" })
      })
      }
    })
  }
};

/* supprimer son profil */

exports.deleteAccount = (req, res, next) => {
  db.db.query(`DELETE FROM user WHERE id = ${req.params.userId}`, 
  function(err, result) {
    if (err) throw err;
    return res.status(200).json({ message: "successful !" })
  })
}

/* afficher les utilisateurs */

// exports.getAllUsers = (req, res, next) => {
//   db.db.query("SELECT * FROM user",
//   function(err, result) {
//     if (err) throw err;
//     return res.status(200).json({ message: "successful !" })
//   })
// }

/* afficher un utilisateur */

exports.getOneUser = (req, res, next) => {
  db.db.query(`SELECT * FROM user WHERE id = ${req.params.userId}`,
  function(err, result) {
    if (err) throw err;
    return res.status(200).json({
      user: result[0]
    })
  })
}