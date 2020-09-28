<template>
  <div>
    <el-button type="primary" @click="add">添加轮播图</el-button>
    <v-list @edit="edit" ref="list"></v-list>
    <v-info :info="info" ref="dialog"></v-info>
  </div>
</template>

<script>
import VList from "./vlist"
import VInfo from "./vinfo"
export default {
  components: {VList,VInfo},
  data() {
    return {
      info:{
        isAdd:false,
        isShow:false
      }
    };
  },
  methods: {
    update(){
      this.$refs.list.get_list()
    },
    add(){
      this.info.isAdd  = true;
      this.info.isShow=true
    },
    edit(val){
     this.info.isShow = true
     this.$refs.dialog.setinfo(val)
    }
  },
  created() {},
  mounted() {},
};
</script>

<style scoped>

</style>
