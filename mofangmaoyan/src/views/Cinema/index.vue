<template>
  <div id="main">
    <div id="content">
      <Header title="猫眼影院" />
      <div class="cinema_menu">
        <router-link tag="div" to="/Cinema/AllCity" class="city_switch">
          全城
          <i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <router-link tag="div" to="/Cinema/Brand" class="brand_swtich">
          电影院
          <i class="iconfont icon-lower-triangle"></i>
        </router-link>
        
      </div>
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <TabBar />
  </div>
</template>

<script>
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
export default {
  name: "Cinema",
  components: {
    Header,
    TabBar
  }
};
</script>

<style scoped>
#content .cinema_menu {
  width: 100%;
  /* flex:1; */
  height: 45px;
  /* flex:1; */
  /* overflow:auto; */
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: white;
}
#content .cinema_menu .city_switch.router-link-active{
color:red;
}
#content .cinema_menu .brand_swtich.router-link-active{
color:red;
}
#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>
