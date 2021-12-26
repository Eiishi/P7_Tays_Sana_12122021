const db = require('../config/databaseConfig');

exports.getAllGifs = (req, res, next) => {
    let gifs = [];
    db.db.query("SELECT * FROM gif ORDER BY date;", 
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

exports.shareGif = (req, res, next) => {
    let date = new Date;
    if (req.file) {
        db.db.query(`INSERT INTO gif 
        (titre, url, user_id, date) VALUES 
        ("${req.body.titre}", "${req.protocol}://${req.get('host')}/gifs/${req.file.filename}, ${req.body.userId}", "${date.toLocaleString()}");`,
        function(err, result) {
            if (err) throw err;
            return res.status(200).json({ message: "successful !" })
        })  
    } else {
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

exports.deleteGif = (req, res, next) => {
    db.db.query(`DELETE FROM gif WHERE id = ${req.params.gifId}`, 
    function(err, result) {
        if (err) throw err;
        return res.status(200).json({ message: "successful !" })
    })  
}

exports.showComments = (req, res, next) => {
    db.db.query(`SELECT * FROM commentaire WHERE gif_id = ${req.params.gifId} ORDER BY date;`, 
    function(err, result) {
        if (err) throw err;
        return res.status(200).json({
            commentaires: result
        })
    })  
}

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

exports.deleteComment = (req, res, next) => {
    db.db.query(`DELETE FROM commentaire WHERE id = ${req.params.idComment}`, 
    function(err, result) {
        if (err) throw err;
        return res.status(200).json({ message: "successful !" })
    })  
}