<template>
    <h1>Bienvenue sur Gagomania !</h1>
    <div>
        <label for="nom">Nom : </label><br>
        <input type="text" name="nom" ref="nom"><br>
        <p ref="nomErrMsg" class="error"></p>
        <label for="prenom">Prénom : </label><br>
        <input type="text" name="prenom" ref="prenom"><br>
        <p ref="prenomErrMsg" class="error"></p>
        <label for="mail">E-mail : </label><br>
        <input type="email" name="mail" ref="mail"><br>
        <p ref="mailErrMsg" class="error"></p>
        <label for="mot_de_passe">Mot de passe : </label><br>
        <input type="password" name="mot_de_passe" ref="mot_de_passe"><br>
        <p ref="mdpErrMsg" class="error"></p>
        <label for="mot_de_passe_confirm">Confirmer mot de passe : </label><br>
        <input type="password" name="mot_de_passe_confirm" ref="mot_de_passe_confirm"><br>
        <p ref="mdpErrMsg2" class="error"></p>
        <button ref="inscription" @click="pressed">S'inscrire</button>
    </div>
</template>

<script>
export default {
    name: 'Formulaire',
    data() {
        return {
        }
    },
    mounted() {

/* fonctions de validation des champs d'entrée */

        function validateName(string) {
            /*eslint-disable-next-line*/
            return /^[a-z\-\é\è\ë\ï]+( [a-z\é\è\ë\ï]+)*$/i.test(string);
        }

        function validateEmail(email) {
            return /\S+@\S+\.\S+/.test(email);
        }

        function validatePassword(password) {
            return /\S{8,}/.test(password);
        }

        let nom = this.$refs.nom;
        let prenom = this.$refs.prenom;
        let mail = this.$refs.mail;
        let mot_de_passe = this.$refs.mot_de_passe;
        let mot_de_passe_confirm = this.$refs.mot_de_passe_confirm;

/* vérifications des valeurs entrées
si incorrectes : apparition d'un message d'erreur */

        nom.addEventListener("change", () => {

            if (validateName(nom.value) == false || nom.value == "") {
                this.$refs.nomErrMsg.textContent = "Veuillez entrer un nom valide."
            } else {
                this.$refs.nomErrMsg.textContent = ""
            }
        })
        prenom.addEventListener("change", () => {

            if (validateName(prenom.value) == false || prenom.value == "") {
                this.$refs.prenomErrMsg.textContent = "Veuillez entrer un prénom valide."
            } else {
                this.$refs.prenomErrMsg.textContent = ""
            }
        })
        mail.addEventListener("change", () => {

            if (validateEmail(mail.value) == false || mail.value == "") {
                this.$refs.mailErrMsg.textContent = "Veuillez entrer une adresse mail valide."
            } else {
                this.$refs.mailErrMsg.textContent = ""
            }
        })
        mot_de_passe.addEventListener("change", () => {

            if (validatePassword(mot_de_passe.value) == false || mot_de_passe.value == "") {
                this.$refs.mdpErrMsg.textContent = "Niveau de sécurité du mot de passe trop faible."
            } else {
                this.$refs.mdpErrMsg.textContent = ""
            }
        })
        mot_de_passe_confirm.addEventListener("change", () => {

            if (mot_de_passe.value !== mot_de_passe_confirm.value || mot_de_passe_confirm.value == "") {
                this.$refs.mdpErrMsg2.textContent = "Veuillez confirmer votre mot de passe."
            } else {
                this.$refs.mdpErrMsg2.textContent = ""
            }
        })
    },
    methods: {
        pressed() {

/* au clic sur le bouton s'inscrire
vérification de tous les champs d'entrée */

            let nom = this.$refs.nom.value;
            let prenom = this.$refs.prenom.value;
            let mail = this.$refs.mail.value;
            let mot_de_passe = this.$refs.mot_de_passe.value;
            let mot_de_passe_confirm = this.$refs.mot_de_passe_confirm.value;
                
            if (nom !== "" && this.$refs.nomErrMsg.textContent === "" &&
                prenom !== "" && this.$refs.prenomErrMsg.textContent === "" &&
                mail !== "" && this.$refs.mailErrMsg.textContent === "" &&
                mot_de_passe !== "" && this.$refs.mdpErrMsg.textContent === "" &&
                mot_de_passe_confirm !== "" && this.$refs.mdpErrMsg2.textContent === "") {  

/* envoi de la requête POST
pour inscrire l'utilisateur */
                    
                fetch("http://localhost:3000/api/auth/signup", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ nom, prenom, mail, mot_de_passe })
                })
                .then(res => res.json())
                .then(res => {
                    if (res.error) {
                        this.$refs.mdpErrMsg2.textContent = res.error
                    } else {

/* sauvegarde du userId et du token dans le localStorage
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