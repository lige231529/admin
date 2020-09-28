import $axios from "@/common/http" 
export async function getSeck(){
   let res = await $axios.get("/secklist") 
   if(res.code==200){
       return res.list     
   }else{
       return []
   }
}
export function addSeck(data){
   return  $axios.post("/seckadd",data)
}
export function editSeck(data){
    return $axios.post("/seckedit",data)
 }
 export function delSeck(id){
    return $axios.post("/seckdelete",{id})
 }
