<template>
    <Header/>
    <MonProfil/>
    <PostGif/>
    <Gif/>
    <Footer/>
</template>

<script>
import Header from "../components/Header.vue"
import MonProfil from "../components/MonProfil.vue"
import PostGif from "../components/PostGif.vue"
import Gif from "../components/Gif.vue"
import Footer from "../components/Footer.vue"

export default {
    name: 'Accueil',
    components: {
        Header, MonProfil, PostGif, Gif, Footer
    }
}
</script>

