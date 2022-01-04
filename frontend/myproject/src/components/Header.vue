<template>
    <header>
        <img src="@/assets/icon.png" alt="Logo de Groupomania">
        <h1>Gagomania</h1>
    </header>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {}
    }
}
</script>

<style scoped>
header img {
    height: 50px;
    border-radius: 50px;
    border: 3px rgba(98, 81, 255, 0.664) solid;
}
header {
    background-color: rgb(45, 45, 45);
    padding: 1px 0px;
}
</style>