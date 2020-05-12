export default{
    path:'/Movie',
    component : () => import('@/views/Movie'),
    children:[
        {
        path:'ComingSoon',
        component:()=>import('@/components/ComingSoon')
    },
    {
        path:'NowPlaying',
        component:()=>import('@/components/NowPlaying')
    },
    {
        path:'Search',
        component:()=>import('@/components/Search')
    },
    {
        path:'City',
        component:()=>import('@/components/City')
    },
    {   //配置动态路由与路由视图（为nowplaying配置）
        path:'detail/1/:movieId', 
        components:{
            default:()=>import('@/components/NowPlaying'),
            detail:()=>import('@/views/Movie/detail')
        },
        props:{
            detail:true
        }
    },
    {   //配置动态路由与路由视图(为comingsoon配置)
        path:'detail/2/:movieId', 
        components:{
            default:()=>import('@/components/ComingSoon'),
            detail:()=>import('@/views/Movie/detail')
        },
        props:{
            detail:true
        }
    },
    {
        path:"/Movie",
        redirect:'/Movie/NowPlaying'
    }
]
}