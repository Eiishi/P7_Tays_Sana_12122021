<template>
  <div id="nav">
    <router-link to="/">Se connecter</router-link> |
    <router-link to="/signup">S'inscrire</router-link>
  </div>
  <router-view/>
</template>

<style>
body {
  background-color: rgb(40, 40, 40);
  color: rgb(255, 255, 255);
}

h1 {
  margin: 30px 0;
}

button, .btn {
  cursor: pointer;
  width: 30%;
  margin: 20px;
  padding: 10px;
  border-radius: 30px;
  color: #fff;
  background-color: rgba(98, 81, 255, 0.664);
  border: 2px black solid;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.418);
  max-width: 290px;
}

button:hover, .btn:hover {
  background-color: rgba(61, 47, 194, 0.356);
}

.container {
  display: flex;
  gap: 15px;
}

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
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #fff;
}

#nav a.router-link-exact-active {
  color: rgba(98, 81, 255, 0.664);
}
</style>
