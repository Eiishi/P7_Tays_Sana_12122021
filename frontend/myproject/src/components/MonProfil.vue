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
                "authorization": `${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(user => {
            this.$refs.profilePic.setAttribute("src", user.user.photo_url);
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