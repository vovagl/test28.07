<script setup>
import { ref, computed, onMounted } from 'vue'
import Filters from '@/components/Filters.vue'
import DataTable from '@/components/DataTable.vue'
import Chart from '@/components/Chart.vue'
import { getSales } from '@/services/api'

const defaultFrom = '2025-02-20'
const defaultTo = new Date().toISOString().slice(0, 10)

const filters = ref({ dateFrom: defaultFrom, dateTo: defaultTo })
const items = ref([])
const loading = ref(false)
const total = ref(0)
const limit = 20
const page = ref(1)
const columns = [
  { prop: 'date', label: 'Дата' },
  { prop: 'total_price', label: 'Сумма' },
  { prop: 'for_pay', label: 'К выплате' },
  { prop: 'warehouse_name', label: 'Склад' }
]

function onFilterChange(newFilters) {
  filters.value = {
    dateFrom: newFilters.dateFrom || defaultFrom,
    dateTo: newFilters.dateTo || defaultTo
  }
  page.value = 1
  fetchData()
}

const handlePageChange = (val) => {
  page.value = val
  fetchData()
}

async function fetchData() {
  loading.value = true
  try {
    const { dateFrom, dateTo } = filters.value
    const response = await getSales({ dateFrom, dateTo, page: page.value, limit })
    items.value = response.data.data || []
    total.value = response.data.meta?.total || 0
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)

const chartData = computed(() => {
  const map = {}
  items.value.forEach(item => {
    const date = item.date || 'неизвестно'
    const value = Number(item.for_pay || item.total_price || 0)
    map[date] = (map[date] || 0) + value
  })
  return Object.entries(map)
    .map(([label, value]) => ({ label, value }))
    .sort((a,b) => new Date(a.label) - new Date(b.label))
})

</script>

<template>
  <el-card>
    <Filters
      :initialDateFrom="filters.dateFrom"
      :initialDateTo="filters.dateTo"
      @change="onFilterChange"
    />

    <Chart :data="chartData" />
<h3>Количество продаж по складам</h3>
    <DataTable :items="items" :loading="loading" :columns="columns" />
    <el-pagination
      style="margin-top: 20px"
      :current-page="page"
      :page-size="limit"
      :total="total"
      layout="prev, pager, next"
      @current-change="handlePageChange"
    />


  </el-card>
</template>
