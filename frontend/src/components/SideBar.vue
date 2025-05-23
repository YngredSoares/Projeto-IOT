<template>
    <div>
        <nav class="bg-dark text-white vh-100 p-3" style="width: 250px;">
            <h4>Menu</h4>
            <ul class="nav flex-column">
            <li class="nav-item mb-2">
                <a href="#" class="nav-link text-white"><i class="bi bi-speedometer2"></i> Dashboard</a>
            </li>
            <li class="nav-item mb-2">
                <a href="#" class="nav-link text-white"><i class="bi bi-file-bar-graph"></i> Relatórios</a>
            </li>
            <li class="nav-item mb-2">
                <a href="#" class="nav-link text-white"><i class="bi bi-gear"></i> Configurações</a>
            </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style scoped>

.nav-link:hover {
  background-color: #495057;
  border-radius: 4px;
  text-decoration: none;
}
</style>
