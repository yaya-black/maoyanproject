<template>
  <div id="main">
    <Header title="猫眼电影" />
    <div id="content">
      <div class="movie_menu">
        <router-link tag="div" to="/Movie/City" class="city_name">
          <span>{{$store.state.city.nm}}</span>
          <i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <div class="hot_swtich">
          <router-link tag="div" to="/Movie/Nowplaying" class="hot_item">正在热映</router-link>
          <router-link tag="div" to='/Movie/ComingSoon' class="hot_item ">即将上映</router-link>
        </div>
        <router-link tag="div" to="/Movie/Search" class="search_entry">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </div>
       <keep-alive> 
          <router-view/>
       </keep-alive>
        <!-- <MessageBox/> -->
    </div>
    <TabBar />
    <router-view name="detail"/>  
  </div>
</template>

<script>
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
// import MessageBox from '@/components/MessageBox';
export default {
  name: "Movie",
  components: {
    Header,
    TabBar,
    // MessageBox
  },
  data() {
    return {
      msg: ""
    };
  },
  mounted(){
    
  },
};
</script>

<style scoped>
#content {
  flex: 1;
  overflow: auto;
  margin-bottom: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
}
#content .movie_menu {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  z-index: 10;
}
.movie_menu .city_name {
  margin-left: 20px;
  height: 100%;
  line-height: 45px;
}
.movie_menu .city_name.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .city_name.router-link-active{
  color: #ef4238;
  /* border-bottom: 2px #ef4238 solid; */
}
.movie_menu .hot_swtich {
  display: flex;
  height: 100%;
  line-height: 45px;
}
.movie_menu .hot_item {
  font-size: 15px;
  color: #666;
  width: 80px;
  text-align: center;
  margin: 0 12px;
  font-weight: 700;
}
/* .movie_menu .hot_item.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
} */
.movie_menu .hot_swtich .hot_item.router-link-active {
  color: #ef4238;
  /* border-bottom: 2px #ef4238 solid; */
}
.movie_menu .search_entry {
  margin-right: 20px;
  height: 100%;
  line-height: 45px;
}
.movie_menu .search_entry.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry.router-link-active {
  color: #ef4238;
  /* border-bottom: 2px #ef4238 solid; */
}
.movie_menu .search_entry i {
  font-size: 24px;
  color:#f03d37;
}
/* #content .movie_menu div.router-link-active{ 
  color: #f03d37;
    border-bottom: 2px #ef4238 solid; 
  } */
</style>
