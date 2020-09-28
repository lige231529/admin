import router from "@/router"
let taglist = localStorage.getItem("taglist")?JSON.parse(localStorage.getItem("taglist")):[]
export default{
    namespaced:true,
    state:{
        taglist:taglist //标签数组
    },
    getters:{
        taglist: state=>state.taglist
    },
    mutations:{
        SET_TAGS(state,route){
            // 判断标签数组中是否已经存在点中的标签，若存在，就不添加了
            let isExist = state.taglist.some(val=>val.path===route.fullPath)
            if(!isExist){
                state.taglist.push({
                    name:route.meta.title,
                    path:route.fullPath
                }),
                localStorage.setItem("taglist",JSON.stringify(state.taglist))
            }
            
        },
        //    1   关闭某一个标签
        // 思路：不是激活的，删完之后啥事没有，如果是激活的，删完之后往后走，但是由于是删完之后又是新的数组，所以
        DEL_TAG(state,{index,isActive}){
            state.taglist.splice(index,1)
            // 删完之后
            if(isActive){
                if(!state.taglist.length){ //如果删完之后一个也没有了，跳到首页
                    router.push("/")     
                }else{//删完之后还有
                    if(index==state.taglist.length){ //激活在最后一个
                        router.push(state.taglist[index-1].path)
                    }else{
                        router.push(state.taglist[index].path)
                    }                                
                } 
            }
        },
        // 标签操作  2 关闭所有标签
        DEL_ALL(state){
            state.taglist=[]
            localStorage.removeItem("taglist")
            router.push("/")
        },
        // 关闭其他所有标签
        
        DEL_OTHER_ALL(state,path){ //path传当前标签的fullPath
            state.taglist=state.taglist.filter(val=>val.path==path)
            localStorage.setItem("taglist",JSON.stringify(state.taglist))
        }

    }
}