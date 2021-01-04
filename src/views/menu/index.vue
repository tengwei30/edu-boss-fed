<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({ name: 'menu-create' })">
          添加菜单
        </el-button>
        <el-button style="float: right; padding: 3px 0" type="text">
          操作按钮
        </el-button>
      </div>
      <el-table :data="menus" style="width: 100%">
        <el-table-column label="编号" type="index"></el-table-column>
        <el-table-column prop="name" label="菜单名称"></el-table-column>
        <el-table-column prop="level" label="菜单级数"></el-table-column>
        <el-table-column prop="icon" label="前端图标"></el-table-column>
        <el-table-column prop="orderNum" label="排序"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getAllMenus, delMenu } from "@/services/menu";

export default Vue.extend({
  name: "MenuIndex",
  data() {
    return {
      menus: []
    };
  },
  created() {
    this.loadAllMenus();
  },
  methods: {
    async loadAllMenus() {
      const { data } = await getAllMenus();
      console.log("全部菜单数据", data);
      if (data.code === "000000") {
        this.menus = data.data;
      }
    },
    handleEdit(item: any) {
      // 点击编辑跳转
      console.log("1");
      this.$router.push({
        name: "menu-edit",
        params: {
          id: item.id
        }
      });
    },
    handleDelete(item: any) {
      // 点击删除操作
      this.$confirm("确认删除嘛", "删除提示", {})
        .then(async () => {
          // 请求删除
          const { data } = await delMenu(item.id);
          if (data.code === "000000") {
            this.$message.success("删除成功");
            await this.loadAllMenus(); // 更新数据列表
          }
        })
        .catch(err => {
          this.$message;
          console.error("error ---> ", err);
        });
    }
  }
});
</script>

<style lang="scss" scoped></style>
