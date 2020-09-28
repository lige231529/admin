<template>
  <div class="left">
    <h3 class="logo">小U商城后台</h3>
    <!-- 菜单组件 -->
    <el-menu
    class="page-menu"
    background-color="#444"
    text-color="#fff"
    router
    :collapse="iscollapse"
    >
    <!-- 菜单加router属性，激活导航时，以Index作为path路由跳转 -->
        <el-menu-item index="/index"><i class="el-icon-house"></i> <span slot="title">后台首页</span></el-menu-item>
        <template v-for="(item,index) in menus" >
          <el-menu-item v-if="item.type==2" :key="index" :index="item.url"><i :class="item.icon"></i> <span slot="title">{{item.title}}</span></el-menu-item>
          <el-submenu v-else :index="index+''" :key="index">
            <template slot="title"><i :class="item.icon"></i><span slot="title">{{item.title}}</span></template>
            <el-menu-item :index="val.url" v-for="(val,idx) in item.children" :key='idx'>{{val.title}}</el-menu-item>
          </el-submenu>
        </template>
    </el-menu>
  </div>
</template>

<script>
import { mapState,mapGetters } from "vuex"
export default {
  components: {},
  data() {
    return {};
  },
  computed:{
    // menus的内容。。。。
    // icon:""
    // id:23
    // pid:22
    // status:1
    // title:"轮播图管理"
    // type:2
    // url:"/banner"
      ...mapState(["iscollapse"]),
      ...mapGetters({
        menus:"user/menus"
      })
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style scoped>
.logo {
  line-height: 60px;
  text-align: center;
  color: #fff;
  background-color: #666;
  white-space: nowrap;
  overflow: hidden;
}
.page-menu{
    border-right: none;
}
</style>
