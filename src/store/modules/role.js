// role小仓库
import { getRole } from "@/request/role"
export default {
    namespaced: true,
    state: {
        rolelist: []
    },
    getters: {
        rolelist: state => state.rolelist
    },
    mutations: {
        SET_LIST(state, data) {
            state.rolelist = data         
        }
    },
    actions: {
        // 请求数据,getMenu是真正的axios请求
        async get_role_list({ commit }) {
            let res = await getRole()
           if(!res){
            res=[]
           }  
            // 异步等到数据请求，然后调用mutations中的同步函数，把参数传过去，修改rolelist
            commit("SET_LIST", res)
        }
    },
}
