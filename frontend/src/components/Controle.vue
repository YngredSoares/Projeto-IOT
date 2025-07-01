<template>
  <div class="d-flex justify-content-between align-items-start ac-controls container mt-4">
    <div class="form-group me-3">
      <label for="ac-select">Selecione o aparelho:</label>
        <select id="ac-select" class="form-control w-100">
          <option v-for="ap in aparelhos" :key="ap.id">{{ ap.nome_aparelho }}</option>
        </select>
    </div>

    <div class="ac-buttons mt-3">
      <button class="btn btn-success" @click="enviarComando('ligar_ar')">
        <i class="bi bi-power"></i> Ligar
      </button>
      <button class="btn btn-danger" @click="enviarComando('desligar_ar')">
        <i class="bi bi-power"></i> Desligar
      </button>
    </div>
  </div>
</template>

<script>
    import axios from 'axios'
    import Swal from 'sweetalert2'

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
        },
        methods: {
          enviarComando(comando) {
            axios.post('/api/comando', { comando })
              .then(response => {
                console.log("Comando enviado:", response.data);
                
                if (comando == 'ligar_ar') {
                  Swal.fire("o Ar está sendo ligado!");
                } else {
                  Swal.fire("o Ar está sendo desligado!");
                }
              })
              .catch(err => {
                console.error("Erro ao enviar comando:", err);
              });
          }
        }
    }
</script>

<style>
.ac-buttons button{
  border-radius: 8px;
}

.ac-buttons{
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

</style>