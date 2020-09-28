import $axios from "@/common/http"  

export async function getMenu() {
    let res = await $axios.get("/menulist?istree=1")
   
    if(res.code==200 && res.list){
        return res.list
    }else{
        return [];
    }
}

export function addMenu(data){
    return  $axios.post("/menuadd",data)
}

export function editMenu(data) {
    return $axios.post("/menuedit", data)
}

//  删除时传入数据是一个对象，id是一个属性
export function delMenu(id) {
    return $axios.post("/menudelete", {id})
}