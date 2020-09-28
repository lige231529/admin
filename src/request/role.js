import $axios from "@/common/http"
export async function getRole(){
   
    let res = await $axios.get("/rolelist")
    if(res.code==200){
        return res.list
    }else{
        return []
    }
}

export function addRole(data){
    return $axios.post('/roleadd',data)
}
export function editRole(data){
    return $axios.post('/roleedit',data)
}
export function delRole(id){
    return $axios.post('/roledelete',{id})
}
