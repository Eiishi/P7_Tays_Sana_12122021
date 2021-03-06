/*imports*/
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/databaseConfig');

/* fonction d'inscription */

exports.signup = (req, res) => {
    try {

/* vérification de la sécurité du MDP
& des autres champs d'entrée*/
  
      function validatePassword(password) {
        return /\S{8,}/.test(password);
      }

      function validateName(string) {
        return /^[a-z\-\é\è\ë\ï]+( [a-z\é\è\ë\ï]+)*$/i.test(string);
      }

      function validateEmail(email) {
          return /\S+@\S+\.\S+/.test(email);
      }
  
      if (validatePassword(req.body.mot_de_passe) == false) {
        return res.status(400).json({ error: 'Niveau de sécurité du mot de passe trop faible.'});
      } else if (validateName(req.body.nom) == false) {
        return res.status(400).json({ error: 'Veuillez entrer un nom valide.'});
      } else if (validateName(req.body.prenom) == false) {
        return res.status(400).json({ error: 'Veuillez entrer un prénom valide.'});
      } else if (validateEmail(req.body.mail) == false) {
        return res.status(400).json({ error: 'Veuillez entrer une adresse mail valide.'});      
      } else {

/* hashage du MDP */

        bcrypt.hash(req.body.mot_de_passe, 10)
        .then(hash => {

/* insertion de l'utilisateur dans la DB
sans préciser de photo_url ;
la valeur par défaut est assignée */

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
        })
        .catch(() => res.status(500).json({ error: 'Une erreur côté serveur est survenue. Veuillez réessayer ultérieurement.' }));
    }
    } catch(err) {return res.status(500).json({ err })}
};

/* fonction de connexion */
 exports.login = (req, res, next) => {

/* vérification des champs d'entrée */
  
  function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  if (validateEmail(req.body.mail) == false) {
    return res.status(400).json({ error: 'Veuillez entrer une adresse mail valide.'});      
  } else {

/* recherche de l'utilisateur avec l'email dans la DB */

    db.db.query(`SELECT * FROM user WHERE mail = "${req.body.mail}"`, 
    function(err, result) {
      if (err) throw err;
      if (!result[0]) {
        return res.status(404).json({ error : "Adresse mail introuvable."})
      } else {
      
/* comparaison du MDP hashé avec celui de l'user trouvé */

        bcrypt.compare(req.body.mot_de_passe, result[0].mot_de_passe)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }

/* retour de l'userID et du token d'authentification */

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
      }
    });
  }
};

/* mettre à jour son profil */

exports.updateAccount = (req, res, next) => {

/* vérification des champs d'entrée */

  function validateName(string) {
    return /^[a-z\-\é\è\ë\ï]+( [a-z\é\è\ë\ï]+)*$/i.test(string);
  }

  function validateEmail(email) {
      return /\S+@\S+\.\S+/.test(email);
  }

  if (validateName(req.body.nom) == false) {
    return res.status(400).json({ error: 'Veuillez entrer un nom valide.'});
  } else if (validateName(req.body.prenom) == false) {
    return res.status(400).json({ error: 'Veuillez entrer un prénom valide.'});
  } else if (validateEmail(req.body.mail) == false) {
    return res.status(400).json({ error: 'Veuillez entrer une adresse mail valide.'});      
  } else {

/* mise à jour des champs */

    db.db.query(`UPDATE user SET nom = '${req.body.nom}', prenom = '${req.body.prenom}', mail = '${req.body.mail}' WHERE id = ${req.params.userId};`, 
    function(err, result) {
      if (err) throw err;
      return res.status(200).json({ 
        user: {
          nom: req.body.nom,
          prenom: req.body.prenom,
          mail: req.body.mail
        }
       })
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