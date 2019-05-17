// console.log("ok");
//入口文件

import Vue from "vue"

import app from "./app.vue"



//按需导入组件
import { Header,Swipe, SwipeItem, Button } from 'mint-ui';
import 'mint-ui/lib/style.css';

//导入mui的样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'


//1.1. 导入路由的包
import VueRouter from "vue-router"
//1.2. 安装路由模块
Vue.use(VueRouter)
//1.3. 导入自己的模块
import router from './router.js'


//2.1 导入vue-resource 
import VueResource from 'vue-resource'
//2.2 安装vue-resource
Vue.use(VueResource)

// 使用全局配置设置value值,请求根路径
Vue.http.options.root = 'https://www.easy-mock.com/mock/5cd98c42eebf633b5de54c7d/VueProject'


import moment from 'moment'
//定义全局的过滤器
Vue.filter('dataFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})




Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);


var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router  //1.4 挂载路由对象
})