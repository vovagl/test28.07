<template>
  <div style="overflow-x: auto;">
    <div style="min-width: 800px; height: 300px;">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

const chartData = computed(() => {
  const safeData = props.data || []
  return {
    labels: safeData.map(d => d.label),
    datasets: [
      {
        label: 'Количество',
        backgroundColor: '#409EFF',
        borderColor: '#409EFF',
        fill: false,
        data: safeData.map(d => d.value)
      }
    ]
  }
})
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    }
  }
}


</script>
