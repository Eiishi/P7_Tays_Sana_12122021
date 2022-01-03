<template>
    <h1>Mon profil</h1>
    <img>
    <p id="nom"></p>
    <p id="mail"></p>
    <div>
        <router-link to="/profile/update">
        <button>Modifier le profil</button>
        </router-link>
        <router-link to="/">
        <button @click="deleteProfile">Supprimer le profil</button>
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

        let userId = JSON.parse(localStorage.getItem("userId"));

        fetch('http://localhost:3000/api/auth/profile/' + userId, {
            method: "GET",
            headers: {
                "authorization": `${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(user => {
            document.querySelector("img").setAttribute("src", user.user.photo_url);
            document.getElementById("nom").textContent = user.user.nom + " " + user.user.prenom;
            document.getElementById("mail").textContent = user.user.mail;
        })
        .catch(err => console.log(err.message))
    },
    methods: {
        deleteProfile() {
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
img {
    height: 100px;
}
</style>