<template>
  <div id="content">
    <div class="register_body">
      <div  class="email" >邮箱：
        <button :disabled="disabled" class="fasongverify"  @click="handleToverify()">{{verifyInfo}}</button>
      </div>
      <input v-model="email" class="register_text" type="text" />
      <div >用户名：</div>
      <input v-model="username" class="register_text" type="text" /> 
      <div>密码：</div>
      <div class="sendpassword">
        <!-- 密码输入框 -->
         <input v-model="password" v-show="!ifDisplay"  class="register_text" type="password" autocomplete="‘new-password’" /> 
         <input v-model="password" v-show="ifDisplay"  class="register_text" type="text" autocomplete="‘new-password’" /> 
         <!-- 密码隐藏显示按钮 -->
         <div @click="ifDisplay=!ifDisplay">
            <span v-show="ifDisplay" ><img src="/static/images/icon-invisible.png"></span>
            <span v-show="!ifDisplay" ><img src="/static/images/icon-visible.png"></span> 
         </div>
      </div>
      <div>确认密码： </div>
      <input  class="register_text" type="password" /> 
      <div>验证码：</div>
      <input v-model="verify" class="register_text" type="text" />
      <div class="register_btn">
        <input type="submit" value="注册" @touchstart="handleRegister()" />
      </div>
      <div class="register_link">
        <router-link to="/Mine/login">立即登录</router-link>
        <router-link to="/Mine/findpassword">找回密码</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {messageBox} from "@/components/JS";
export default {
    name:'register',
  data () {
    return {
      username:'',
      password:'',
      email:'',
      verify:'',
      verifyInfo:'发送验证码',
      disabled:false,
      ifDisplay:false
    }
  },
  methods: {
  handleToverify(){
    if(this.disabled){return;}
    this.$axios.get("/api2/users/verify?email="+this.email).then((res)=>{
       var status=res.data.status;
       var This=this;
       if(status==0){
          messageBox({
             title:'发送验证码',
             content:'发送验证码成功',
             ok:'确定',
             handleOk(){
              This.counteDown();//倒计时方法
             }
           });
       }
       else{
         messageBox({
           title:'发送验证码',
           content:'发送验证码失败',
           ok:'确定'
         })
       }
    })
},
 counteDown(){
     this.disabled=true;
     var count=60;
     var timer=setInterval(() => {
       count--;
       this.verifyInfo="剩余"+count+"秒";
       if(count==0){
        this.disabled=false;
        this.verifyInfo="发送验证码";
        count=60;
        clearInterval(timer);
       }
     }, 1000);
},
  handleRegister(){
    this.$axios.post("/api2/users/register",{
      username:this.username,
      password:this.password,
      email:this.email,
      verify:this.verify
    }).then((res)=>{
      var status=res.data.status;
       var This=this;
      if(status==0){
        messageBox({
          title:'注册',
          content:'注册成功',
          ok:'确定',
           handleOk(){
               This.$router.push('/Mine/login')
             }
        })
      }
      else{
        messageBox({
          title:'注册',
          content:res.data.msg+'，请重新注册',
          ok:'确定'
        })
      }
    })

}
  }
}
</script>

<style scoped>
#content .register_body{  width:100%;}
.register_body .register_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.register_body .email{position:relative;}
.register_body .fasongverify
{
  width:90px;
  height: 30px;
  border-radius: 3px; 
  border:1px solid #cccccc; 
  position: absolute;
  right: 20px;
  top:20px;
  background:rgb(245, 244, 244);
  line-height: 30px;
  text-align: center

  }
.register_body .register_btn{ height:50px; margin:10px;}
.register_body .register_btn input{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
.register_body .register_link{ display: flex; justify-content:space-between;}
.register_body .register_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
.register_body .sendpassword{position:relative;}
.register_body span{
  color:#bfbfbf;
  position: absolute;
  right: 20px;
  top:-10px;
  }
  .register_body .sendpassword img{
    width:50px;
    height:30px;
  }
</style>
