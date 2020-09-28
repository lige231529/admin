<template>
  <div class="layout" >
    <el-container class="page">
      <!-- 左侧边栏 -->
      <el-aside  class="page-aside" :width="iscollapse ? '60px':'220px'">
        <!-- 左侧边栏单独作为子组件 -->
        <left/>
      </el-aside>
      <!-- 右边主体部分 -->
      <el-container class="page-content">
        <el-header class="page-header">
          <!-- 右侧头部单独作为子组件 -->
          <top/>
        </el-header>
        <el-main class="main">
          <Tagslist/>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import left from "./left"
import top from "./top"
import {mapState} from "vuex"
import Tagslist from "../Layout/Tagslist"
export default {
  components: {
    left,top,Tagslist
  },
  data() {
    return {};
  },
  computed:{
    ...mapState(["iscollapse"])
  },
  
  methods: {},
  created() {
   
  },
  mounted() {
  }
};
</script>

<style scoped>
.el-main{
  padding: 5px 20px 20px 20px;
}

.page{
  width: 100vw;
  height: 100vh;
}
.page-aside{
  height: 100%;
  background-color: #444;
}
.page-content{

  height: 100%;
  background-color: #f7f7f7;
}
.page-header{
 background-color: #fff;
 box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
}

</style>
