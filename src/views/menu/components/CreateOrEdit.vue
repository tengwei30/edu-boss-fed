<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ isEdit ? "编辑菜单" : "添加菜单" }}</span>
    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="菜单名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="菜单路径">
        <el-input v-model="form.href"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单">
        <el-select v-model="form.parentId" placeholder="请选择上级菜单">
          <el-option label="无上级菜单" :value="-1"></el-option>
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in parentMenuList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="前端图标">
        <el-radio-group v-model="form.shown">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="form.orderNum"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button v-if="!isEdit">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import Vue from "vue";
import { createOrUpdateMenu, getEditMenuInfos } from "@/services/menu";
export default Vue.extend({
  name: "CreateOrEditMenu",
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        parentId: -1, // -1 表示无上级菜单
        description: "123",
        href: "2323",
        icon: "123",
        name: "123",
        orderNum: 1,
        shown: false
      },
      parentMenuList: []
    };
  },
  created() {
    this.loadMenuInfos();
  },
  methods: {
    async loadMenuInfos() {
      const { data } = await getEditMenuInfos(this.$route.params.id || -1);
      console.log("菜单信息", data);
      if (data.data.menuInfo) {
        this.form = data.data.menuInfo;
      }
      if (data.code === "000000") {
        this.parentMenuList = data.data.parentMenuList;
      }
    },
    async onSubmit() {
      const { data } = await createOrUpdateMenu(this.form);
      console.log("表单提交", data);
      if (data.code === "000000") {
        this.$message.success("提交成功");
        this.$router.back();
      }
    }
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
