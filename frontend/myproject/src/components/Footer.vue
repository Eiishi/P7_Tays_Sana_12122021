<template>
    <footer>
        <a href="http://www.groupomania.fr">
        <img src="@/assets/icon-left-font-monochrome-white.png" alt="Logo de Groupomania">
        </a>
        <ul>
            <li>A propos</li>
            <a href="mailto:hello.groupomania@gmail.com">
            <li>Nous contacter</li>
            </a>
            <li>Conditions générales</li>
        </ul>
    </footer>
</template>

<script>
export default {
    name: "Footer",
    data() {
        return {}
    }
}
</script>

<style scoped>
footer img {
    height: 150px;
    margin: -30px 0;
}
footer ul {
    list-style-type: none;
    padding: 0px;
    margin: 0;
}
footer li {
    margin: 10px;
}
footer li:hover, footer img:hover {
    cursor: pointer;
    color: rgba(98, 81, 255, 0.664);
    text-decoration: underline;
}
footer {
    background-color: rgb(45, 45, 45);
    margin-top: 20px;
}
footer a {
    color: white;
}

@media (min-width : 690px) {
footer ul {
    display: flex;
    justify-content: space-around;
}
}
</style>