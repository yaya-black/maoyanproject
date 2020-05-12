export default{
    path:'/Admin',
    component: () => import ('@/views/Admin'),
    children:[
       {
           path:'user',
           component:()=>import('@/views/Admin/user.vue')
       },
       {
        path:'cinema',
        component:()=>import('@/views/Admin/cinema.vue')
       },
      {
        path:'movie',
        component:()=>import('@/views/Admin/movie.vue')
      },
      {
        path:'/Admin',
        redirect:'user'
    }

    ]
}