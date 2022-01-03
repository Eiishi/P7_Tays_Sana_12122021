<template>
    <div>
        <router-link to="/profile">
        <img id="profilePic">
        <p></p>
        </router-link>
        <router-link to="/">
        <p>Déconnexion</p>
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
        let userId = JSON.parse(localStorage.getItem("userId"));

        fetch('http://localhost:3000/api/auth/profile/' + userId, {
            method: "GET",
            headers: {
                "authorization": `${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(user => {
            document.getElementById("profilePic").setAttribute("src", user.user.photo_url);
            document.querySelector("p").textContent = user.user.prenom + " " + user.user.nom;
        })
        .catch(err => console.log(err.message))
    }
}
</script>

<style scoped>
img {
    height: 40px;
}
</style>