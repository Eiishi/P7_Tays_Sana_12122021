/* configuration de la base de données */

const mysql = require('mysql2');
require('dotenv').config();

config = {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
}

exports.db = mysql.createConnection (config);

exports.db.connect (function(err) {
    if (err) throw err;
    console.log("Connexion à MySQL réussie !");
});
