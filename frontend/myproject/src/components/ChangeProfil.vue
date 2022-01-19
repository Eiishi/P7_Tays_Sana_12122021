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
        <label for="photo">Photo de profil (optionnel)</label><br>
        <input type="file" name="photo" accept="image/png, image/jpeg" ref="photo"><br>
        <button ref="miseAJour" @click="pressed">Mettre à jour</button>
    </div>
</template>

<script>
// import axios from 'axios';
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

        let nom = this.$refs.nom;
        let prenom = this.$refs.prenom;
        let mail = this.$refs.mail;

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

        let userId = JSON.parse(localStorage.getItem("userId"));

/* récupération du profil utilisateur */

        fetch('http://localhost:3000/api/auth/profile/' + userId, {
            method: "GET",
            headers: {
                "authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
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
                
            if (nom !== "" && this.$refs.nomErrMsg.textContent === "" &&
                prenom !== "" && this.$refs.prenomErrMsg.textContent === "" &&
                mail !== "" && this.$refs.mailErrMsg.textContent === "") {  
                    
                    // let modified = `nom = "${nom}", prenom = "${prenom}", mail = "${mail}"`;

                let userId = JSON.parse(localStorage.getItem("userId"));

                let photo = this.$refs.photo.files[0];
                console.log(photo);

                let formData = new FormData();
                formData.append('photo', photo);
                const formArray = Array.from(formData);
                const photoFile = formArray[0][1];

                console.log(photoFile);

                // axios({
                //     url: "http://localhost:3000/api/auth/profile/" + userId,
                //     method: "PUT",
                //     headers: {
                //         authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                //     },
                //     data: photoFile
                // })
                // .then((res) => console.log(res))
                // .catch((err) => console.log(err))

                // axios.put("http://localhost:3000/api/auth/profile/" + userId, {
                //     photoFile
                // }, {
                //     headers: {
                //         'Content-Type': 'multipart/form-data; boundary=myBoundary',
                //         "authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                //     }
                // })
                // .then(res => {
                //     if (res.error) {
                //         this.$refs.mdpErrMsg2.textContent = res.error;
                //     } else {
                //         // location.hash = "#/home";
                //     }
                // })
                // .catch(err => console.log(err))

                fetch("http://localhost:3000/api/auth/profile/" + userId, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "multipart/form-data; boundary=--------------------------605269247338716467427004",
                        "authorization": "Bearer " + JSON.parse(localStorage.getItem("token"))
                    },
                    body: photo
                })
                .then(res => res.json())
                .then(res => console.log(res))
                // .then(() => {
                //     location.hash = '#/home';
                // })
                .catch(err => console.log(err.message))
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