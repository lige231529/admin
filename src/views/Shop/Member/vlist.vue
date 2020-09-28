<template>
<div >
  <el-table :data="memberlist" style="width: 100%">
    <el-table-column prop="uid" label="用户ID" width="180"></el-table-column>
    <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
    <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
    <el-table-column prop="addtime" label="注册日期" width="180">
       <template slot-scope="scope">
            {{scope.row.addtime|getTime('YYYY-MM-DD')}}
       </template>
    </el-table-column>
    <el-table-column label="操作">
        <template slot-scope="scope">
           <el-button type="primary" icon="el-icon-edit" @click="edit(scope.row)" size="small"></el-button>
        </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import {getMember} from "@/request/member"
export default {
  components: {},
  data() {
        return {
            memberlist:[]
        }
      },
    methods: {
      //重新获取列表数据的方法，更新
      async get_list(){
        let res =await getMember();
        this.memberlist = res;
        },
      edit(val){
        //   console.log(val);     
          this.$emit("edit",{...val})
      }
  },
  mounted() {
     // 页面一进来渲染一次
      this.get_list()
  }
};
</script>

<style scoped>
</style>
