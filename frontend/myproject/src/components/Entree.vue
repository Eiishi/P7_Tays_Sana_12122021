<template>
    <h1>Bienvenue sur Gagomania !</h1>
    <div>
        <label for="mail">E-mail : </label><br>
        <input type="email" name="mail" ref="mail"><br>
        <p ref="mailErrMsg" class="error"></p>
        <label for="mot_de_passe">Mot de passe : </label><br>
        <input type="password" name="mot_de_passe" ref="mot_de_passe"><br>
        <p ref="mdpErrMsg" class="error"></p>
    <button ref="connexion" @click="pressed">Se connecter</button>
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

/* fonctions de validations des champs d'entrée */

        function validateEmail(email) {
            return /\S+@\S+\.\S+/.test(email);
        }

        function validatePassword(password) {
            return /\S{8,}/.test(password);
        }

        let mail = this.$refs.mail;
        let mot_de_passe = this.$refs.mot_de_passe;

/* écoute du changement sur les champs d'entrée
et vérification du contenu */

        mail.addEventListener("change", () => {

            if (validateEmail(mail.value) == false || mail.value == "") {
                this.$refs.mailErrMsg.textContent = "Veuillez entrer une adresse mail valide."
            } else {
                this.$refs.mailErrMsg.textContent = ""
            }
        })
        mot_de_passe.addEventListener("change", () => {

            if (validatePassword(mot_de_passe.value) == false || mot_de_passe.value == "") {
                this.$refs.mdpErrMsg.textContent = "Veuillez saisir votre mot de passe."
            } else {
                this.$refs.mdpErrMsg.textContent = ""
            }
        })

    },
    methods: {
        pressed() {

/* vérification des champs d'entrée */

            let mail = this.$refs.mail.value;
            let mot_de_passe = this.$refs.mot_de_passe.value;

            if (mail !== "" && this.$refs.mailErrMsg.textContent === "" &&
                mot_de_passe !== "" && this.$refs.mdpErrMsg.textContent === "") {  

/* si pas d'erreur, envoi de la requête POST
pour connecter l'utilisateur */

                fetch("http://localhost:3000/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ mail, mot_de_passe })
                })
                .then(res => res.json())
                .then(res => {
                    if (res.error) {
                        this.$refs.mdpErrMsg.textContent = res.error
                    } else {

/* enregistrement du userId et du token dans le localStorage
redirection vers la page d'accueil */

                        localStorage.userId = JSON.stringify(res.userId);
                        localStorage.token = JSON.stringify(res.token);
                        location.hash = '#/home';
                        this.$refs.nav.style.display = "none";
                    }
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