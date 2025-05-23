<template>
    <div>
            <h1>Relatório</h1>
            <ul>
            <li v-for="rel in relatorio" :key="rel.id">
                Sensor: {{ rel.sensor }} - Valor: {{ rel.valor }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                relatorio: []
            }
        },
        mounted() {
            fetch('/api/relatorio')
                .then(response => {
                    if (!response.ok) throw new Error('Erro ao buscar dados');
                    return response.json();
                })
                .then(data => {
                    this.relatorio = data;
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }
</script>

<style>

</style>