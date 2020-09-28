import Vue from "vue"
import Vuex from "vuex"
import menu from './modules/menu'
import role from './modules/role'
import user from './modules/user'
import cate from './modules/cate'
import specs from './modules/specs'
import goods from './modules/goods'
import tagview from './modules/tagview'
Vue.use(Vuex)
let store = new Vuex.Store({
    state:{
        iscollapse:false
    },
    getters:{

    },
    mutations:{
        TOOGLE(state){
            state.iscollapse = !state.iscollapse
        }
    },
    actions:{

    },
    modules:{
        menu,role,user,cate,specs,goods,tagview
    }
})
export default store;