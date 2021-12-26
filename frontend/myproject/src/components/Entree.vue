<template>
    <h1>Bienvenue sur Gagomania !</h1>
    <div>
        <label for="mail">E-mail : </label><br>
        <input type="email" name="mail" id="mail"><br>
        <p id="mailErrMsg"></p>
        <label for="mot_de_passe">Mot de passe : </label><br>
        <input type="password" name="mot_de_passe" id="mot_de_passe"><br>
        <p id="mdpErrMsg"></p>
    <button id="connexion" @click="pressed">Se connecter</button>
    </div>
</template>

<script>
export default {
    name: 'Entree',
    data() {
        return {
        }
    },
    methods: {
        pressed() {
            let mail = document.getElementById("mail").value;
            let mot_de_passe = document.getElementById("mot_de_passe").value;

            if (mail == "") {
                document.getElementById("mailErrMsg").textContent = "Veuillez entrer une adresse mail valide."
            } else {

            fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ mail, mot_de_passe })
            })
            .then(res => res.json())
            .then(data => {
                localStorage.userId = JSON.stringify(data.userId);
            })
            .then(() => {
                window.location = "http://localhost:8080/#/home";
            })
            .catch(() => {
                // document.getElementById("mdpErrMsg").textContent = err
            })
            }
        }
    }
}
</script>