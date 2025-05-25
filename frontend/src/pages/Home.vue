<script setup>
  import Dashboard from '../components/Dashboard.vue';
  import Controle from '../components/Controle.vue'

</script>

<template>
    <!-- Conteúdo principal -->
    <main class="main-home me-2">
      <h2 class="text-start">Controle de Ar-Condicionado</h2>
      <Controle/>
      <div class="chart-container mt-3">
        <div class="card-body">
          <Dashboard />
        </div>
      </div>
    </main>
</template>

<style scoped>  

</style>
