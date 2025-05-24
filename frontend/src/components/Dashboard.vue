<template>
    <div class="row mt-3">
        <div class="card-body" style="height: 700px;">
        <Bar
            v-if="chartDataClean"
            :data="chartDataClean"
            :options="chartOptions"
        />
        </div>
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    components: { Bar },
    data() {
        return {
            relatorio: [],
            chartData: null,
            chartOptions: {
                responsive: true,
                plugins: {
                    legend: { display: true },
                    title: { display: true, text: 'Leitura de Sensores' }
                }
            }
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
                console.log("Valores: ", data)

                const labels = [];
                const valores = [];

                data.forEach(item => {
                    if (item.sensor && item.valor !== undefined) {
                        labels.push(item.sensor);
                        valores.push(item.valor);
                    }
                });

                this.chartData = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Valor do Sensor',
                            backgroundColor: '#42A5F5',
                            data: valores
                        }
                    ]
                };
            })
            .catch(err => {
                console.error(err);
            })
    },
    computed: {
        chartDataClean() {
            const cleaned = JSON.parse(JSON.stringify(this.chartData));
            console.log('📊 chartDataClean:', cleaned);
            return cleaned;
        }
    }
}
</script>