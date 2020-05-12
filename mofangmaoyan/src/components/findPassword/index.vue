<template>
  <div id="content">
    <div class="find_body">
      <div class="email">
        邮箱：
        <button
          :disabled="disabled"
          class="fasongverify"
          @click="handleToVerify()"
        >{{verifyInfo}}</button>
      </div>
      <input type="text" class="find_text" v-model="email" />
      <div>新密码：</div>
      <input type="password" class="find_text" v-model="password" />
      <div>验证码：</div>
      <input type="text" class="find_text" v-model="verify" />
      <div class="find_btn">
        <input class="find_modify" type="submit" value="修改" @click="handleToModify()" />
      </div>
      <div class="find_link">
        <router-link to="/Mine/register">立即注册</router-link>
        <router-link to="/Mine/login">立即登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { messageBox } from "@/components/JS";
export default {
  name: "findpassword",
  data() {
    return {
      email: "",
      password: "",
      verify: "",
      verifyInfo: "发送验证码",
      disabled: false
    };
  },
  methods: {
    handleToVerify() {
      if (this.disabled) {
        return;
      }
      this.$axios.get("/api2/users/verify?email=" + this.email).then(res => {
        var status = res.data.status;
        var This = this;
        if (status == 0) {
          messageBox({
            title: "发送验证码",
            content: "发送验证码成功",
            ok: "确定",
            handleOk() {
              This.counteDown();
            }
          });
        } else {
          messageBox({
            title: "发送验证码",
            content: "发送验证码失败",
            ok: "确定"
          });
        }
      });
    },
    counteDown() {
      this.disabled = true;
      var count = 60;
      var timer = setInterval(() => {
        count--;
        this.verifyInfo = "剩余" + count + "秒";
        if (count == 0) {
          this.disabled = false;
          this.verifyInfo = "发送验证码";
          count=60;
          clearInterval(timer);
        }
      }, 1000);
    },
    handleToModify() {
      this.$axios
        .post("/api2/users/findPassword", {
          email: this.email,
          password: this.password,
          verify: this.verify
        })
        .then(res => {
          var status=res.data.status;
          var This = this;
          if (status == 0) {
            messageBox({
              title: "修改密码",
              content: "修改密码成功",
              ok: "确定",
              handleOk() {
                This.$router.push("/Mine/login");
              }
            });
          } 
          else {
            messageBox({
              title: "修改密码",
              content: res.data.msg + ",请重新修改",
              ok: "确定"
            });
          }
        });
    }
  }
};
</script>

<style scoped>
#content .find_body {
  width: 100%;
}
.find_body .find_text {
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px #ccc solid;
  margin-bottom: 5px;
  outline: none;
  text-indent: 10px;
}
.find_body .email {
  position: relative;
}
.find_body .fasongverify {
  width: 90px;
  height: 30px;
  border-radius: 3px;
  border: 1px solid #cccccc;
  position: absolute;
  right: 20px;
  top: 20px;
  background: rgb(245, 244, 244);
  line-height: 30px;
  text-align: center;
}
.find_body .find_btn {
  height: 50px;
  margin: 10px;
}
.find_body .find_btn input {
  width: 100%;
  height: 100%;
  background: #e54847;
  border-radius: 3px;
  border: none;
  display: block;
  color: white;
  font-size: 20px;
}
.find_body .find_link {
  display: flex;
  justify-content: space-between;
}
.find_body .find_link a {
  text-decoration: none;
  margin: 0 5px;
  font-size: 12px;
  color: #e54847;
}
</style>
