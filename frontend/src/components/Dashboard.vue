<template>
    <div style="width: 100%; height:600px ; margin: 0 auto;">
        <div class="card-body d-flex" style="height: 100%;">
            <component
                v-if="chartData"
                :is="selectedChart"
                :data="chartDataClean"
                :options="chartOptions"
            />
        </div>
    </div>
</template>

<script>
import { Bar, Line, Bubble, Pie } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement
} from 'chart.js'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement
)

export default {
    components: { Bar, Line, Bubble, Pie },
    data() {
        return {
            selectedChart: 'Bar',
            relatorio: [],
            chartData: null,
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
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
            return cleaned;
        }
    }
}
</script>