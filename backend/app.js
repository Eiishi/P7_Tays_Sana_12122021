/*imports*/
const express = require('express');
const userRoutes = require('./routes/user');
const gifRoutes = require('./routes/gif');

const app = express();

/*application des headers à la réponse pour accepter des requêtes de toutes les origines*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

/*module express pour pouvoir lire les requêtes (remplace body-parser)*/
app.use(express.json());

/*utilisation des routes*/
app.use("/api/auth", userRoutes);
app.use("/api/gifs", gifRoutes);

module.exports = app;