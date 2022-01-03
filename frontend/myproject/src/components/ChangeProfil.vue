<template>
    <h2>Mettre à jour mon profil</h2>
<!-- formulaire pour modifier un ou plusieurs champs -->
    <div>
        <label for="nom">Nom : </label><br>
        <input type="text" name="nom" id="nom"><br>
        <p id="nomErrMsg" class="error"></p>
        <label for="prenom">Prénom : </label><br>
        <input type="text" name="prenom" id="prenom"><br>
        <p id="prenomErrMsg" class="error"></p>
        <label for="mail">E-mail : </label><br>
        <input type="email" name="mail" id="mail"><br>
        <p id="mailErrMsg" class="error"></p>
        <label for="mot_de_passe">Mot de passe : </label><br>
        <input type="password" name="mot_de_passe" id="mot_de_passe"><br>
        <p id="mdpErrMsg" class="error"></p>
        <label for="mot_de_passe_confirm">Confirmer mot de passe : </label><br>
        <input type="password" name="mot_de_passe_confirm" id="mot_de_passe_confirm"><br>
        <p id="mdpErrMsg2" class="error"></p>
        <label for="photo">Photo de profil (optionnel)</label><br>
        <input type="file" name="photo" accept="image/png, image/jpeg" id="photo"><br>
        <button id="miseAJour" @click="pressed">Mettre à jour</button>
    </div>
</template>

<script>
export default {
    name: "ChangeProfil",
    data() {
        return {}
    },
    mounted() {

        document.getElementById("nav").style.display = "none";

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

        let nom = document.getElementById("nom");
        let prenom = document.getElementById("prenom");
        let mail = document.getElementById("mail");
        let mot_de_passe = document.getElementById("mot_de_passe");
        let mot_de_passe_confirm = document.getElementById("mot_de_passe_confirm");

        nom.addEventListener("change", () => {

            if (validateName(nom.value) == false || nom.value == "") {
                document.getElementById("nomErrMsg").textContent = "Veuillez entrer un nom valide."
            } else {
                document.getElementById("nomErrMsg").textContent = ""
            }
        })
        prenom.addEventListener("change", () => {

            if (validateName(prenom.value) == false || prenom.value == "") {
                document.getElementById("prenomErrMsg").textContent = "Veuillez entrer un prénom valide."
            } else {
                document.getElementById("prenomErrMsg").textContent = ""
            }
        })
        mail.addEventListener("change", () => {

            if (validateEmail(mail.value) == false || mail.value == "") {
                document.getElementById("mailErrMsg").textContent = "Veuillez entrer une adresse mail valide."
            } else {
                document.getElementById("mailErrMsg").textContent = ""
            }
        })
        mot_de_passe.addEventListener("change", () => {

            if (validatePassword(mot_de_passe.value) == false || mot_de_passe.value == "") {
                document.getElementById("mdpErrMsg").textContent = "Niveau de sécurité du mot de passe trop faible."
            } else {
                document.getElementById("mdpErrMsg").textContent = ""
            }
        })
        mot_de_passe_confirm.addEventListener("change", () => {

            if (mot_de_passe.value !== mot_de_passe_confirm.value || mot_de_passe_confirm.value == "") {
                document.getElementById("mdpErrMsg2").textContent = "Veuillez confirmer votre mot de passe."
            } else {
                document.getElementById("mdpErrMsg2").textContent = ""
            }
        })

        let userId = JSON.parse(localStorage.getItem("userId"));

        fetch('http://localhost:3000/api/auth/profile/' + userId, {
            method: "GET",
            headers: {
                "authorization": `${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(user => {
            document.getElementById("nom").setAttribute("value", user.user.nom);
            document.getElementById("prenom").setAttribute("value", user.user.prenom);
            document.getElementById("mail").setAttribute("value", user.user.mail);
        })
        .catch(err => console.log(err.message))

    },
    methods: {
        pressed() {

            let nom = document.getElementById("nom").value;
            let prenom = document.getElementById("prenom").value;
            let mail = document.getElementById("mail").value;
            let mot_de_passe = document.getElementById("mot_de_passe").value;
            let mot_de_passe_confirm = document.getElementById("mot_de_passe_confirm").value;
            let photo = document.getElementById("photo");
                
            if (nom !== "" && document.getElementById("nomErrMsg").textContent === "" &&
                prenom !== "" && document.getElementById("prenomErrMsg").textContent === "" &&
                mail !== "" && document.getElementById("mailErrMsg").textContent === "" &&
                mot_de_passe !== "" && document.getElementById("mdpErrMsg").textContent === "" &&
                mot_de_passe_confirm !== "" && document.getElementById("mdpErrMsg2").textContent === "") {  

                let modified = `nom = "${nom}", prenom = "${prenom}", mail = "${mail}"`;

                let userId = JSON.parse(localStorage.getItem("userId"));

                fetch("http://localhost:3000/api/auth/profile/" + userId, {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "authorization": `${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({ modified, mot_de_passe, photo })
                })
                .then(res => res.json())
                .then(() => {
                    // window.location = "http://localhost:8080/#/home";
                })
                .catch(err => console.log(err.message))
            } else {
                alert("Votre formulaire contient des erreurs ou des champs non renseignés.")
            }
        }
    }
}
</script>