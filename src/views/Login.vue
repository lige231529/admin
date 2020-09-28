<template>
  <div class="login">
    <el-row class="login_bg">
      <el-col :span="8" class="login-box">
        <h3>小U商城管理系统</h3>
        <el-form :model="forminfo" ref="form" :rules="rules">
          <el-form-item prop="username">
            <el-input v-model="forminfo.username" placeholder="请输入用户名">
              <!--输入框前面的小图标，利用插槽添加图标组件  -->
              <template slot="prepend">
                <i class="el-icon-user"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="forminfo.password" show-password placeholder="请输入密码">
              <template slot="prepend">
                <i class="el-icon-lock"></i>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="login-btn" @click="submit">立即登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      forminfo: {
        username: "小呆呆",
        password: "123"
      },
      rules: {
        // 验证规则对象
        username: [{ required: true, message: "必填！", trigger: "blur" }],
        password: [{ required: true, message: "必填！", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions({
      login: "user/login"
    }),
    submit() {
      //   表单验证
      this.$refs.form.validate(valid => {
        if (valid) {
          this.login(this.forminfo);
        }
      });
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped>
.login_bg {
  width: 100vm;
  height: 100vh;
  /* 设置弹性盒目的，让登录小盒子居中 */
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/img/bg_01.jpg");
  background-size: 100% 100%;
}
.login-box {
  background-color: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  padding: 30px 40px;
  border-radius: 5px;
}
.login-box h3 {
  line-height: 40px;
  text-align: center;
  margin-bottom: 20px;
}
.login-btn {
  display: block;
  width: 100%;
}
</style>
