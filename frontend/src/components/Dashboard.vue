<template>
    <div class="dashboard-container">
        <div class="chart-card">
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
  components: { Line },
  data() {
    return {
      selectedChart: 'Line',
      relatorio: [],
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true },
          title: { display: true, text: 'Leitura de Sensores' }
        },
        scales: {
          x: {
            ticks: {
              display: false // esconde as labels no eixo X
            },
            grid: {
              display: false // opcional: esconde a grade do eixo X
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Valor'
            }
          }
        }
      }
    }
  },
  mounted() {
    fetch('/api/relatorio')
      .then(response => {
        if (!response.ok) throw new Error('Erro ao buscar dados')
        return response.json()
      })
      .then(data => {
        this.relatorio = data

        const sensores = []
        const labels = []

        data.forEach((item, index) => {
          const timestamp = item.data || `#${index}`

          // if (!labels.includes(timestamp)) {
          //   labels.push(timestamp)
          // }

          if (!sensores[item.sensor]) {
            if (item.sensor !== undefined) {
              sensores[item.sensor] = {
                label: item.sensor,
                data: [],
                backgroundColor: item.sensor === 'Luminosidade' ? '#42A5F5' : '#66BB6A',
                borderColor: item.sensor === 'Luminosidade' ? '#1E88E5' : '#388E3C',
                fill: false,
                tension: 0.3
              }
            }
          }

          // sensores[item.sensor].data.push(item.valor)
        })

        this.chartData = {
          // labels: labels,
          datasets: Object.values(sensores)
        }
      })
      .catch(err => {
        console.error(err)
      })
  },
  computed: {
    chartDataClean() {
      return JSON.parse(JSON.stringify(this.chartData))
    }
  }
}
</script>

<style>

.dashboard-container{
    width: 80%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
}

.chart-card{
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    padding: 1rem;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

</style>