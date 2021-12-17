/* REQUÊTES */
/* ------------------------------------- */
/* AUTH */
/* ------------------------------------- */

/* INSCRIPTION */
let nom = document.getElementById("nom");
let prenom = document.getElementById("prenom");
let mail = document.getElementById("mail");
let mot_de_passe = document.getElementById("mot_de_passe");

fetch("http://localhost:3000/api/auth/signup", {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ nom, prenom, mail, mot_de_passe })
    // voir comment envoyer un req.file
})
.then(res => res.json())
.then(res => console.log(res))
.catch()

/* CONNEXION */

fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ mail, mot_de_passe })
})
.then(res => res.json())
.then()
.catch()

/* MàJ PROFIL */

fetch("http://localhost:3000/api/auth/profile/" + userId, {
    method: "PUT",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ modified })
    // let modified = "col = value, col = value"
})
.then(res => res.json())
.then()
.catch()

/* SUPPRIMER PROFIL */

fetch("http://localhost:3000/api/auth/profile/" + userId, {
    method: "DELETE",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
})
.then(res => res.json())
.then()
.catch()


/* GIFS */
/* ------------------------------------- */

/* AFFICHER LES GIFS */

fetch("http://localhost:3000/api/gifs/")
.then(res => res.json())
.then()
.catch()

/* AFFICHER UN GIF */

fetch("http://localhost:3000/api/gifs/" + gifId)
.then(res => res.json())
.then()
.catch()

/* POSTER UN GIF */

fetch("http://localhost:3000/api/gifs/", {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ titre, userId })
    // voir comment envoyer un req.file
})
.then(res => res.json())
.then()
.catch()

/* SUPPRIMER GIF */

fetch("http://localhost:3000/api/gifs/" + gifId, {
    method: "DELETE",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
})
.then(res => res.json())
.then()
.catch()

/* AFFICHER LES COMMENTAIRES */

fetch("http://localhost:3000/api/gifs/" + gifId + "/comments")
.then(res => res.json())
.then()
.catch()

/* POSTER UN COMMENTAIRE */

fetch("http://localhost:3000/api/gifs/" + gifId + "/comments", {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ contenu, userId })
})
.then(res => res.json())
.then()
.catch()

/* SUPPRIMER COMMENTAIRE */

fetch("http://localhost:3000/api/gifs/" + gifId + "/comments/" + idComment, {
    method: "DELETE",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
})
.then(res => res.json())
.then()
.catch()
