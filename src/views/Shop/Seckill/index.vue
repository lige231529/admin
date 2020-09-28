<template>
 <div>
    <el-button type="primary" @click="add">添加活动</el-button>
 
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
        isShow:false,
        isAdd:false
      }
    };
  },
  methods: {
    update(){
      this.$refs.list.get_list()
    },
    add(){
      this.info.isShow=true,
      this.info.isAdd=true
    },
    edit(val){
      this.info.isAdd=false;
      this.info.isShow=true;
      // console.log(val);  列表那里传来的活动数据
      this.$refs.dialog.setinfo(val)
      
    }
  },
  created() {},
  mounted() {},
};
</script>

<style scoped>

</style>
