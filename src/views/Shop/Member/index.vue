<template>
  <div>
    <!-- <el-button type="primary" @click="add">添加</el-button> -->
    <v-list @edit="edit" ref="list"></v-list>
    <v-info :info="info" ref="dialog" @update="update"></v-info>
  </div>
</template>

<script>
import VList from "./vlist"
import VInfo from './vinfo';
export default {
  components: {VList,VInfo},
  data() {
    return {
      info:{
        isAdd:false,
        isShow : false
      }
    };
  },
  methods: {
    update(){
      this.$refs.list.get_list()
    },
    edit(val){
      this.info.isShow = true
      this.info.isAdd = false
      this.$refs.dialog.setinfo(val)  //调用对话框的这个方法，把数据传过去回显
    }
  },
  created() {},
  mounted() {},
};
</script>

<style scoped>

</style>
