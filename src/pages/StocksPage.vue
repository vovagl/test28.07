<script setup>
import { ref, computed, onMounted } from 'vue'
import Chart from '@/components/Chart.vue'
import DataTable from '@/components/DataTable.vue'
import Filters from '@/components/Filters.vue'
import { getStocks } from '@/services/api'

const defaultDate = new Date().toISOString().slice(0, 10)
const filters = ref({ dateFrom: defaultDate })  

const items = ref([])
const loading = ref(false)
const columns = [
  { prop: 'warehouse_name', label: 'Склад' },
  { prop: 'quantity', label: 'Остаток' }
]

async function fetchData() {
  loading.value = true
  try {
    const { dateFrom } = filters.value
    const response = await getStocks({ dateFrom })
    items.value = response.data.data || []
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)

function onFilterChange(newFilters) {
  filters.value.dateFrom = newFilters.dateFrom
  fetchData()
}

const chartData = computed(() => {
  const map = {}
  items.value.forEach(item => {
    const warehouse = item.warehouse_name || 'неизвестно'
    const quantity = Number(item.quantity || 0)
    map[warehouse] = (map[warehouse] || 0) + quantity
  })
  return Object.entries(map).map(([label, value]) => ({ label, value }))
})
</script>

<template>
  <el-card>
    <Filters
      :initialDateFrom="filters.dateFrom"
      @change="onFilterChange"
    />

    <Chart :data="chartData" />

    <DataTable :items="items" :loading="loading" :columns="columns" />
  </el-card>
</template>
