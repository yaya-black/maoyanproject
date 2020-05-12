<template>
  <div>
    <div>个人中心:</div>
    <div>
      当前用户：{{$store.state.user.name}}
      <a href="javascript:;" @click="handleLogout">退出</a>
    </div>
    <div v-if="$store.state.user.isAdmin">
      用户身份：管理员
      <a href="/admin" target="_blank">进入管理后台</a>
    </div>
    <div v-else>用户身份：普通会员</div>
    <div>
      <input type="file" name="file" value="上传头像" @change="handleToUpload"/>
      <img :src="$store.state.user.isHead" class="userHead" />
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import {messageBox} from "@/components/JS";
export default {
  name:"center",
  
  methods: {
    handleLogout(){
    this.$axios.get('/api2/users/logout').then((res)=>{
      var status=res.data.status;
      if(status==0){
    localStorage.removeItem('name');
    localStorage.removeItem('isAdmin');
       this.$store.commit("user/USER_INFO",{
         name:'',
         isAdmin:false,
         isHead:''
    });
        this.$router.push('/Mine/login')
      }

    });
},
handleToUpload(ev){
    var file=ev.target.files[0];
    var param=new FormData();
    param.append('file',file,file.name);
    var config={
      headers:{
        'Content-Type' : 'multipart/form-data'
      }
    };
    this.$axios.post('/api2/users/uploadUserHead',param,config).then(res=>{
      var status=res.data.status;
      var This=this;
      if(status==0){
      messageBox({
             title:'信息',
             content:'上传头像成功',
             ok:'确定',
             handleOk(){
              This.$store.commit("user/USER_INFO", {
             name:This.$store.state.user.name,
             isAdmin:This.$store.state.user.isAdmin,
             isHead: res.data.data.isHead+"?"+Math.random()
            });
         }
           });
      }


        // this.$alert('上传头像成功', '信息', {
        //   confirmButtonText: '确定',
        //   callback: action => {
        //    This.$store.commit("user/USER_INFO", {
        //      name:This.$store.state.user.name,
        //      isAdmin:This.$store.state.user.isAdmin,
        //      isHead: res.data.data.isHead+"?"+Math.random()
        //     });
        //  }
        // })
      else{
        messageBox({
             title:'信息',
             content:'上传头像失败',
             ok:'确定',
             handleOk(){
         }
           });
      }
    })
  }
},
// beforeRouteEnter(导航守卫):在渲染该组件的对应路由被 confirm 前调用
// 不！能！获取组件实例 `this`,因为当守卫执行前，组件实例还没被创建
beforeRouteEnter (to, from, next) { 
   axios.get('/api2/users/getUser').then((res)=>{ //这个是评判去哪一页的依据，看是否登录，在数据库中是否有username
     var status=res.data.status;
     if(status==0){
     next(vm => {  // 通过 `vm` 访问组件实例
     localStorage.setItem("name",res.data.data.username); //利用本地存储解决a链接开起新页面从而导致状态管理存储不了的问题
     localStorage.setItem('isAdmin',res.data.data.isAdmin);
    vm.$store.commit("user/USER_INFO",{ //状态管理部分
      name:res.data.data.username,
      isAdmin:res.data.data.isAdmin,
      isHead:res.data.data.isHead
    });
  });
  }
     else{
       next('/Mine/login');
     }
   });
  },

}
</script>

<style scoped>
.userHead{
  width:100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-top:20px;
}
</style>
