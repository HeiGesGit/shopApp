// console.log("ok");
//入口文件

import Vue from "vue"

import app from "./app.vue"




//按需导入组件
import { Header, Swipe, SwipeItem, Button, Lazyload, Switch } from 'mint-ui';
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



import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview)


// 1.导入vue-awesome-swiper 插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)


import $ from 'jquery'


//导入bootstrapcss样式表
// import 'bootstrap/dist/css/bootstrap.min.css';

Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.component(Switch.name, Switch);
Vue.use(Lazyload);

//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//每次刚进入网站，肯定调用main.js，调用的时候从先从本地储存中把数据读出来
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
  state: {    // this.$store.state.***
    car: car   // 将购物车中商品的数据用一个数组存起来,在car 数组中，
    // 存储商品的对象，可以暂时将商品对象设计成 
    // {{ id: '商品id', count: '要购买的数量', price: '商品单价', seleted: 'true' }}


  },
  mutations: {   // this.$store.commit('定义的方法名称')
    addToCar(state, goodsinfo) {
      // 点击加入购物车把商品信息保存store的car上
      // 1.如果购物车中之前就有对应的商品，只需要更新数量就好了
      // 2.如果没有，直接吧商品数据push到car中

      // 假设购物车中没有找到对应的商品
      var flag = false;


      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count);
          flag = true
          return true
        }
      })

      // 如果最终循环完毕的道的flag得到的还是false ，则吧商品直接加入到购物车中
      if (!flag) {
        state.car.push(goodsinfo)
      }

      // 当更新car 之后，把car存储到本地的 localStorage 中  (实现持久化储存)
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsinfo(state, goodsinfo) {
      // 修改购物车商品的数量值
      // 分析：
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      // 当修改完商品的数量，把最新的购物车数据保存到本地储存中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFormCar(state, id) {
      // 根据id，从state中删除数据
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          console.log("ok");
          return true;
        }
      })

      // 将删除完毕的数据同步到本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateSelected(state, info) {
      state.car.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected
        }
      })
      //把最新的所有购物车商品状态保存到store中去
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {   // this.$store.getters.***
    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count
      })
      return c;
    },
    getgoodscount(state) {
      var o = {};
      state.car.forEach(item => {
        o[item.id] = item.count;
      })
      return o
    },
    getgoodsselected(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o;
    },
    getgoodscount(state){
      var o = {
        count: 0,
        amount: 0,
      }
      state.car.forEach( item=> {
        if(item.selected) {
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o;
    }
  }
})


var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router,  //1.4 挂载路由对象
  store   //挂载到vm实例
})