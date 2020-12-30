<template>
  <div class="login">
    <el-form
      class="login-form"
      ref="form"
      label-position="top"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          @click="onSubmit"
          :loading="isLoginLoading"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Form } from "element-ui";
import { login } from "@/services/user";
export default Vue.extend({
  name: "LoginIndex",
  data() {
    return {
      form: {
        phone: "15510792995",
        password: "111111"
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1\d{10}/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ]
      },
      isLoginLoading: false
    };
  },
  methods: {
    async onSubmit() {
      try {
        // 表单验证
        // 转类型来躲过ts的验证
        await (this.$refs.form as Form).validate();
        this.isLoginLoading = true;
        const { data } = await login(this.form);
        if (data.state !== 1) {
          this.$message.error(data.message);
        } else {
          // 1、记录用户登录成功的状态（放到vuex容器中）
          this.$store.commit("setUser", data.content);
          // 登录成功跳转之前的页面或者首页
          this.$router.push((this.$route.query.redirect as string) || "/");
          // this.$router.push({
          //   name: "home"
          // });
          this.$message.success("登录成功");
        }
        // 结束登录按钮的loading
        this.isLoginLoading = false;
      } catch (error) {
        console.error("登录失败", error);
      }
    }
  }
});
</script>
<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-form {
    background: #ffffff;
    padding: 20px;
    border-radius: 5px;
    width: 300px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
