<template>
  <div class="wrapper" ref="wrapper">
   <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
    name:'Scroller',
    mounted() {
     var scroll=new BScroll(this.$refs.wrapper,{
         tap:true,
         probeType: 1
     });
     this.scroll=scroll;
     scroll.on('scroll',(pos)=>{
         this.handleToScroll(pos);
     });
     scroll.on('touchEnd',(pos)=>{
         this.handleToTouchEnd(pos);
     });
    },
    // 利用父子通信
    props:{
       handleToScroll:{
           type:Function,
           default:function(){}
       },
       handleToTouchEnd:{
           type:Function,
           default:function(){}
       }

    },
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    //   better-scroll中解决点击字母，跳到相应的字母城市中
     ToScrollTop(y){
       this.scroll.scrollTo(0,y);
     }
  }
}
</script>

<style scoped>
.wrapper{
    height: 460px;
    overflow: auto;
}
</style>
