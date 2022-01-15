<template>
    <br>
    <router-link to="/home" class="btn" style="margin-right: 75%">Accueil</router-link>
    <h2>Mon profil</h2>
    <img id="profile">
    <p id="nom"></p>
    <p id="mail"></p>
    <div>
        <router-link to="/profile/update">
        <button>Modifier le profil</button>
        </router-link>
        <router-link to="/">
        <button @click="deleteProfile" id="delete">Supprimer le profil</button>
        </router-link>
        <router-link to="/">
        <p class="btn" id="deconnexion">Déconnexion</p>
        </router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "PageProfil",
    data() {
        return {}
    },
    mounted() {

        document.getElementById("nav").style.display = "none";

/* récupération des informations de l'utilisateur connecté */

        let userId = JSON.parse(localStorage.getItem("userId"));

        fetch('http://localhost:3000/api/auth/profile/' + userId, {
            method: "GET",
            headers: {
                "authorization": `${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(user => {
            document.getElementById("profile").setAttribute("src", user.user.photo_url);
            document.getElementById("nom").textContent = user.user.nom + " " + user.user.prenom;
            document.getElementById("mail").textContent = user.user.mail;
        })
        .catch(err => console.log(err.message))
    },
    methods: {
        deleteProfile() {

/* requête pour supprimer le profil utilisateur */

            let userId = JSON.parse(localStorage.getItem("userId"));

            fetch("http://localhost:3000/api/auth/profile/" + userId, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `${localStorage.getItem("token")}`
            }
            .then(res => res.json())
            .catch(err => console.log(err.message))
            })
        }
    }
}
</script>

<style scoped>
#delete {
    background-color: red;
}
#delete:hover {
    background-color: rgb(126, 0, 0);
}
#profile {
    height: 100px;
}
#nom, #mail {
    font-weight: bold;
}
#deconnexion {
    margin: auto;
}
</style>