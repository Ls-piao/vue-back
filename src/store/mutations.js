const mutations={
    changeUser(state,obj){
         state.name = obj
    },
    setCreate(state,user){
       state.homeWork = user
    },
    setManage(state,user){
      state.manageUser = user
    },
    setWater(state,user){
      state.waterUser = user
    },
    setRepire(state,user){
      state.repireUser = user
    },
}
export default mutations