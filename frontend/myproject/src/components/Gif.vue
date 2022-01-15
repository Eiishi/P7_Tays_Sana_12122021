<template>
    <div ref="displayGifs"></div>
</template>

<script>
export default {
    name: "Gif",
    data() {
        return {}
    },
    mounted() {

        document.getElementById("nav").style.display = "none";

/* requêtes pour récupérer tous les gifs */

        fetch("http://localhost:3000/api/gifs/", {
            method: "GET",
            headers: {
                "authorization": `${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(gifs => {
            for (let i = 0; i < gifs.gifs.length; i++) {

/* pour chaque gif, récupération de l'utilisateur associé */

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

                    let displayGifs = this.$refs.displayGifs;

                    let profileContainer = document.createElement("div");
                    profileContainer.classList.add("container");

                    let profile = document.createElement("img");
                    profile.classList.add("profile");
                    let nom = document.createElement("p");
                    nom.classList.add("nom");
                    nom.textContent = user.user.prenom + " " + user.user.nom + " a partagé : ";
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
                    supprimer.classList.add("delete");
                    supprimer.setAttribute("title", "Supprimer");
                    supprimer.textContent = "X";
            /*bouton pour afficher les commentaires*/
                    let showComments = document.createElement("p");
                    showComments.classList.add("showComments");
                    showComments.addEventListener("click", this.showComments);
                    showComments.setAttribute("data-id", gifs.gifs[i].id);
                    showComments.classList.add("btn");
                    showComments.style.margin = "15px auto";
                    showComments.textContent = "Commentaires";
            /*boîte à commentaires*/
                    let containerBox = document.createElement("div");
                    containerBox.classList.add("containerBox");
            /* hiérarchisation */
                    displayGifs.appendChild(profileContainer);
                    profileContainer.appendChild(profile);
                    profileContainer.appendChild(nom);
                    displayGifs.appendChild(titre);
                    displayGifs.appendChild(date);
                    displayGifs.appendChild(gifImg);
                    displayGifs.appendChild(supprimer);
                    displayGifs.appendChild(showComments);
                    displayGifs.appendChild(containerBox);
            /* affichage des données de l'API */
                    profile.setAttribute("src", user.user.photo_url);
                    gifImg.setAttribute("src", gifs.gifs[i].url);
                })

/* requête pour vérifier que l'utilisateur a le droit de supprimer le gif :
on récupère l'userId de l'utilisateur connecté */
                userId = JSON.parse(localStorage.getItem("userId"));

                fetch('http://localhost:3000/api/auth/profile/' + userId, {
                    method: "GET",
                    headers: {
                        "authorization": `${localStorage.getItem("token")}`
                    }

                })
                .then(res => res.json())
                .then(user => {

/* et on le compare à l'id de l'utilisateur ayant posté chacun des gifs
on vérifie également si l'utilisateur est modérateur
==> affichage ou non du bouton supprimer */
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

/* condition de filtrage des gifs récupérés
on compare leur id à celui du gif sur lequel on clique */

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

/* pour chaque gif, on crée la boîte de commentaires et le bouton d'ajout */
                    
                    if (gifs.gifs[i].id == e.target.dataset.id) {
                        e.target.style.display = "none";

                        let containerBox = document.getElementsByClassName("containerBox");
                        let commentBox = document.createElement("div");
                        commentBox.classList.add("commentBox");
                        containerBox[i].appendChild(commentBox);
                        let commentInput = document.createElement("input");
                        commentInput.setAttribute("type", "text");
                        commentInput.setAttribute("name", "commentaire");
                        commentInput.classList.add("commentaire");
                        commentBox.appendChild(commentInput);

                        let postBtn = document.createElement("p");
                        postBtn.classList.add("btn");
                        postBtn.style.margin = "20px auto";
                        commentBox.appendChild(postBtn);
                        postBtn.textContent = "Ajouter";

                        postBtn.addEventListener("click", () => {
                
                            if (commentInput.value == "") {
                                alert("Votre commentaire est vide !")
                            } else {
                                
                                let contenu = commentInput.value;
                                commentInput.value = "";
                                let userId = localStorage.getItem("userId");
                                let gifId = gifs.gifs[i].id;

/* ajout d'un commentaire :
après vérification qu'il n'est pas vide, récupération de l'id du gif en question
et requête POST pour ajouter le commentaire
fermeture de la boîte pour permettre une mise à jour instantanée */

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
                                .then(() => {
                                    e.target.style.display = "block";
                                    let containerBox = document.getElementsByClassName("containerBox");
                                    containerBox[i].style.display = "none";
                                    containerBox[i].innerHTML = "";
                                })
                                .catch(err => console.log(err.message))
                            }
                        })

/* pour chaque gif, on stocke leur id
et on requête l'API pour récupérer tous leurs commentaires */
                        
                        let gifId = gifs.gifs[i].id;

                        fetch("http://localhost:3000/api/gifs/" + gifId + "/comments", {
                            method: "GET",
                            headers: {
                                "authorization": `${localStorage.getItem("token")}`
                            }
                        })
                        .then(res => res.json())
                        .then(comments => {

/* récupération de la liste des commentaires de chaque gif */

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
                                    containerBox[i].style.padding = "20px";
                                    let commentaire = document.createElement("div");
                                    commentaire.classList.add("commentaires");
                                    containerBox[i].appendChild(commentaire);
                                    let div = document.createElement("div");
                                    commentaire.appendChild(div);
                                    let content = document.createElement("p");
                                    let profilImg = document.createElement("img");
                                    profilImg.setAttribute("title", user.user.prenom + " " + user.user.nom);
                                    div.appendChild(content);
                                    div.appendChild(profilImg);

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
                                            deleteBtn.textContent = "X";
                                            deleteBtn.setAttribute("data-id", comments.commentaires[k].id);
                                            deleteBtn.classList.add("delete");
                                            deleteBtn.setAttribute("title", "Supprimer");
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
    }
}
</script>

<style>
.containerBox img {
    cursor: pointer;
}
.profile, .containerBox img {
    height: 60px;
}
.nom {
    font-size: 20px;
}
.date {
    font-size: 12px;
}
.gif {
    margin: 10px auto;
    width: 50%;
}
.delete {
    cursor: pointer;
    width: 5%;
    margin: auto;
    padding: 10px;
    border-radius: 30px;
    color: #fff;
    background-color: red;
    border: 2px black solid;
    box-shadow: 2px 2px rgba(0, 0, 0, 0.418);
    max-width: 20px;
}
.delete:hover {
    background-color: rgb(126, 0, 0);
}
.containerBox {
    background-color: rgba(98, 81, 255, 0.4);
    margin: 10px auto;
    border-radius: 10px;
    max-width: 640px;
}
.commentaires p:nth-child(1) {
    background-color: #fff;
    color: #000;
    border-radius: 25px;
    margin: 20px 0;
    padding: 5px;
    width: 75%;
    position: relative;
}
.commentaires p:nth-child(1):after {
    position: absolute;
    width: 15px;
    height: 15px;
    border-top: 2px solid #fff;
    border-right: 2px solid #fff;
    top: 100%;
    left: 100%;
    margin-left: -16px;
    content: "";
    transform: rotate(45deg);
    margin-top: -23px;
    background: #fff;
}
.commentaires div {
    display: flex;
    justify-content: space-between;
}
.commentaires img {
    height: 50px;
}
.containerBox .delete {
    font-size: 12px;
    padding: 2px;
    margin-left: 0;
}

@media (min-width : 690px) {
.gif {
    width: 40%;
}
.containerBox {
    width: 60%;
    max-width: none;
}
}
</style>