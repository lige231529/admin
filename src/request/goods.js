import $axios from "@/common/http"
export async function getGoods(size = 3,page = 1) {

    let res = await $axios.get("/goodslist",
        {
            params: {
                size,
                page
            }
        }
    )
    if (res.code == 200) {
        return res.list
    } else {
        return []
    }
}

export function addGoods(data) {
    return $axios.post('/goodsadd', data)
}
export function editGoods(data) {
    return $axios.post('/goodsedit', data)
}
export function delGoods(id) {
    return $axios.post('/goodsdelete', { id })
}
export async function getTotal() {
    let res = await $axios.get('/goodscount')
    //    console.log(res);
    return res.list[0].total
}
export  function getInfo(id){
    return $axios.get("/gooodsinfo",{id})   
}

