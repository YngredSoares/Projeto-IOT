<script setup>
  import HelloWorld from './components/HelloWorld.vue'
  import Relatorio from './components/Dashboard.vue'
  import SideBar from './components/SideBar.Vue'
</script>

<template>
  <div class="app-container d-flex" style="height: 100vh;">
    <SideBar />
    <!-- <div class="p-3 flex-grow-1"> -->
      <!-- <h1>Relatório</h1> -->
        <Relatorio/>
    <!-- </div> -->
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
