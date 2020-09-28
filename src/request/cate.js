import $axios from "@/common/http"  

export async function getCate() {
    let res = await $axios.get("/catelist?istree=1")
   
    if(res.code==200 && res.list){
        return res.list
    }else{
        return [];
    }
}

export function addCate(data){
    return  $axios.post("/cateadd",data)
}

export function editCate(data) {
    return $axios.post("/cateedit", data)
}

//  删除时传入数据是一个对象，id是一个属性
export function delCate(id) {
    return $axios.post("/catedelete", {id})
}
