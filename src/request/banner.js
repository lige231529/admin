import $axios from "@/common/http"
export  async function getBanner(){
    let res =await $axios.get("/getbanner")
    if(res.code==200){
        return res.list
    }else{
        return []
    }
    
}
export function addBanner(data){
    return $axios.post("banneradd",data)
} 
export function editBanner(data){
    return $axios.post("banneredit",data)
} 
export function delBanner(id){
    return $axios.post("bannerdelete",{id})
} 