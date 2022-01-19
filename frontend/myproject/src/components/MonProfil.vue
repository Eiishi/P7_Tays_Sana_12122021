<template>
    <div>
        <router-link to="/profile">
        <img ref="profilePic">
        </router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "MonProfil",
    data() {
        return {
        }
    },
    mounted() {

/* récupération des informations de l'utilisateur connecté (photo de profil) */

        let userId = JSON.parse(localStorage.getItem("userId"));

        fetch('http://localhost:3000/api/auth/profile/' + userId, {
            method: "GET",
            headers: {
                "authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        .then(res => res.json())
        .then(user => {
            this.$refs.profilePic.setAttribute("src", user.user.photo_url);
            this.$refs.profilePic.setAttribute("alt", "Photo de profil de l'utilisateur " + user.user.prenom + " " + user.user.nom);
        })
        .catch(err => console.log(err.message))
    }
}
</script>

<style scoped>
img {
    height: 40px;
    margin-right: 80%;
}
</style>