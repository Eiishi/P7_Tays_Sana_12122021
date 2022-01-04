<template>
    <Header/>
    <PageProfil/>
    <Footer/>
</template>

<script>
import Header from '../components/Header.vue'
import PageProfil from "../components/PageProfil.vue"
import Footer from '../components/Footer.vue'

export default {
    name: "Profil",
    components: {
        PageProfil,
        Header,
        Footer
    }
}
</script>
