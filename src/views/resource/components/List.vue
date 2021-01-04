<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form
        :inline="true"
        ref="form"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="资源名称" prop="name">
          <el-input
            v-model="formInline.name"
            placeholder="请输入资源名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="资源路径" prop="url">
          <el-input
            v-model="formInline.url"
            placeholder="请输入资源路径"
          ></el-input>
        </el-form-item>
        <el-form-item label="资源分类" prop="categoryId">
          <el-select
            v-model="formInline.categoryId"
            clearable
            placeholder="请选择"
          >
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in resourcesCategories"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="isLoading" @click="onSubmit"
            >查询搜索</el-button
          >
          <el-button type="default" :disabled="isLoading" @click="onReset"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="resources"
      v-loading="isLoading"
      style="width: 100%; margin-bottom: 20px;"
    >
      <el-table-column label="编号" type="index"></el-table-column>
      <el-table-column prop="name" label="资源名称"></el-table-column>
      <el-table-column prop="url" label="资源路径"></el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        width="180"
      ></el-table-column>
      <el-table-column prop="createdTime" label="添加时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--  total --- 总记录数; page-size 每页大小  -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="formInline.current"
      :disabled="isLoading"
      :page-sizes="[5, 10, 20]"
      :page-size="formInline.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    >
    </el-pagination>
  </el-card>
</template>

<script lang="ts">
import Vue from "vue";
import { getResourcePage } from "@/services/resource";
import { getResourceCategories } from "@/services/resource-category";
import { Form } from "element-ui";

export default Vue.extend({
  name: "ResourceList",
  data() {
    return {
      resources: [],
      resourcesCategories: [],
      formInline: {
        name: "",
        url: "",
        categoryId: null, // 资源分类
        current: 1,
        size: 5
      },
      totalCount: 0,
      isLoading: true
    };
  },
  created() {
    this.loadResources();
    this.loadResourceCategories();
  },
  methods: {
    async loadResourceCategories() {
      const { data } = await getResourceCategories();
      console.log("category", data);
      this.resourcesCategories = data.data;
    },
    async loadResources() {
      this.isLoading = true;
      const { data } = await getResourcePage(this.formInline);
      this.resources = data.data.records;
      this.totalCount = data.data.total;
      this.isLoading = false;
    },
    onSubmit() {
      console.log("submit!");
      this.formInline.current = 1;
      this.loadResources();
    },
    onReset() {
      (this.$refs.form as Form).resetFields();
    },
    handleEdit(item: any) {
      // 点击编辑跳转
      console.log("1", item);
    },
    handleDelete(item: any) {
      // 点击删除操作
      console.log("2", item);
      this.$confirm("确认删除嘛", "删除提示", {})
        .then(async () => {
          // 请求删除
        })
        .catch(err => {
          this.$message;
          console.error("error ---> ", err);
        });
    },
    handleSizeChange(val: number) {
      console.log(`每页 ${val} 条`);
      this.formInline.size = val;
      this.formInline.current = 1;
      this.loadResources();
    },
    handleCurrentChange(val: number) {
      console.log(`当前页: ${val}`);
      this.formInline.current = val; // 修改当前页码
      this.loadResources();
    }
  }
});
</script>

<style lang="scss" scoped></style>
