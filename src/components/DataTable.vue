<template>
  <el-table :data="items" style="width: 100%" :loading="loading">
    <el-table-column
      v-for="col in columns"
      :key="col.prop"
      :prop="col.prop"
      :label="col.label"
      :width="col.width"
    />
  </el-table>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  items: Array,
  loading: Boolean,
  columns: Array,
});
</script>
