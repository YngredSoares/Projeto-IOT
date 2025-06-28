<template>
  <div class="layout">
      <SideBar v-if="route.name !== 'Login'"/>

      <main v-if="route.name == 'Login'" class="main-content-login">
        <router-view />
      </main>
      <main v-else class="main-content">
        <router-view />
      </main>
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router'
  import SideBar from './components/SideBar.vue'

  const route = useRoute()
</script>

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

.main-content-login {
    width: 100%;
    display: flex;
    flex-direction: column;
}
</style>
