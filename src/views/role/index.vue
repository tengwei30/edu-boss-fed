<template>
  <div class="role">
    <role-list />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import RoleList from "./components/RoleList.vue";

export default Vue.extend({
  name: "Role",
  components: {
    RoleList
  }
});
</script>

<style lang="scss" scoped></style>
