export default{
    path:'/Mine',
    component: () => import ('@/views/Mine'),
    children:[
        {
            path:'login',
            component:()=>import('@/components/Login')
        },
        {
            path:'register',
            component:()=>import('@/components/Register')
        },
        {
            path:'findpassword',
            component:()=>import('@/components/findPassword')
        },
        {
            path:'center',
            component:()=>import('@/views/Mine/center.vue')
        },
        {
            path:'/Mine',
            redirect:'center'
        }
    ]
}