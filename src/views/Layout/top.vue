<template>
  <div class="header">
    <div class="left">
      <el-button plain  :icon="iscollapse?'el-icon-s-unfold':'el-icon-s-fold'" size="small" @click="TOOGLE"></el-button>
      <!-- <el-button plain v-else icon="el-icon-s-fold" size="small" @click="TOOGLE"></el-button> -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="mbx">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 返回按钮 -->
       <el-button size="mini" v-if="$route.path!='/index'"  @click="$router.back()" icon="el-icon-back" circle></el-button>
    </div>
    <div class="right">
        <!-- 右侧登录下拉菜单 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          欢迎：{{username}} !
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="Fullscreen"> <i class="el-icon-full-screen"></i>{{isFullscreen?'退出全屏':'全屏'}}</el-dropdown-item>
          <el-dropdown-item @click.native="quit" ><i class="el-icon-switch-button"></i> 退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations,mapGetters,mapActions} from "vuex"
import screenfull from 'screenfull'
export default {
  components: {},
  data() {
    return {
      isFullscreen: false
    };
  },
  computed:{
      ...mapState(["iscollapse"]),
      ...mapGetters({
       username:"user/username"
      })
  },
  methods: {
      ...mapMutations({
        TOOGLE:"TOOGLE",
      }),
      ...mapActions({
        quit:"user/quit"
      }),
      Fullscreen(){
         if (!screenfull.isEnabled) {
          this.$message("您的电脑不支持全屏")
          return false
        }
        this.isFullscreen = !this.isFullscreen;
         screenfull.toggle()
      }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped>
.header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.header .left {
  display: flex;
  align-items: center;
}
/* 面包屑导航 */
.header .mbx {
  margin: 0 20px;
}
</style>
