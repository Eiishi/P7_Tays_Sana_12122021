<template>
    <Header/>
    <MonProfil/>
    <PostGif/>
    <Main/>
    <Gif/>
    <Footer/>
</template>

<script>
import Header from "../components/Header.vue"
import MonProfil from "../components/MonProfil.vue"
import PostGif from "../components/PostGif.vue"
import Main from "../components/Main.vue"
import Gif from "../components/Gif.vue"
import Footer from "../components/Footer.vue"

export default {
    name: 'Accueil',
    components: {
        Header, MonProfil, PostGif, Main, Gif, Footer
    }
}
</script>

