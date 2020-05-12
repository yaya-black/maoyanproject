<template>
  <div id="content">
    <div class="login_body">
      <div>
        <input v-model="username" class="login_text" type="text" placeholder="账户名/手机号/Email" />
      </div>
      <div>
        <input v-model="password" class="login_text" type="password" placeholder="请输入您的密码" />
      </div>
      <div>
        <input v-model="verifyImg" type="text" class="login_text"  placeholder="请输入您的验证码"><img @touchstart="handleImg" src="/api2/users/verifyImg">
      </div>
      <div class="login_btn">
        <input type="submit" value="登录" @click="handleLogin()" />
      </div>
      <div class="login_link">
        <router-link to="/Mine/register">立即注册</router-link>
        <router-link to="/Mine/findpassword">找回密码</router-link>
      </div>
    </div>
  </div>
</template>

<script>
// 注意：这里引入的是messageBox的js，messageBox是个函数，一定要用{}
import {messageBox} from "@/components/JS";  
export default {
  name:'login',
  data() {
    return {
     username:'',
     password:'',
     verifyImg:''
    };
  },
  methods: {
    handleLogin(){
      this.$axios.post('/api2/users/login',{
          username:this.username,
          password:this.password,
          verifyImg:this.verifyImg
      }).then((res)=>{
         var status=res.data.status;
         var This=this;
         if(status==0){
           messageBox({
             title:'登录',
             content:'登录成功',
             ok:'确定',
             handleOk(){
               This.$router.push('/Mine/center')
             }
           });
         }
         else{
           messageBox({
             title:'登录',
             content:res.data.msg,
             ok:'确定'
           });
         }
      });
    },
    handleImg(ev){
      ev.target.src='/api2/users/verifyImg?'+Math.random();
    }
  }
  
};
</script>

<style scoped>
#content .login_body{  width:100%;}
.login_body .login_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.login_body .login_btn{ height:50px; margin:10px;}
.login_body .login_btn input{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
.login_body .login_link{ display: flex; justify-content:space-between;}
.login_body .login_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
</style>
