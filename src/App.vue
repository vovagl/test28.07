<template>
  <el-container>
    <el-header>
      <el-menu :default-active="$route.path" mode="horizontal" router>
        <el-menu-item index="/incomes">Поступления</el-menu-item>
        <el-menu-item index="/orders">Заказы</el-menu-item>
        <el-menu-item index="/sales">Продажи</el-menu-item>
        <el-menu-item index="/stocks">Остатки</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>
