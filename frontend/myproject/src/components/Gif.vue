<template>
    <div v-for="gif in gifs" :key="gif.id">
        <div>
            <img id="profile">
            <p>{{ gifUser.nom }} {{ gifUser.prenom }}</p>
            <p>{{ gif.date }}</p>
            <img id="gif">
            <p id="supprimer" @click="deleteGif">Supprimer</p>
        </div>
        <p @click="showComments">Commentaires</p>
        <div id="container"></div>
        <p @click="addComment" id="addComment">Ajouter un commentaire</p>
        <div id="commentBox"></div>
    </div>
</template>

<script>
export default {
    name: "Gif",
    data() {
        return {
            gifs: [],
            comments: [],
            gifUser: [],
            users: []
        }
    },
    mounted() {

/* requêtes pour récupérer chaque gif et l'utilisateur associé
dans les objets gif et gifUser */
        fetch("http://localhost:3000/api/gifs/")
        .then(res => res.json())
        .then(data => {
            this.gifs = data;
            for (let i = 0; i < this.gifs.length; i++) {

                    let userId = this.gifs[i].user_id;
                    fetch('http:localhost:3000/api/auth/profile/' + userId)
                    .then(res => res.json())
                    .then(user => this.gifUser.push(user))
                    .then(() => {

                        document.createElement("div");
                        document.querySelector("div").setAttribute("id", "displayGifs");
            /*affichage de l'utilisateur qui a posté le gif :
            photo de profil + nom*/
                        document.createElement("img");
                        document.querySelector("img").setAttribute("id", "profile");
                        document.createElement("p");
                        document.querySelector("p").setAttribute("id", "nom");
                        document.getElementById("nom").textContent = this.gifUser[i].nom + this.gifUser[i].prenom;
            /*date du gif*/
                        document.createElement("p");
                        document.querySelector("p").setAttribute("id", "date");
                        document.getElementById("date").textContent = this.gifs[i].date;
            /*gif*/
                        document.createElement("img");
                        document.querySelector("img").setAttribute("id", "gif");
            /*bouton supprimer*/
                        document.createElement("p");
                        document.querySelector("p").setAttribute("id", "supprimer");
                        document.querySelector("p").setAttribute("@click", "deleteGif");
                        document.getElementById("supprimer").textContent = "Supprimer";
            /*bouton pour afficher les commentaires*/
                        document.createElement("p");
                        document.querySelector("p").setAttribute("id", "showComments");
                        document.getElementById("showComments").setAttribute("@click", "showComments");
                        document.getElementById("showComments").textContent = "Commentaires";
            /*boîte à commentaires*/
                        document.createElement("div");
                        document.querySelector("div").setAttribute("id", "container");
            /*bouton pour ajouter un commentaire*/
                        document.createElement("p");
                        document.querySelector("p").setAttribute("id", "addComment");
                        document.getElementById("addComment").setAttribute("@click", "addComment");
                        document.getElementById("addComment").textContent = "Ajouter un commentaire";
                        document.createElement("div");
                        document.querySelector("div").setAttribute("id", "commentBox");
            /* hiérarchisation */
                        document.getElementById("displayGifs").appendChild(document.getElementById("profile"));
                        document.getElementById("displayGifs").appendChild(document.getElementById("nom"));
                        document.getElementById("displayGifs").appendChild(document.getElementById("date"));
                        document.getElementById("displayGifs").appendChild(document.getElementById("gif"));
                        document.getElementById("displayGifs").appendChild(document.getElementById("supprimer"));
            /* affichage des données stockées */
                        document.getElementById("profile").setAttribute("src", this.gifUser[i].photo_url);
                        document.getElementById("gif").setAttribute("src", this.gifs[i].url);
                    })
            }
        })
        .catch(err => console.log(err.message))


/* requête pour vérifier que l'utilisateur a le droit de supprimer le gif */
        let userId = JSON.parse(localStorage.getItem("userId"));

        fetch('http:localhost:3000/api/auth/profile/' + userId)
        .then(res => res.json())
        .then(user => {

            if (userId === this.gif.user_id || user.moderateur == 1) {
                document.getElementById("supprimer").style.visibility = "visible"
            }
        })
    },
    methods: {
/* requête pour supprimer un gif */
        deleteGif() {
            for (let i = 0; i < this.gifs.length; i++) {
/* ---------------------------- /!\ ------------------------------------ */

            /* CONDITION DE FILTRAGE POUR LE GIF A SUPPRIMER */

/* ---------------------------- /!\ ------------------------------------ */
                let gifId = this.gifs[i].id;
                fetch("http://localhost:3000/api/gifs/" + gifId, {
                    method: "DELETE",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(() => this.gifs.pull(this.gifs[i]))
                .catch(err => console.log(err.message))
            }
        },
/* afficher les commentaires d'un gif */
        showComments() {
            let gifId = this.gif.id;
/* stockage des commentaires de chaque gif dans comments
et des utilisateurs associés dans users*/
            fetch("http://localhost:3000/api/gifs/" + gifId + "/comments")
            .then(res => res.json())
            .then(data => {
                this.comments = data;
                /* ici userId est l'id de l'utilisateur associé à chaque commentaire */
                let userId = this.comments.user_id;
                fetch('http:localhost:3000/api/auth/profile/' + userId)
                .then(res => res.json())
                .then(user => this.users = user)
                .catch(err => console.log(err.message))
            })
            .catch(err => console.log(err.message))

/* affichage des commentaires */
            for (this.comment in this.comments) {
                let container = document.getElementById("container");
                let commentaire = document.createElement("div");
                let content = document.createElement("p");
                let profilImg = document.createElement("img");
                commentaire.appendChild(content);
                commentaire.appendChild(profilImg);
                container.appendChild(commentaire);

                content.textContent = this.comment.contenu;
                profilImg.setAttribute("src", this.users.photo_url);

/* ici userId est celui de l'utilisateur connecté :
vérification de s'il est en mesure de supprimer un commentaire
(s'il en est l'auteur, ou s'il est modérateur) */
                let userId = JSON.parse(localStorage.getItem("userId"));

                fetch('http:localhost:3000/api/auth/profile/' + userId)
                .then(res => res.json())
                .then(user => {
                    if (userId === this.comment.user_id || user.moderateur == true) {
/* le cas échéant, création du bouton supprimer */
                        let deleteBtn = document.createElement("p");
                        deleteBtn.textContent = "Supprimer";
                        container.appendChild(deleteBtn);

                        let idComment = this.comment.id;
                        let gifId = this.gif.id;

/* et attribution de la requête de suppression à l'événement clic */
                        deleteBtn.addEventListener("click", () => {
                            fetch("http://localhost:3000/api/gifs/" + gifId + "/comments/" + idComment, {
                                method: "DELETE",
                                headers: {
                                    "Accept": "application/json",
                                    "Content-Type": "application/json"
                                }
                            })
                            .then(res => res.json())
                            .catch(err => console.log(err.message))
                        })
                    }
                })
                .catch(err => console.log(err.message))
            }
        },
/* ajouter un commentaire :
on cache le bouton ajouter et on fait apparaître de quoi écrire et poster */
        addComment() {
            document.getElementById("addComment").style.visibility = "hidden";

            let commentBox = document.getElementById("commentBox");
            let commentInput = document.createElement("input");
            commentInput.setAttribute("type", "text");
            commentInput.setAttribute("name", "commentaire");
            commentInput.setAttribute("id", "commentaire");
            commentBox.appendChild(commentInput);
            let contenu = commentInput.value;

            let postBtn = document.createElement("p");
            commentBox.appendChild(postBtn);
            postBtn.textContent = "Ajouter";
            postBtn.addEventListener("click", () => {

                commentInput.remove();
                postBtn.remove();
                document.getElementById("addComment").style.visibility = "visible";
                
                let userId = JSON.parse(localStorage.getItem("userId"));
                let gifId = this.gif.id;

                fetch("http://localhost:3000/api/gifs/" + gifId + "/comments", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ contenu, userId })
                })
                .then(res => res.json())
                .then(data => this.comments.push(data))
                .catch(err => console.log(err.message))

            })
        }

    }
}
</script>

<style scoped>
#supprimer {
    visibility: hidden;
}
</style>