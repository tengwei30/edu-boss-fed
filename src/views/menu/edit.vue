<template>
  <div>
    <create-or-edit is-edit />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CreateOrEdit from "./components/CreateOrEdit.vue";
export default Vue.extend({
  name: "EditCreate",
  components: {
    CreateOrEdit
  },
  data() {
    return {};
  }
});
</script>

<style scoped lang="scss">
.menu-create {
  background: #ffffff;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 8px;
}
</style>
