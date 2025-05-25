<template>

    <div class="container">
        <div class="row">
            <div class="col-md-4 mb-4 gap-4" v-for="ap in aparelhos" :key="ap.id">
                <div class="card p-4" style="width: 350px; height: 270px;">
                    <div class="card-body p-0 text-start">
                        <p class="mb-1">Nome</p>
                        <h2 class="card-title">{{ ap.nome_aparelho }}</h2>
                        <p class="card-text">Local: {{ ap.local }}</p>
                        <p class="card-text">Marca: {{ ap.marca }}</p>
                        <p class="card-text">Estado: {{ ap.estado }}</p>
                        <button class="btn btn-warning" @click="editarProduto(ap.id)">
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
    .cardas {
        display: flex;
        flex-direction: row;
    }
</style>