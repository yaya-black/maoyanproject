<template>
  <div>
    <div class="movie_body" ref="movie_body">
      <Loading v-if="isLoading" />
      <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd=" handleToTouchEnd">
      <ul>
        <!-- <li>
						<div class="pic_show"><img src="/static/images/movie_1.jpg"></div>
						<div class="info_list">
							<h2>驴得水</h2>
							<p><span class="person">17746</span> 人想看</p>
							<p>主演: 陈建斌,任素汐,潘斌龙</p>
							<p>2018-11-30上映</p>
						</div>
						<div class="btn_pre">
							预售
						</div>
        </li>-->
        <li class="pullDown">{{pullDownMsg}}</li>
        <li v-for="item in movieList" :key="item.id">
          <div class="pic_show" @tap="handleToDetail(item.id)">
            <img :src="item.img | setWH('128.180')" />
          </div>
          <div class="info_list">
            <h2  @tap="handleToDetail(item.id)">{{item.nm}}<img v-if="item.version" src="@/assets/maxs.png"></h2>
            <p>
              <span class="person">{{item.wish}}</span> 人想看
            </p>
            <p>主演：{{item.star}}</p>
            <p>{{item.rt}}</p>
          </div>
          <div class="btn_pre">预售</div>
        </li>
      </ul>
      </Scroller>
    </div>
  </div>
</template>

<script>

export default {
  name: "NowPlaying",
  data() {
    return {
      movieList: [],
      pullDownMsg:"",
      isLoading:true,
      prevCity:-1
    };
  },
  activated() {
    var cityId=this.$store.state.city.id;
    if(this.prevCity===cityId) {return;}  //没有切换城市
    this.isLoading=true;
    // console.log(this.prevCity,cityId);
    // console.log(123);
 
    this.$axios.get("/api/movieOnInfoList="+cityId).then(res => {
      var msg = res.data.msg;
      if (msg == "ok") {
        this.movieList = res.data.data.movieList;
        this.isLoading=false;
        this.prevCity=cityId;
        // this.$nextTick(()=>{
        //   var scroll=new BScroll(this.$refs.movie_body,{
        //     tap:true,
        //     probeType: 1
        //   });
        //   scroll.on('scroll',(pos)=>{
        //     if(pos.y>30){
        //     this.pullDownMsg='正在更新中';
        //     }
        //     // console.log('scroll');
        //   });
        //   scroll.on('touchEnd',(pos)=>{
        //     // console.log('touchEnd');
        //     if(pos.y>30){
        //       this.$axios.get("/api/movieOnInfoList?cityId=1").then(res => {
        //       var msg = res.data.msg;
        //       if (msg == "ok") {
        //          this.pullDownMsg='更新成功';
        //          setTimeout(()=>{
        //          this.movieList = res.data.data.movieList;
        //          this.pullDownMsg='';
        //          },1000)
              
        //       }
        //       });
             
        //     }
        //   })
        // });		
			}
    });

  },

  methods: {
    handleToDetail(movieId){
      // console.log(movieId);
      this.$router.push('/Movie/detail/1/'+movieId);
      // console.log(movieId);
      // console.log(2);
    },
    handleToScroll(pos){
      if(pos.y>30){
        this.pullDownMsg='正在更新中'
      }
    },
    handleToTouchEnd(pos){
      if(pos.y>30){
        this.$axios.get('/api/movieOnInfoList?cityId=1').then(res=>{
          var msg=res.data.msg;
          if(msg=='ok'){
            this.pullDownMsg='更新成功',
            setTimeout(()=>{
              this.movieList=res.data.data.movieList;
              this.pullDownMsg='';
            },1000)
          }
        })
      }
    }
  }
};
</script>

<style scoped>
#content .movie_body {
  flex: 1;
  overflow: auto;
  height:460px;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 18px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
.movie_body ul .pullDown{
  margin:0px;
  padding:0px;
  border:none;
}
</style>
