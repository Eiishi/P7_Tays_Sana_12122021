exports.getAllGifs = (req, res, next) => {
    db.query("SELECT * FROM gif ORDER BY date;", 
        function(err, result) {
            if (err) throw err;
            return res.status(200).json({ message: "successful !" })
        })
}

exports.getOneGif = (req, res, next) => {
    db.query(`SELECT * FROM gif WHERE id = ${req.params.gifId}`,
        function(err, result) {
            if (err) throw err;
            return res.status(200).json({ message: "successful !" })
        })
}

exports.shareGif = (req, res, next) => {
    let date = new Date;
    db.query(`INSERT INTO gif 
    (titre, url, user_id, date) VALUES 
    (${req.body.titre}, ${req.protocol}://${req.get('host')}/gifs/${req.file.filename}, ${req.body.userId}, ${date.toLocaleString()});`,
    function(err, result) {
        if (err) throw err;
        return res.status(200).json({ message: "successful !" })
    })  
}

exports.deleteGif = (req, res, next) => {
    db.query(`DELETE FROM gif WHERE id = ${req.params.gifId}`, 
    function(err, result) {
        if (err) throw err;
        return res.status(200).json({ message: "successful !" })
    })  
}

exports.showComments = (req, res, next) => {
    db.query(`SELECT * FROM commentaire WHERE gif_id = ${req.params.gifId} ORDER BY date;`, 
    function(err, result) {
        if (err) throw err;
        return res.status(200).json({ message: "successful !" })
    })  
}

exports.addComment = (req, res, next) => {
    let date = new Date;
    db.query(`INSERT INTO commentaire VALUES 
    (${req.body.contenu}, ${date.toLocaleString()}, ${req.body.userId}, ${req.params.gifId});`,
    function(err, result) {
        if (err) throw err;
        return res.status(200).json({ message: "successful !" })
    })  
}

exports.deleteComment = (req, res, next) => {
    db.query(`DELETE FROM commentaire WHERE id = ${req.params.idComment}`, 
    function(err, result) {
        if (err) throw err;
        return res.status(200).json({ message: "successful !" })
    })  
}