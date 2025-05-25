<template>
    <div class="sidebar">
        <nav class="bg-dark text-white vh-100 p-3" style="width: 270px; align:">
            <div class="d-flex flex-row gap-1">
                <div class="d-flex user-info align-items-center p-2 gap-2">
                    <img src="../assets/vue.svg" alt="Foto de perfil" style="width:40px;" class="rounded-pill"> 
                </div>
                <div class="d-flex flex-column justify-content-center">
                    <h5 class="mb-0 text-white">Nome Usuário</h5>
                    <a href="#" class="text-info small">Editar perfil</a>
                </div>
            </div>
            <div class="menus">
                <div class="p-3">
                    <ul class="nav h5">
                        <h4 class="mb-3 m-2 h5">Menu</h4>
                    <li class="nav-item mb-3">
                        <a href="/" class="nav-link text-white"><i class="bi bi-speedometer2"></i> Dashboard</a>
                    </li>
                    <li class="nav-item mb-3">
                        <a href="/aparelhos" class="nav-link text-white"><i class="bi bi-motherboard"></i> Aparelhos</a>
                    </li>
                    <li class="nav-item mb-3">
                        <a href="#" class="nav-link text-white"><i class="bi bi-file-bar-graph"></i> Relatórios</a>
                    </li>
                    <li class="nav-item mb-2">
                        <a href="#" class="nav-link text-white"><i class="bi bi-gear"></i> Configurações</a>
                    </li>
                    </ul>
                </div>
                <div class="rodape-nav">
                    <ul class="nav h5 p-3">
                        <li class="nav-item mb-5">
                            <a href="#" class="nav-link text-white"><i class="bi bi-box-arrow-left"></i> Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
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

.sidebar {
    position: fixed;
    left: 0;
    top: 0;
}

.menus {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

a {
    text-decoration: none;
}

</style>
