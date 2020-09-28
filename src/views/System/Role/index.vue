<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-info :info="info" ref="dialog"></v-info>
  </div>
  

</template>
<script>

import VList from "./vlist"
import VInfo from "./vinfo"
export default {
    data(){
        return{ 
          info:{
            isAdd:false,
            isShow:false,
          }
         }
    },
   
    
    created(){},
    methods:{
      // 添加按钮
      add(){
        this.info.isAdd=true;
        this.info.isShow=true; 
      },
      edit(val){
        this.info.isAdd=false;
        this.info.isShow=true;
        // console.log(val);
        // console.log(this.$refs.dialog);
        
        this.$refs.dialog.setinfo(val)//从list中带过来的数据再传给info
        // 子传父----父传子
      }
    },
    components:{
      VList,
      VInfo
    }
}
</script>
<style scoped>
</style>