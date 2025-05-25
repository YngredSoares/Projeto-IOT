<script setup>
  import HelloWorld from './components/HelloWorld.vue'
  import Dashboard from './components/Dashboard.vue'
  import SideBar from './components/SideBar.Vue'
  import Controle from './components/Controle.vue'
</script>

<template>
  <div class="layout d-flex justify-content-end me-1">
    <!-- Sidebar -->
    <SideBar />

    <!-- Conteúdo principal -->
    <main class="main-content">
      <h2 class="text-start">Controle de Ar-Condicionado</h2>
      <Controle/>
      <div class="chart-container mt-3">
        <div class="card-body">
          <Dashboard />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>  
  .main-content {
    width: 80%;
    display: flex;
    flex-direction: column;
  }

  .chart-container {
    width: 100%;
    height: 600px;
  }

  .card-body {
    height: 100%;
  }
</style>
