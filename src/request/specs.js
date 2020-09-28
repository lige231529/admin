import $axios from "@/common/http"
export async function getSpecs(size = 3,page = 1) {

    let res = await $axios.get("/specslist",
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

export function addSpecs(data) {
    return $axios.post('/specsadd', data)
}
export function editSpecs(data) {
    return $axios.post('/specsedit', data)
}
export function delSpecs(id) {
    return $axios.post('/specsdelete', { id })
}
export async function getTotal() {
    let res = await $axios.get('/specscount')
    //    console.log(res);
    return res.list[0].total
}

