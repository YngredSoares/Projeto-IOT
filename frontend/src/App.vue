<script setup>
  import HelloWorld from './components/HelloWorld.vue'
  import Dashboard from './components/Dashboard.vue'
  import SideBar from './components/SideBar.Vue'
</script>

<template>
  <div class="layout d-flex">
    <!-- Sidebar -->
    <SideBar />

    <!-- Conteúdo principal -->
    <main class="main-content">
      <div class="chart-container">
        <div class="card-body">
          <Dashboard />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.main-content {
  margin-left: 220px; /* largura da sidebar */
  /* height: 100vh; */
  /* width: calc(100% - 270px); */
  display: flex;
  justify-content: center; 
  align-items: center;
}

.chart-container {
  width: 100%;
  max-width: 1000px;
  height: 600px;
}

.card-body {
  height: 100%;
}
</style>
