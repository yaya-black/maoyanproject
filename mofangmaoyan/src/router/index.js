import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import CinemaRouter from './Cinema'
import MovieRouter from './Movie'
import MineRouter from './Mine'
import AdminRouter from './Admin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    CinemaRouter,
    MovieRouter,
    MineRouter,
    AdminRouter,
    {
      path:'/*',
      redirect:'/Movie'
    } 
  
]
})
