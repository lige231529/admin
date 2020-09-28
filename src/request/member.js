import $axios from "@/common/http"
// 1获取会员列表数据
export async function getMember(){
  let res = await $axios.get("/memberlist")
  if (res.code==200){
      return res.list;
  }else{
      return []
  }
  
}
// 2会员编辑
export function editMember(data){
    return $axios.post("/memberedit",data)
}