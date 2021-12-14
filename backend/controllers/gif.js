const { db } = require("../../../../Projet 6/Piiquante/Web-Developer-P6/backend/models/user");

exports.getAllGifs = (req, res, next) => {
    db.query("SELECT * FROM gif;", 
        function(err, result) {
            if (err) throw err;
            return res.status(200).json({ message: "successful !" })
        })
}

exports.getOneGif = (req, res, next) => {
    db.query(`SELECT * FROM gif WHERE id = ${req.params.id}`,
        function(err, result) {
            if (err) throw err;
            return res.status(200).json({ message: "successful !" })
        })
}

exports.shareGif = (req, res, next) => {
    db.query(`INSERT INTO gif 
    (titre, url, user_id) VALUES 
    (${req.body.titre}, ${req.protocol}://${req.get('host')}/gifs/${req.file.filename}, ${req.body.user(id)});`,
    function(err, result) {
        if (err) throw err;
        return res.status(200).json({ message: "successful !" })
    })  
}

exports.deleteGif = (req, res, next) => {
    db.query(`DELETE FROM gif WHERE id = ${req.params.id}`, 
    function(err, result) {
        if (err) throw err;
        return res.status(200).json({ message: "successful !" })
    })  
}

exports.showComments = (req, res, next) => {
    db.query(`SELECT * FROM commentaire WHERE gif_id = ${req.params.id};`, 
    function(err, result) {
        if (err) throw err;
        return res.status(200).json({ message: "successful !" })
    })  
}

exports.addComment = (req, res, next) => {
    db.query(`INSERT INTO commentaire VALUES 
    (${req.body.contenu}, ${Date.now()}, ${req.body.user(id)}, ${req.params.id});`,
    function(err, result) {
        if (err) throw err;
        return res.status(200).json({ message: "successful !" })
    })  
}

exports.deleteComment = (req, res, next) => {
    db.query(`DELETE FROM commentaire WHERE id = ${req.params.id}`, 
    function(err, result) {
        if (err) throw err;
        return res.status(200).json({ message: "successful !" })
    })  
}