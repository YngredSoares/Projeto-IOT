<template>
  <div :class="route.name === 'Login' ? 'layout-login' : 'layout'">
      <SideBar v-if="route.name !== 'Login'"/>

      <main :class="route.name === 'Login' ? 'main-content-login' : 'main-content'">
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
  padding: 2rem;
}

.layout-login {
  height: 100vh;
  display: flex;
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
