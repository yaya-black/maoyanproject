<template>
  <div>
    <div class="cinema_body">
      <!-- <ul>
        <li>
          <div>
            <span>大地影院(澳东世纪店)</span>
            <span class="q">
              <span class="price">22.9</span> 元起
            </span>
          </div>
        </li>
        <li>
          <div class="address">
            <span>金州区大连经济技术开发区澳东世纪3层</span>
            <span>1763.5km</span>
          </div>
        </li>
        <li>
          <div class="card">
            <div>小吃</div>
            <div>折扣卡</div>
          </div>
        </li>
      </ul>-->
      <Loading v-if="isLoading"/>
      <Scroller v-else>
      <div>
      <ul v-for="item in cinemas" :key="item.id">
        <li>
          <div>
            <span>{{item.nm}}</span>
            <span class="q">
              <span class="price">{{item.sellPrice}}</span> 元起
            </span>
          </div>
        </li>
        <li>
          <div class="address" >
            <span>{{item.addr}}</span>
            <span>{{item.distance}}</span>
          </div>
        </li>
        <li>
          <div class="card">
            <div v-for="(num,key) in item.tag" v-if="num==1" :key="key" :class="key|color(key)" >
              {{key|formatCard(key)}}
          </div>
          </div>
        </li>
      </ul>
      </div>
      </Scroller>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllCity",
  data() {
    return {
      cinemas: [],
      isLoading:true,
      prevCity:-1
    };
  },
//   computed: {
//   activeUsers: function () {
//    return this.cinemas.filter(function (num) {
//      return num=1
// })
// }
// },
  activated() {
    var cityId=this.$store.state.city.id;
    if(this.prevCity==cityId) {return;}
    this.isLoading=true;
    // console.log(890);
    this.$axios.get("/api/allCityList="+cityId).then(res => {
      var msg = res.data.msg;
      if (msg == "ok") {
        this.cinemas = res.data.data.cinemas;
        this.prevCity=cityId;
        this.isLoading=false;
      }
    });
  },
  filters:{
    formatCard(key){
      var card=[
        {key:'allowRefund',value:'改签'},
        {key:'endorse',value:'退'},
        {key:'sell',value:'折扣卡'},
        {key:'snack',value:'小吃'}
      ];
      for(var i=0;i<card.length;i++){
        if(card[i].key==key){
          return card[i].value;
        }
      }
       return '';
    },
    color(key){
      var color=[
        {key:'allowRefund',value:'bl'},
        {key:'endorse',value:'bl'},
        {key:'sell',value:'or'},
        {key:'snack',value:'or'}
      ];
      for(var i=0;i<color.length;i++){
        if(color[i].key==key){
          return color[i].value;
        }
      }
       return '';
    }
  },
  methods: {}
};
</script>

<style scoped>
/* #content .cinema_menu{ 
  width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; 
  display: flex; justify-content:space-around; align-items:center; background:white;} */
#content .cinema_body {
  flex: 1;
  overflow: hidden;
}
.cinema_body ul {
  margin: 20px;
  overflow: hidden;
  border-bottom: 1px solid #e6e6e6;
}
.cinema_body li {
  /* height: 200px;
   */
  /* width:150px; */
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
  /* flex:1; */
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
  /* position: relative; */
  flex: 1;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
  /* flex:1; */
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
