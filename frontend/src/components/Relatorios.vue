<template>
    <table class="table table-striped">
    <thead>
        <tr>
        <th scope="col" class="text-start">Sensor</th>
        <th scope="col">Valor</th>
        <th scope="col">Data/Hora</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="rel in relatorio" :key="rel.id">
        <td class="text-start">{{ rel.sensor }}</td>
        <td>{{ rel.valor }}</td>
        <td>{{ formatarData(rel.timestamp) }}</td>
        </tr>
    </tbody>
    </table>
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
                    this.relatorio.timestamp
                })
                .catch(err => {
                    console.error(err);
                })
        },
        props: ['rel'],
            methods: {
                formatarData(ts) {
                    const data = new Date(ts);
                    return data.toLocaleString();
                }
            }
    }
</script>

<style>

</style>