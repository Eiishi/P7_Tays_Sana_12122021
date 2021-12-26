<template>
    <h1>Bienvenue sur Gagomania !</h1>
    <div>
        <label for="nom">Nom : </label><br>
        <input type="text" name="nom" id="nom"><br>
        <p id="nomErrMsg"></p>
        <label for="prenom">Prénom : </label><br>
        <input type="text" name="prenom" id="prenom"><br>
        <p id="prenomErrMsg"></p>
        <label for="mail">E-mail : </label><br>
        <input type="email" name="mail" id="mail"><br>
        <p id="mailErrMsg"></p>
        <label for="mot_de_passe">Mot de passe : </label><br>
        <input type="password" name="mot_de_passe" id="mot_de_passe"><br>
        <label for="mot_de_passe_confirm">Confirmer mot de passe : </label><br>
        <input type="password" name="mot_de_passe_confirm" id="mot_de_passe_confirm"><br>
        <p id="mdpErrMsg"></p>
        <label for="photo">Photo de profil (optionnel)</label><br>
        <input type="file" name="photo" id="photo"><br>
        <button id="inscription" @click="pressed">S'inscrire</button>
    </div>
</template>

<script>
export default {
    name: 'Formulaire',
    data() {
        return {
        }
    },
    methods: {
        pressed() {
            function validateName(string) {
                /*eslint-disable-next-line*/
                return /^[a-z\-\é\è\ë\ï]+( [a-z\é\è\ë\ï]+)*$/i.test(string);
            }

            function validateEmail(email) {
                return /\S+@\S+\.\S+/.test(email);
            }

            let nom = document.getElementById("nom").value;
            let prenom = document.getElementById("prenom").value;
            let mail = document.getElementById("mail").value;
            let mot_de_passe = document.getElementById("mot_de_passe").value;
            let mot_de_passe_confirm = document.getElementById("mot_de_passe_confirm").value;
            let photo = document.getElementById("photo").value;
    
            if (validateName(nom) == false || nom == "") {
                document.getElementById("nomErrMsg").textContent = "Veuillez entrer un nom valide."
            } else if (validateName(prenom) == false || prenom == "") {
                document.getElementById("prenomErrMsg").textContent = "Veuillez entrer un prénom valide."
            } else if (validateEmail(mail) == false || mail == "") {
                document.getElementById("mailErrMsg").textContent = "Veuillez entrer une adresse mail valide."
            } else if (mot_de_passe !== mot_de_passe_confirm || mot_de_passe == "" || mot_de_passe_confirm == "") {
                document.getElementById("mdpErrMsg").textContent = "Veuillez confirmer votre mot de passe."
            } else {
                
                fetch("http://localhost:3000/api/auth/signup", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ nom, prenom, mail, mot_de_passe, photo })
                })
                .then(res => res.json())
                .then(data => {
                    localStorage.userId = JSON.stringify(data.userId)
                })
                .then(() => {
                    window.location = "http://localhost:8080/#/home";
                })
                .catch(err => console.log(err.message))

            }
        }
    }
}
</script>

<style scoped>
</style>