<template>
    <br>
    <router-link to="/home" class="btn" style="margin-right: 75%">Accueil</router-link>
    <br>
    <h2>Mettre à jour mon profil</h2>
<!-- formulaire pour modifier un ou plusieurs champs -->
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
        <label for="photo">Photo de profil (optionnel)</label><br>
        <input type="file" name="photo" accept="image/png, image/jpeg" ref="photo"><br>
        <button ref="miseAJour" @click="pressed">Mettre à jour</button>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "ChangeProfil",
    data() {
        return {}
    },
    mounted() {

        document.getElementById("nav").style.display = "none";

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

/* écoute du changement sur les champs et vérification des valeurs */

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

        let userId = JSON.parse(localStorage.getItem("userId"));

/* récupération du profil utilisateur */

        fetch('http://localhost:3000/api/auth/profile/' + userId, {
            method: "GET",
            headers: {
                "authorization": `${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(user => {
            this.$refs.nom.setAttribute("value", user.user.nom);
            this.$refs.prenom.setAttribute("value", user.user.prenom);
            this.$refs.mail.setAttribute("value", user.user.mail);
        })
        .catch(err => console.log(err.message))
    },
    methods: {
        pressed() {

/* si tous les champs sont correctements remplis,
au clic sur le bouton mettre à jour,
envoi de la requête PUT */

            let nom = this.$refs.nom.value;
            let prenom = this.$refs.prenom.value;
            let mail = this.$refs.mail.value;
            let mot_de_passe = this.$refs.mot_de_passe.value;
            let mot_de_passe_confirm = this.$refs.mot_de_passe_confirm.value;
            let photo = this.$refs.photo.files[0];
                
            if (nom !== "" && this.$refs.nomErrMsg.textContent === "" &&
                prenom !== "" && this.$refs.prenomErrMsg.textContent === "" &&
                mail !== "" && this.$refs.mailErrMsg.textContent === "" &&
                mot_de_passe !== "" && this.$refs.mdpErrMsg.textContent === "" &&
                mot_de_passe_confirm !== "" && this.$refs.mdpErrMsg2.textContent === "") {  

                let modified = `nom = "${nom}", prenom = "${prenom}", mail = "${mail}"`;

                let userId = JSON.parse(localStorage.getItem("userId"));

                let formData = new FormData();
                formData.append('photo', photo);
                const formArray = Array.from(formData);
                const photoFile = formArray[0][1];

                console.log(photoFile);

                axios.put("http://localhost:3000/api/auth/profile/" + userId, {
                    modified, mot_de_passe, photoFile
                }, {
                    headers: {
                        "authorization": `${localStorage.getItem("token")}`
                    }
                })
                .then(res => console.log(res))
                .then(res => {
                    if (res.error) {
                        this.$refs.mdpErrMsg2.textContent = res.error;
                        location.hash = "#/home";
                    }
                })
                .catch(err => console.log(err))

                // fetch("http://localhost:3000/api/auth/profile/" + userId, {
                //     method: "PUT",
                //     headers: {
                //         "Accept": "application/json",
                //         "Content-Type": "multipart/form-data",
                //         "authorization": `${localStorage.getItem("token")}`
                //     },
                //     body: JSON.stringify({ modified, mot_de_passe, photoFile })
                // })
                // .then(res => res.json())
                // .then(res => console.log(res))
                // // .then(() => {
                // //     location.hash = '#/home';
                // // })
                // .catch(err => console.log(err.message))
            } else {
                alert("Votre formulaire contient des erreurs ou des champs non renseignés.")
            }
        }
    }
}
</script>

<style scoped>
h2 {
    margin: 40px 0;
}
</style>