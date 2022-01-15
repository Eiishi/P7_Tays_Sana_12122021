const db = require('../config/databaseConfig');

/* fonction pour afficher tous les gifs :
initialisation d'un tableau gifs qui se remplit avec les éléments de la base de données
avant d'être renvoyé */

exports.getAllGifs = (req, res, next) => {
    let gifs = [];
    db.db.query("SELECT * FROM gif ORDER BY date DESC;", 
        function(err, result) {
            for (let i = 0; i < result.length; i++) {
                gifs.push(result[i])
            }
            if (err) throw err;
            return res.status(200).json({
                gifs: gifs
            })
        })
}

/* fonction pour ajouter un gif :
vérification des champs d'entrée */

exports.shareGif = (req, res, next) => {

    function validateName(string) {
        /*eslint-disable-next-line*/
        return /^[a-z0-9\-\é\è\ë\ï]+( [a-z0-9\é\è\ë\ï]+)*$/i.test(string);
    }

    function validateUrl(string) {
        /*eslint-disable-next-line*/
        return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)(.gif)$/i.test(string);
    }

    let date = new Date;

    if (validateName(req.body.titre) == false || req.body.titre == "") {
        return res.status(400).json({ error: "Veuillez entrer un titre valide."})
    } else if (validateUrl(req.body.url) == false || req.body.url == "") {
        return res.status(400).json({ error: "Veuillez entrer un titre valide."})
    } else {

/* disjonction des cas selon envoi d'un fichier ou d'une URL */
/* si fichier :
récupération du filename paramétré par multer
et insertion dans l'url du gif
puis renvoi du gif ajouté */
        
        if (req.file) {
            db.db.query(`INSERT INTO gif 
            (titre, url, user_id, date) VALUES 
            ("${req.body.titre}", "${req.protocol}://${req.get('host')}/gifs/${req.file.filename}, ${req.body.userId}", "${date.toLocaleString()}");`,
            function(err, result) {
                if (err) throw err;
                return res.status(200).json({
                    gif: {
                        id: result.insertId,
                        titre: req.body.titre,
                        url: req.get('host') + "/gifs/" + req.file.filename,
                        userId: req.body.userId,
                        date: date.toLocaleString()
                    }
                }) 
            }) 
            
        } else {
/* si envoi d'url :
simple remplissage du champ url par l'url du gif */

            db.db.query(`INSERT INTO gif 
            (titre, url, user_id, date) VALUES 
            ("${req.body.titre}", "${req.body.url}", "${req.body.userId}", "${date.toLocaleString()}");`,
            function(err, result) {
                if (err) throw err;
                return res.status(200).json({
                    gif: {
                        id: result.insertId,
                        titre: req.body.titre,
                        url: req.body.url,
                        userId: req.body.userId,
                        date: date.toLocaleString()
                    }
                })
            })
        }
    }
}

/* fonction pour supprimer un gif */

exports.deleteGif = (req, res, next) => {
    db.db.query(`DELETE FROM gif WHERE id = ${req.params.gifId}`, 
    function(err, result) {
        if (err) throw err;
        return res.status(200).json({ message: "successful !" })
    })  
}

/* fonction pour afficher tous les commentaires d'un gif */

exports.showComments = (req, res, next) => {
    db.db.query(`SELECT * FROM commentaire WHERE gif_id = ${req.params.gifId} ORDER BY date;`, 
    function(err, result) {
        if (err) throw err;
        return res.status(200).json({
            commentaires: result
        })
    })  
}

/* fonction pour ajouter un commentaire
et renvoi de celui-ci */

exports.addComment = (req, res, next) => {
    let date = new Date;
    db.db.query(`INSERT INTO commentaire (contenu, date, user_id, gif_id) VALUES 
    ("${req.body.contenu}", "${date.toLocaleString()}", "${req.body.userId}", "${req.params.gifId}");`,
    function(err, result) {
        if (err) throw err;
        return res.status(200).json({
            commentaire: {
                id: result.insertId,
                contenu: req.body.contenu,
                date: date.toLocaleString(),
                user_id: req.body.userId,
                gif_id: req.params.gifId
            }
        })
    })  
}

/* fonction pour supprimer un commentaire */

exports.deleteComment = (req, res, next) => {
    db.db.query(`DELETE FROM commentaire WHERE id = ${req.params.idComment}`, 
    function(err, result) {
        if (err) throw err;
        return res.status(200).json({ message: "successful !" })
    })  
}