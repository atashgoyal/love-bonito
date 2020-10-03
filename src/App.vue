<template>
  <div id="app">
    <header class="header">
      <h1>The Rick and Morty API</h1>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@font-face {
  font-family: "Pacifico";
  font-style: normal;
  font-weight: 400;
  src: local("Pacifico Regular"), local("Pacifico-Regular"),
    url(https://fonts.gstatic.com/s/pacifico/v12/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.woff2)
      format("woff2");
  font-display: swap;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.header {
  background: gainsboro;
}
</style>
