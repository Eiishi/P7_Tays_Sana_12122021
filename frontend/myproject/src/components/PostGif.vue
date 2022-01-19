<template>
    <!-- <font-awesome-icon icon="fa-regular fa-circle-plus" /> -->
    <p @click="showContainer" class="btn" id="plus">+</p>
    <div id="container">
        <h2>Ajouter un gif</h2>
        <div>
            <label for="titre">Titre : </label>
            <input type="text" name="titre" ref="titre">
            <p ref="titreErrMsg" class="error"></p>
            <button @click="showUrlBox">Saisir une URL</button> <button @click="showFileBox">Ajouter un fichier</button>
            <div id="urlBox">
            <input type="text" name="url" ref="url">
            <p ref="urlErrMsg" class="error"></p>
            </div>
            <div id="fileBox">
            <input type="file" accept="image/png, image/jpeg" name="file" ref="file">
            </div>
            <button @click="addGif">Ajouter</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PostGif',
    data() {
        return {}
    },
    mounted() {

/* fonctions de vérification des champs de titre et d'URL */

        function validateName(string) {
            /*eslint-disable-next-line*/
            return /^[a-z0-9\-\é\è\ë\ï]+( [a-z0-9\é\è\ë\ï]+)*$/i.test(string);
        }

        function validateUrl(string) {
            /*eslint-disable-next-line*/
            return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)(.gif)$/i.test(string);
        }

        let titre = this.$refs.titre;
        let url = this.$refs.url;

        titre.addEventListener("change", () => {

            if (validateName(titre.value) == false || titre.value == "") {
                this.$refs.titreErrMsg.textContent = "Veuillez entrer un titre valide."
            } else {
                this.$refs.titreErrMsg.textContent = ""
            }
        })
        url.addEventListener("change", () => {

            if (validateUrl(url.value) == false || url.value == "") {
                this.$refs.urlErrMsg.textContent = "Veuillez entrer une URL valide, et au format .gif."
            } else {
                this.$refs.urlErrMsg.textContent = ""
            }
        })

    },
    methods: {

/* affichage de la boîte d'ajout d'un gif */

        showContainer() {
            document.getElementById("container").style.display = "block";
        },

/* affichage de l'option "ajouter une URL" */

        showUrlBox() {
            document.getElementById("urlBox").style.display = "block";
            if (document.getElementById("fileBox").style.display == "block") {
                document.getElementById("fileBox").style.display = "none"
            }
        },

/* affichage de l'option "ajouter un fichier" */

        showFileBox() {
            document.getElementById("fileBox").style.display = "block";
            if (document.getElementById("urlBox").style.display == "block") {
                document.getElementById("urlBox").style.display = "none"
            }
        },

/* fonction pour ajouter un gif */

        addGif() {

            let userId = localStorage.getItem("userId");
            let titre = this.$refs.titre.value;

/* vérification que le titre a un format correct */

            if (titre !== "" && this.$refs.titreErrMsg.textContent === "") {

/* requête différente selon le choix de format de gif envoyé */

                if (document.getElementById("urlBox").style.display == "block") {
                    
                    let url = this.$refs.url.value;

                    if (url !== "" && this.$refs.urlErrMsg.textContent === "") {

/* si gif envoyé par URL, envoi de requête à l'API avec l'url pour traitement */

                        fetch("http://localhost:3000/api/gifs/", {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                        },
                        body: JSON.stringify({ titre, userId, url })
                        })
                        .then(res => res.json())
                        .then(res => {
                            if (res.error) {
                                this.$refs.titreErrMsg.textContent = res.error
                            }
                        })
                        .catch(err => console.log(err.message))

                    } else {
                        alert("URL invalide.")
                    }

                } else if (document.getElementById("fileBox").style.display == "block") {

/* si gif envoyé par fichier, envoi de requête à l'API avec le fichier pour traitement */

                    fetch("http://localhost:3000/api/gifs/", {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                        },
                        body: JSON.stringify({ titre, userId,  })
                    })
                    .then(res => res.json())
                    .catch(err => console.log(err.message))
                } else {
                    alert("Veuillez choisir un mode de saisie.")
                }
                document.getElementById("container").style.display = "none";
                location.reload();
            } else {
                alert("Titre invalide.")
            }
        }
    }
}
</script>

<style scoped>
#urlBox, #fileBox, #container {
    display: none;
}
#plus {
    margin: 20px auto;
}
#container {
    background-color: rgba(98, 81, 255, 0.4);
    border-radius: 20px;
    padding: 10px;
    margin-bottom: 20px;
}
</style>