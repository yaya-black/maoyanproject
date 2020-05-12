const state = {
   name:window.localStorage.getItem('name')||'',
   isAdmin:window.localStorage.getItem('isAdmin')||false,
   isHead:''
  };
  
  const mutations = {
   USER_INFO(state, payload) {
      state.name=payload.name;
      state.isAdmin=payload.isAdmin;
      state.isHead=payload.isHead;
    }
  };
  
  const actions = {
    
  };
  
  const getters = {
   
  };
export default{
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}  