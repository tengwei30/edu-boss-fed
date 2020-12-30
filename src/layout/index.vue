<template>
  <el-container>
    <el-aside width="200px"><AppAside /></el-aside>
    <el-container>
      <el-header>
        <AppHeader />
      </el-header>
      <el-main>
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
/* eslint-disable */
import Vue from 'vue';
import AppAside from './components/app-aside.vue'
import AppHeader from './components/app-header.vue'
export default Vue.extend({
  name: 'LayoutIndex',
  components: {
    AppAside,
    AppHeader
  }
});
</script>
<style lang="scss" scoped>
.el-container {
  min-width: 980px;
  min-height: 100vh;
}
.el-aside {
  background: #d3dce6;
}
.el-header {
  background: #ffffff;
}
.el-main {
  background: #e9eef3;
}
</style>
