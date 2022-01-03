<template>
    <h1>Bienvenue sur Gagomania !</h1>
    <div>
        <label for="mail">E-mail : </label><br>
        <input type="email" name="mail" id="mail"><br>
        <p id="mailErrMsg" class="error"></p>
        <label for="mot_de_passe">Mot de passe : </label><br>
        <input type="password" name="mot_de_passe" id="mot_de_passe"><br>
        <p id="mdpErrMsg" class="error"></p>
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
    mounted() {

        document.getElementById("nav").style.display = "block";

        function validateEmail(email) {
            return /\S+@\S+\.\S+/.test(email);
        }

        function validatePassword(password) {
            return /\S{8,}/.test(password);
        }

        let mail = document.getElementById("mail");
        let mot_de_passe = document.getElementById("mot_de_passe");

        mail.addEventListener("change", () => {

            if (validateEmail(mail.value) == false || mail.value == "") {
                document.getElementById("mailErrMsg").textContent = "Veuillez entrer une adresse mail valide."
            } else {
                document.getElementById("mailErrMsg").textContent = ""
            }
        })
        mot_de_passe.addEventListener("change", () => {

            if (validatePassword(mot_de_passe.value) == false || mot_de_passe.value == "") {
                document.getElementById("mdpErrMsg").textContent = "Veuillez saisir votre mot de passe."
            } else {
                document.getElementById("mdpErrMsg").textContent = ""
            }
        })

    },
    methods: {
        pressed() {
            let mail = document.getElementById("mail").value;
            let mot_de_passe = document.getElementById("mot_de_passe").value;

            if (mail !== "" && document.getElementById("mailErrMsg").textContent === "" &&
                mot_de_passe !== "" && document.getElementById("mdpErrMsg").textContent === "") {  

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
                    localStorage.token = JSON.stringify(data.token);
                })
                .then(() => {
                    window.location = "http://localhost:8080/#/home";
                    document.getElementById("nav").style.display = "none";
                })
                .catch(err => console.log(err.message))
            } else {
                alert("Votre formulaire contient des erreurs ou des champs non renseignés.")
            }
        }
    }
}
</script>

<style>
.error {
    color: red;
}
</style>