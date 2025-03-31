<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style>
@font-face {
  font-family: "LogoFont";
  src: url("./assets/fonts/Horizon.otf");
}

@font-face {
  font-family: "Font";
  src: url("./assets/fonts/Poppins-Regular.woff");
}

* {
  padding: 0;
  margin: 0;
}

h, label, p, button {
  font-family: "Font";
}

</style>
