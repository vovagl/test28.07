<script setup>
import { ref, computed, onMounted } from 'vue'
import Filters from '@/components/Filters.vue'
import DataTable from '@/components/DataTable.vue'
import Chart from '@/components/Chart.vue'
import { getOrders } from '@/services/api'

const defaultFrom = '2025-02-20'
const defaultTo = new Date().toISOString().slice(0, 10)

const filters = ref({ dateFrom: defaultFrom, dateTo: defaultTo })
const items = ref([])
const loading = ref(false)
const total = ref(0)
const limit = 20
const page = ref(1)

function onFilterChange(newFilters) {
  filters.value = {
    dateFrom: newFilters.dateFrom || defaultFrom,
    dateTo: newFilters.dateTo || defaultTo
  }
  page.value = 1
  fetchData()
}

async function fetchData() {
  loading.value = true
  try {
    const { dateFrom, dateTo } = filters.value
    const response = await getOrders({ dateFrom, dateTo, page: page.value, limit })
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
    const fullDate = item.date || item.orderDate || item.createdAt || 'неизвестно'
    const date = fullDate.slice(0, 10)
    const totalPrice = Number(item.total_price || 0)
    if (date !== 'неизвестно') {
      map[date] = (map[date] || 0) + totalPrice
    }
  })
  return Object.entries(map)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => new Date(a.label) - new Date(b.label))
})


const ordersByWarehouse = computed(() => {
  const map = {}
  items.value.forEach(item => {
    const warehouse = item.warehouse_name || 'неизвестно'
    map[warehouse] = (map[warehouse] || 0) + 1
  })
  return Object.entries(map).map(([warehouse, count]) => ({ warehouse, count }))
})

const onPageChange = (val) => {
  page.value = val
  fetchData()
}
</script>

<template>
  <el-card>
    <Filters
      :initialDateFrom="filters.dateFrom"
      :initialDateTo="filters.dateTo"
      @change="onFilterChange"
    />

    <Chart :data="chartData" />

    <DataTable :items="items" :loading="loading" />

    <el-pagination
      style="margin-top: 20px"
      :current-page="page"
      :page-size="limit"
      :total="total"
      layout="prev, pager, next"
      @current-change="onPageChange"
    />

    <el-card style="margin-top: 20px">
      <h3>Количество заказов по складам</h3>
      <el-table :data="ordersByWarehouse" style="width: 100%">
        <el-table-column prop="warehouse" label="Склад" />
        <el-table-column prop="count" label="Количество заказов" />
      </el-table>
    </el-card>
  </el-card>
</template>
