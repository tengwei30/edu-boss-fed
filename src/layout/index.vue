<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
/* eslint-disable */
import Vue from 'vue';
export default Vue.extend({
  name: 'LayoutIndex'
});
</script>
<style lang="scss" scoped>
.el-aside {
  background: #d3dce6;
}
.el-header {
  background: #b3c0d1;
}
.el-main {
  background: #e9eef3;
}
</style>
