<template>
  <div class="d-flex justify-content-between ac-controls container mt-4">
    <div class="form-group">
      <label for="ac-select">Selecione o aparelho:</label>
        <select id="ac-select" class="form-control w-100">
          <div class="" v-for="ap in aparelhos" :key="ap.id"> 
            <option>{{ ap.nome_aparelho }}</option>
          </div>
        </select>
    </div>

    <div class="btn-group mt-3">
      <button class="btn btn-success"><i class="bi bi-power"></i> Ligar</button>
      <button class="btn btn-danger"><i class="bi bi-power"></i> Desligar</button>
      <button class="btn btn-primary">+ Temperatura</button>
      <button class="btn btn-secondary">- Temperatura</button>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'Controle',
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