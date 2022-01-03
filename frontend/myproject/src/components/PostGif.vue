<template>
    <!-- <font-awesome-icon icon="fa-regular fa-circle-plus" /> -->
    <p @click="showContainer">+</p>
    <div id="container">
        <h2>Ajouter un gif</h2>
        <div>
            <label for="titre">Titre : </label>
            <input type="text" name="titre" id="titre">
            <p id="titreErrMsg" class="error"></p>
            <button @click="showUrlBox">Saisir une URL</button> <button @click="showFileBox">Ajouter un fichier</button>
            <div id="urlBox">
            <input type="text" name="url" id="url">
            <p id="urlErrMsg" class="error"></p>
            </div>
            <div id="fileBox">
            <input type="file" accept="image/png, image/jpeg" name="file" id="file">
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
        function validateName(string) {
            /*eslint-disable-next-line*/
            return /^[a-z\-\é\è\ë\ï]+( [a-z\é\è\ë\ï]+)*$/i.test(string);
        }

        function validateUrl(string) {
            /*eslint-disable-next-line*/
            return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/i.test(string);
        }

        let titre = document.getElementById("titre");
        let url = document.getElementById("url");

        titre.addEventListener("change", () => {

            if (validateName(titre.value) == false || titre.value == "") {
                document.getElementById("titreErrMsg").textContent = "Veuillez entrer un titre valide."
            } else {
                document.getElementById("titreErrMsg").textContent = ""
            }
        })
        url.addEventListener("change", () => {

            if (validateUrl(url.value) == false || url.value == "") {
                document.getElementById("urlErrMsg").textContent = "Veuillez entrer une URL valide."
            } else {
                document.getElementById("urlErrMsg").textContent = ""
            }
        })

    },
    methods: {
        showContainer() {
            document.getElementById("container").style.display = "block";
        },
        showUrlBox() {
            document.getElementById("urlBox").style.display = "block";
            if (document.getElementById("fileBox").style.display == "block") {
                document.getElementById("fileBox").style.display = "none"
            }
        },
        showFileBox() {
            document.getElementById("fileBox").style.display = "block";
            if (document.getElementById("urlBox").style.display == "block") {
                document.getElementById("urlBox").style.display = "none"
            }
        },
        addGif() {

            let userId = localStorage.getItem("userId");
            let titre = document.getElementById("titre").value;

            if (titre !== "" && document.getElementById("titreErrMsg").textContent === "") {  

                if (document.getElementById("urlBox").style.display == "block") {
                    
                    let url = document.getElementById("url").value;

                    if (url !== "" && document.getElementById("urlErrMsg").textContent === "") {

                        fetch("http://localhost:3000/api/gifs/", {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "authorization": `${localStorage.getItem("token")}`
                        },
                        body: JSON.stringify({ titre, userId, url })
                        })
                        .then(res => res.json())
                        .catch(err => console.log(err.message))

                    } else {
                        alert("URL invalide.")
                    }

                } else if (document.getElementById("fileBox").style.display == "block") {

                    // let inputFile = document.getElementById("file");
                    // let data = new FormData();
                    // data.append('file', inputFile.files[0]);

                    fetch("http://localhost:3000/api/gifs/", {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "authorization": `${localStorage.getItem("token")}`
                        },
                        body: JSON.stringify({ titre, userId,  })
                    })
                    .then(res => res.json())
                    .catch(err => console.log(err.message))
                } else {
                    alert("Veuillez choisir un mode de saisie.")
                }
                document.getElementById("container").style.display = "none";
            } else {
                alert("Titre invalide.")
            }
            location.reload();
        }
    }
}
</script>

<style scoped>
#urlBox, #fileBox, #container {
    display: none;
}
</style>