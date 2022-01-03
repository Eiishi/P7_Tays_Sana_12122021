<template>
  <div id="nav">
    <router-link to="/">Se connecter</router-link> |
    <router-link to="/signup">S'inscrire</router-link>
  </div>
  <router-view/>
</template>

<style>
a {
  text-decoration: none;
}

a:hover {
  cursor: pointer;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
