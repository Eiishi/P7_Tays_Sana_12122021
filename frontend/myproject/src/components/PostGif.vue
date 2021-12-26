<template>
    <!-- <font-awesome-icon icon="fa-regular fa-circle-plus" /> -->
    <p @click="showContainer">+</p>
    <div id="container">
        <h2>Ajouter un gif</h2>
        <div>
            <label for="titre">Titre :</label>
            <input type="text" name="titre" id="titre">
            <button @click="showUrlBox">Saisir une URL</button> <button @click="showFileBox">Ajouter un fichier</button>
            <div id="urlBox">
            <input type="text" name="url" id="url">
            </div>
            <div id="fileBox">
            <input type="file" name="file" id="file">
            </div>
            <button @click="addGif">Ajouter</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PostGif',
    data() {
        return {
            gifs: []
        }
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
            fetch("http://localhost:3000/api/gifs/")
            .then(res => res.json())
            .then(data => this.gifs = data)

            if (document.getElementById("urlBox").style.display == "block") {
                let userId = JSON.parse(localStorage.getItem("userId"));

                let titre = document.getElementById("titre").value;
                let url = document.getElementById("url").value;

                fetch("http://localhost:3000/api/gifs/", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ titre, userId, url })
                })
                .then(res => res.json())
                .then(gif => this.gifs.push(gif))
                .catch(err => console.log(err.message))

            } else if (document.getElementById("fileBox").style.display == "block") {
                let userId = JSON.parse(localStorage.getItem("userId"));

                let titre = document.getElementById("titre").value;
                let file = document.getElementById("file").value;

                fetch("http://localhost:3000/api/gifs/", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ titre, userId, file })
                })
                .then(res => res.json())
                .catch(err => console.log(err.message))
            }
            document.getElementById("container").style.display = "none";
        }
    }
}
</script>

<style scoped>
#urlBox, #fileBox {
    display: none;
}
</style>