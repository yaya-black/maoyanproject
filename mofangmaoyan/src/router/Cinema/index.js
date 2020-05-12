export default{
    path:'/Cinema',
    component: () => import ('@/views/Cinema'),
    children:[
      {
      path:'AllCity',
      component:()=>import('@/components/AllCity')
    },
    {
      path:'Brand',
      component:()=>import('@/components/Brand')
    },
    {
      path:"/Cinema",
      redirect:'/Cinema/Brand'
  }
  
  ]
  }
  