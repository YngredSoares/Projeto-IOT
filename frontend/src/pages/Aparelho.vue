<template>
    <div class="container-fluidmb-5">
        <div class="d-flex justify-content-between align-items-center mt-3">
            <h1>Lista de Aparelhos</h1>
        </div>
        <div class="form-group d-flex align-items-center mt-4 mb-4">
            <form action="#" method="GET" class="d-flex align-items-center">
                <input type="text" class="form-control me-1" name="filtro" value="" placeholder="Consulta">
                <button type="button" class="btn btn-danger d-flex align-items-center"><i class="bi bi-eraser-fill"></i></button>
                <button type="submit" class="btn btn-primary d-flex align-items-center ms-1">
                    Pesquisar
                    <i class="bi bi-search ms-1"></i>
                </button>
            </form>
            <button class="btn btn-success ms-2 d-flex justify-content-end" @click="">
                Cadastrar
                <i class="bi bi-plus-circle ms-1"></i>
            </button>
        </div>
        <div class="row">
            <div class="col-md-4 mb-4 gap-4" v-for="ap in aparelhos" :key="ap.id">
                <div class="card p-4" style="width: 350px; height: 270px;">
                    <div class="card-body p-0 text-start">
                        <p class="mb-1">Nome</p>
                        <h2 class="card-title">{{ ap.codigo }} - {{ ap.nome_aparelho }}</h2>
                        <p class="card-text">Local: {{ ap.local }}</p>
                        <p class="card-text">Marca: {{ ap.marca }}</p>
                        <p class="card-text">Estado: {{ ap.estado }}</p>
                        <button class="btn btn-warning me-2" @click="editarProduto(ap.id)">
                        <i class="bi bi-pencil-square"></i>
                        </button>
                        <button class="btn btn-danger" @click="deletarProduto(ap.id)">
                        <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                aparelhos: []
            }
        },
        mounted() {
            fetch('/api/aparelhos')
                .then(response => {
                    if (!response.ok) throw new Error('Erro ao buscar dados');
                    return response.json();
                })
                .then(data => {
                    this.aparelhos = data
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }
</script>

<style>

</style>