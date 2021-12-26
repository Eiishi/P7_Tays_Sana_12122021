<template>
    <img>
    <p>{{ user.nom }} {{ user.prenom }}</p>
    <p>{{ user.mail }}</p>
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
        return {
            user: []
        }
    },
    mounted() {
        let userId = JSON.parse(localStorage.getItem("userId"));

        fetch('http:localhost:3000/api/auth/profile/' + userId)
        .then(res => res.json())
        .then(user => {
            this.user = user;
            document.querySelector("img").setAttribute("src", this.user.photo_url);
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
                "Content-Type": "application/json"
            }
            .then(res => res.json())
            .catch(err => console.log(err.message))
            })
        }
    }
}
</script>