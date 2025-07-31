<template>
  <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
    <el-date-picker
      v-model="local.dateFrom"
      type="date"
      format="YYYY-MM-DD"
      value-format="YYYY-MM-DD"
      placeholder="Дата от"
    />
    <el-date-picker
      v-model="local.dateTo"
      type="date"
      format="YYYY-MM-DD"
      value-format="YYYY-MM-DD"
      placeholder="Дата до"
    />
    <el-button type="primary" @click="applyFilters">Применить</el-button>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['change'])

const props = defineProps({
  initialDateFrom: String,
  initialDateTo: String
})

const local = reactive({
  dateFrom: props.initialDateFrom,
  dateTo: props.initialDateTo
})

function applyFilters() {
  emit('change', { ...local })
}
</script>
