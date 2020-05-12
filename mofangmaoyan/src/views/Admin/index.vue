<template>
  <div>
    <el-container>
      <el-header>猫眼管理后台，欢迎：{{$store.state.user.name}}</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="2" class="el-menu-vertical-demo">
            <el-menu-item index="1">
              <i class="el-icon-share"></i>
              <router-link tag="span" to='/Admin/user' slot="title">用户管理</router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <router-link tag="span" to='/Admin/movie' slot="title">电影管理</router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <router-link tag="span" to='/Admin/cinema' slot="title">影院管理</router-link>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main><router-view/></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Admin",
  data() {
    return {
      msg: ""
    };
  },

  beforeRouteEnter(to, from, next) {
    axios.get("/api2/admin").then(res => {
      //这个是评判去哪一页的依据，看是否是管理员
      var status = res.data.status;
      if (status == 0) {
        next();
      } else {
        next("/Mine/login");
      }
    });
  }
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  /* text-align: center; */
  padding-left: 60px;
  line-height: 50px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
