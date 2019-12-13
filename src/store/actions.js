const actions={
    changeUser(context,obj){
        context.commit('changeUser',obj)
    },
    setCreate(context,obj){
        context.commit('setCreate',obj)
    },
    setManage(context,obj){
        context.commit('setManage',obj)
    },
    setWater(context,obj){
        context.commit('setWater',obj)
    },
    setRepire(context,obj){
        context.commit('setRepire',obj)
    }
}
export default actions