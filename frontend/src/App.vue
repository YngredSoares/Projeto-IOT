<script setup>
  import SideBar from './components/SideBar.Vue'
</script>

<template>
  <div class="layout">
      <SideBar />
      <main class="main-content">
        <router-view />
      </main>
  </div>
</template>

<style scoped>  
.layout {
  height: 100vh;
  display: flex;
  justify-content: end;
}

.main-content {
    width: 80%;
    display: flex;
    flex-direction: column;
}
</style>
