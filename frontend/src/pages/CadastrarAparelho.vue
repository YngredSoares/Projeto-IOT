<template>
    <div class="container">
        <router-link to="/aparelhos" class="btn mt-3 ps-1 fs-5 d-flex">
            <i class="bi bi-arrow-left-circle"></i>Voltar
        </router-link>
        <form @submit.prevent="cadastrarAparelho">
            <h1 class="mt-3 mb-3 text-start">Cadastro de Aparelho</h1>
            <div class="row">
                <div class="col-sm-1 mb-3">
                    <label for="codigo" class="form-label">Código</label>
                    <input id="codigo" v-model="form.codigo" style="background-color:rgb(232, 231, 231)" type="text" class="form-control" name="codigo" value="">
                </div>
                <div class="col-sm-6 mb-3">
                    <label for="nome_aparelho" class="form-label required">Nome do aparelho</label>
                    <input id="nome_aparelho" v-model="form.nome_aparelho" type="text" class="form-control" name="nome_aparelho" value="">
                </div>
                <div class="col-sm-5 mb-3">
                    <label for="marca" class="form-label required">Marca</label>
                    <input id="marca" type="text" v-model="form.marca" class="form-control" name="marca" value="">
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6 mb-3">
                    <label for="modelo" class="form-label required">Modelo</label>
                    <input id="modelo" v-model="form.modelo" type="text" class="form-control" name="modelo" value="">
                </div>
                <div class="col-sm-6 mb-4">
                    <label for="local" class="form-label required">Local</label>
                    <input id="local" v-model="form.local" type="text" class="form-control" name="local" value="">
                </div>
            </div>
            <button type="submit" class="btn btn-success d-flex" id="cad-categoria-btn">Salvar</button>
        </form>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import Swal from 'sweetalert2'

    const form = ref({
    nome_aparelho: '',
    local: '',
    marca: '',
    modelo: '',
    temperatura_atual: 24,
    estado: true            
    })

    const cadastrarAparelho = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/aparelhos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form.value)
            })

            if (res.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Cadastrado!',
                    text: 'O aparelho foi cadastrado com sucesso!',
                }).then(() => {
                    window.location.href = '/aparelhos'
                })
            } else {
                const error = await res.json()
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: error.message || 'Ocorreu um erro ao cadastrar o aparelho.'
                })
            }
        } catch (err) {
            alert('Erro de conexão com o servidor.')
            console.error(err)
        }
    }
</script>

<style>
</style>