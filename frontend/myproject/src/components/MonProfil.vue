<template>
    <div>
        <router-link to="/profile">
        <img>
        <p>{{ user.nom }} {{ user.prenom }}</p>
        </router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "MonProfil",
    data() {
        return {
            user: []
        }
    },
    mounted() {
        let userId = JSON.parse(localStorage.getItem("userId"));

        fetch('http:localhost:3000/api/auth/profile/' + userId)
        // problème de réponse dans le navigateur
        .then(res => res.json())
        .then(user => {
            this.user = user;
            document.querySelector("img").setAttribute("src", this.user.photo_url);
            document.querySelector("p").textContent = this.user.nom + this.user.prenom;
        })
        .catch(err => console.log(err.message))

    }
}
</script>