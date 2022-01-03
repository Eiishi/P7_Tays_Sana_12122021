<template>
    <div id="displayGifs"></div>
</template>

<script>
export default {
    name: "Gif",
    data() {
        return {}
    },
    mounted() {

        document.getElementById("nav").style.display = "none";

/* requêtes pour récupérer chaque gif et l'utilisateur associé
dans les objets gif et gifUser */
        fetch("http://localhost:3000/api/gifs/", {
            method: "GET",
            headers: {
                "authorization": `${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(gifs => {
            for (let i = 0; i < gifs.gifs.length; i++) {

                let userId = gifs.gifs[i].user_id;
                fetch('http://localhost:3000/api/auth/profile/' + userId, {
                    method: "GET",
                    headers: {
                        "authorization": `${localStorage.getItem("token")}`
                    }
                })
                .then(res => res.json())
                .then(user => {

            /*affichage de l'utilisateur qui a posté le gif :
            photo de profil + nom*/
                    let displayGifs = document.getElementById("displayGifs");
                    let profile = document.createElement("img");
                    profile.classList.add("profile");
                    let nom = document.createElement("p");
                    nom.classList.add("nom");
                    nom.textContent = user.user.prenom + " " + user.user.nom;
            /* titre du gif */
                    let titre = document.createElement("h2");
                    titre.classList.add("titre");
                    titre.textContent = gifs.gifs[i].titre;
            /*date du gif*/
                    let date = document.createElement("p");
                    date.classList.add("date");
                    date.textContent = gifs.gifs[i].date;
            /*gif*/
                    let gifImg = document.createElement("img");
                    gifImg.classList.add("gif");
                    gifImg.setAttribute("data-id", gifs.gifs[i].id);
                    gifImg.setAttribute("title", gifs.gifs[i].url);
            /*bouton supprimer*/
                    let supprimer = document.createElement("p");
                    supprimer.classList.add("supprimer");
                    supprimer.addEventListener("click", this.deleteGif);
                    supprimer.setAttribute("data-id", gifs.gifs[i].id);
                    supprimer.textContent = "Supprimer";
            /*bouton pour afficher les commentaires*/
                    let showComments = document.createElement("p");
                    showComments.classList.add("showComments");
                    showComments.addEventListener("click", this.showComments);
                    showComments.setAttribute("data-id", gifs.gifs[i].id);
                    showComments.textContent = "Commentaires";
            /*boîte à commentaires*/
                    let containerBox = document.createElement("div");
                    containerBox.classList.add("containerBox");
            /*bouton pour ajouter un commentaire*/
                    let addComment = document.createElement("p");
                    addComment.classList.add("addComment");
                    addComment.addEventListener("click", this.addComment);
                    addComment.setAttribute("data-id", gifs.gifs[i].id);
                    addComment.textContent = "Ajouter un commentaire";
                    let commentBox = document.createElement("div");
                    commentBox.classList.add("commentBox");
            /* hiérarchisation */
                    displayGifs.appendChild(profile);
                    displayGifs.appendChild(nom);
                    displayGifs.appendChild(titre);
                    displayGifs.appendChild(date);
                    displayGifs.appendChild(gifImg);
                    displayGifs.appendChild(supprimer);
                    displayGifs.appendChild(showComments);
                    displayGifs.appendChild(containerBox);
                    displayGifs.appendChild(addComment);
                    displayGifs.appendChild(commentBox);
            /* affichage des données stockées */
                    profile.setAttribute("src", user.user.photo_url);
                    gifImg.setAttribute("src", gifs.gifs[i].url);
                })

/* requête pour vérifier que l'utilisateur a le droit de supprimer le gif */
                userId = JSON.parse(localStorage.getItem("userId"));

                fetch('http://localhost:3000/api/auth/profile/' + userId, {
                    method: "GET",
                    headers: {
                        "authorization": `${localStorage.getItem("token")}`
                    }

                })
                .then(res => res.json())
                .then(user => {

                    if (userId !== gifs.gifs[i].user_id && user.user.moderateur === 0) {
                        document.getElementsByClassName("supprimer")[i].style.visibility = "hidden"
                    }
                })
            }
        })
        .catch(err => console.log(err.message))
    },
    methods: {
        /* requête pour supprimer un gif */
        deleteGif(e) {

            fetch("http://localhost:3000/api/gifs/", {
                method: "GET",
                headers: {
                    "authorization": `${localStorage.getItem("token")}`
                }
            })
            .then(res => res.json())
            .then(gifs => {

                for (let i = 0; i < gifs.gifs.length; i++) {

                    if (gifs.gifs[i].id == e.target.dataset.id) {
                    
                        let gifId = gifs.gifs[i].id;
                        fetch("http://localhost:3000/api/gifs/" + gifId, {
                            method: "DELETE",
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json",
                                "authorization": `${localStorage.getItem("token")}`
                            }
                        })
                        .then(res => res.json())
                        .then(() => location.reload())
                        .catch(err => console.log(err.message))
                    }
                }
            })
        },

/* afficher les commentaires d'un gif */
        showComments(e) {
                        
            fetch("http://localhost:3000/api/gifs/", {
                method: "GET",
                headers: {
                    "authorization": `${localStorage.getItem("token")}`
                }
            })
            .then(res => res.json())
            .then(gifs => {
                
                for (let i = 0; i < gifs.gifs.length; i++) {
                    
                    if (gifs.gifs[i].id == e.target.dataset.id) {
                        e.target.style.display = "none";
                        
                        let gifId = gifs.gifs[i].id;

                        fetch("http://localhost:3000/api/gifs/" + gifId + "/comments", {
                            method: "GET",
                            headers: {
                                "authorization": `${localStorage.getItem("token")}`
                            }
                        })
                        .then(res => res.json())
                        .then(comments => {

                            for (let k = 0; k < comments.commentaires.length; k++) {
                /* ici userId est l'id de l'utilisateur associé à chaque commentaire */
                                let userId = comments.commentaires[k].user_id;
                                fetch('http://localhost:3000/api/auth/profile/' + userId, {
                                    method: "GET",
                                    headers: {
                                        "authorization": `${localStorage.getItem("token")}`
                                    }
                                })
                                .then(res => res.json())
                                .then(user => {

/* affichage des commentaires */
                                    let containerBox = document.getElementsByClassName("containerBox");
                                    containerBox[i].style.display = "block";
                                    let commentaire = document.createElement("div");
                                    let content = document.createElement("p");
                                    let profilImg = document.createElement("img");
                                    profilImg.setAttribute("title", user.user.prenom + " " + user.user.nom);
                                    commentaire.appendChild(content);
                                    commentaire.appendChild(profilImg);
                                    containerBox[i].appendChild(commentaire);

                                    content.textContent = comments.commentaires[k].contenu;
                                    profilImg.setAttribute("src", user.user.photo_url);

/* ici userId est celui de l'utilisateur connecté :
vérification de s'il est en mesure de supprimer un commentaire
(s'il en est l'auteur, ou s'il est modérateur) */
                                    userId = JSON.parse(localStorage.getItem("userId"));

                                    fetch('http://localhost:3000/api/auth/profile/' + userId, {
                                        method: "GET",
                                        headers: {
                                            "authorization": `${localStorage.getItem("token")}`
                                        }
                                    })
                                    .then(res => res.json())
                                    .then(user => {
                                        if (userId === comments.commentaires[k].user_id || user.user.moderateur == 1) {
/* le cas échéant, création du bouton supprimer */
                                            let deleteBtn = document.createElement("p");
                                            deleteBtn.textContent = "Supprimer";
                                            deleteBtn.setAttribute("data-id", comments.commentaires[k].id);
                                            commentaire.appendChild(deleteBtn);

                                            let idComment = comments.commentaires[k].id;
                                            let gifId = gifs.gifs[i].id;

/* et attribution de la requête de suppression à l'événement clic */
                                            deleteBtn.addEventListener("click", (a) => {

                                                if (comments.commentaires[k].id == a.target.dataset.id) {
                                                    commentaire.remove()
                                                }

                                                fetch("http://localhost:3000/api/gifs/" + gifId + "/comments/" + idComment, {
                                                    method: "DELETE",
                                                    headers: {
                                                        "Accept": "application/json",
                                                        "Content-Type": "application/json",
                                                        "authorization": `${localStorage.getItem("token")}`
                                                    }
                                                })
                                                .then(res => res.json())
                                            })
                                        }
                                    })
                                })
                            }
                        })
                    .catch(err => console.log(err.message))
                    }
                }
            })
        },
/* ajouter un commentaire :
on cache le bouton ajouter et on fait apparaître de quoi écrire et poster */
        addComment(e) {

            e.target.style.visibility = "hidden";

            fetch("http://localhost:3000/api/gifs/", {
                method: "GET",
                headers: {
                    "authorization": `${localStorage.getItem("token")}`
                }
            })
            .then(res => res.json())
            .then(gifs => {
                
                for (let i = 0; i < gifs.gifs.length; i++) {
                    
                    if (gifs.gifs[i].id == e.target.dataset.id) {

                        let commentBox = document.getElementsByClassName("commentBox")[i];
                        let commentInput = document.createElement("input");
                        commentInput.setAttribute("type", "text");
                        commentInput.setAttribute("name", "commentaire");
                        commentInput.classList.add("commentaire");
                        commentBox.appendChild(commentInput);

                        let postBtn = document.createElement("p");
                        commentBox.appendChild(postBtn);
                        postBtn.textContent = "Ajouter";
                        postBtn.addEventListener("click", () => {
                            
                            if (commentInput.value == "") {
                                alert("Votre commentaire est vide !")
                            } else {
                                
                                let contenu = commentInput.value;

                                commentInput.remove();
                                postBtn.remove();
                                e.target.style.visibility = "visible";
                                document.getElementsByClassName("showComments")[i].style.display = "block";
                                document.getElementsByClassName("containerBox")[i].style.display = "none";
                                document.getElementsByClassName("containerBox")[i].innerHTML = '';
                                
                                let userId = localStorage.getItem("userId");
                                let gifId = gifs.gifs[i].id;

                                fetch("http://localhost:3000/api/gifs/" + gifId + "/comments", {
                                    method: "POST",
                                    headers: {
                                        "Accept": "application/json",
                                        "Content-Type": "application/json",
                                        "authorization": `${localStorage.getItem("token")}`
                                    },
                                    body: JSON.stringify({ contenu, userId })
                                })
                                .then(res => res.json())
                                .catch(err => console.log(err.message))
                            }
                        })
                    }
                }
            })
        }
    }
}
</script>

<style>
.profile, .containerBox img {
    height: 60px;
}

.containerBox {
    background-color: rgb(179, 179, 179);
}
</style>