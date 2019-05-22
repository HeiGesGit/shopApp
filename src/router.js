import VueRouter from "vue-router"

//导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import Photo from './components/photos/PhotoList.vue'
import img from './components/photos/photos.vue'
import photoinfo from './components/photos/photoinfo.vue'


const router = new VueRouter({
  routes: [
    { path: '/', redirect:'/home'},
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/shopcar', component: ShopcarContainer },
    { path: '/search', component: SearchContainer },
    { path: '/home/newslist', component: NewsList},
    { path: '/home/newsinfo/:id', component: NewsInfo},
    { path: '/home/photolist', component: Photo},
    { path: '/home/photoinfo/:id', component: photoinfo}


  ],
  linkActiveClass: 'mui-active'   //覆盖默认路由高亮
})

export default router