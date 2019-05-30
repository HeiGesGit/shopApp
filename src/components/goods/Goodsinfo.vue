<template>
  <div class="card">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <!-- 商品轮播图区域 -->
    <div class="mui-card" id="caul">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :options="swiperOption">
            <!-- slides -->
            <swiper-slide v-for="item in goodsparam.pics" :key="item.title">
              <div width="100%;">
                <img :src="item.img" width="100%" height="100%">
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">
        <h3>{{ goodsparam.title }}</h3>
      </div>
      <div class="mui-card-content" id="cellpage">
        <div class="mui-card-content-inner">
          <div class="price">
            <div class="oldpri">
              <b>市场价:</b>
              <a>￥{{goodsparam.oldpri}}</a>
            </div>
            <div class="nowpri">
              <b>销售价:</b>
              <a>￥{{goodsparam.nowpri}}</a>
            </div>
          </div>
          <div class="sellinp">
            <b>购买数量:</b>
            <number @getcount="getSelectCount" :max="goodsparam.repertory"></number>
          </div>
          <div class="cell-btn">
            <mt-button type="primary">立即购买</mt-button>
            <mt-button type="danger" @click="addToShopCar">加入购物车</mt-button>
            <!-- 
              分析：有上面的number是子组件，所有调用子组件的商品数量需要向子组件传值，
              在父组件定义一个方法,同时吧数据作为参数传递给这个方法，
            -->
          </div>
        </div>
      </div>
    </div>
    <!-- 商品参数区域 -->
    <div class="mui-card" id="goodscs">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="goodsnum">商品编号:{{goodsparam.goodsnum}}</div>
          <div class="resp">库存情况:{{ goodsparam.repertory }}件</div>
          <div class="uptime">上架时间:{{ goodsparam.updata }}</div>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="godesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="gocomment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

import number from "../subComponents/goodsinfo_numbox.vue";

export default {
  data() {
    return {
      swiperOption: {
        autoplay: true
      },
      goodsparam: {},
      id: this.$route.params.id,
      ballFlag: false, //控制小球隐藏和显示的标识符
      selectedCount: 1 //保存用户商品选中的数量
    };
  },
  created() {
    this.getgoodsinfo();
  },
  methods: {
    getgoodsinfo() {
      this.$http.get("goodscarousel" + this.id).then(result => {
        if (result.body.status == 0) {
          this.goodsparam = result.body.data;
        } else {
          console.log("okkk");
        }
      });
    },
    godesc(id) {
      this.$router.push({ name: "goodpicinfo", params: { id: id } });
    },
    gocomment(id) {
      this.$router.push({ name: "goodscomment", params: { id: id } });
    },
    addToShopCar() {
      //添加到购物车
      this.ballFlag = !this.ballFlag;
      // { id: '商品id', count: '要购买的数量', price: '商品单价', seleted: 'true' }
      // 拼接出一个要保存的state中car数组的商品信息对象
      var goodsinfo = {
        id: this.id,
        count: this.selectedCount,
        price: this.goodsparam.nowpri,
        selected: true
      };
      // 调用store中的mutations 来将商品加入购物车
      this.$store.commit("addToCar", goodsinfo);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;

      /*
        小球动画优化思路: 
          1. 先分析导致动画不准确的本质原因，我们吧小球最终唯一的位置，已经局限在了某一分辨率下的滚动条未滚动的情况
          2. 只要分辨率和测试的时候的不一样，或者有一定滚动距离之后，问题就出现
          3. 因此，经过分析，得出结论， 不能把位置的横众坐标写死了，而是应该根据不同的情况计算这个坐标值
          4. 经过分析，得出结题思路，先得到徽标的横众坐标，在得到小球的横众坐标，然后让y 值求差，x值也求差，就是横坐标要位移的距离
          5. 如何获取小球的距离   domObject.getBoundingClientRect()
      */

      //获取小球在页面中的位置，
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      //获取徽标在页面中的位置
      const badegePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      const xDist = badegePosition.left - ballPosition.left;
      const yDist = badegePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.17,.67,.83,.67)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelectCount(count) {
      //当子组件吧选中的数量传递给父组件的时候，把选中的值保存到data上
      this.selectedCount = count;
      console.log("父组件拿到的数量值是" + this.selectedCount);
    }
  },
  components: {
    swiper: swiper,
    "swiper-slide": swiperSlide,
    number: number
  }
};
</script>


<style lang="scss" scoped>
.card {
  background-color: #eee;
  overflow: hidden;
  #cellpage {
    .cell-btn {
      margin-top: 10px;
    }
  }
}
.mui-card {
  .mui-card-header {
    h3 {
      font-size: 19px;
    }
  }
  .price {
    a {
      pointer-events: none;
      color: black;
    }
    .oldpri {
      float: left;
      a {
        text-decoration: line-through;
      }
    }
    .nowpri {
      // float: left;
      margin-left: 120px;
      a {
        color: red;
        font-size: 18px;
      }
    }
  }
}
#goodscs {
  .mui-card-content-inner {
    color: gray;
    padding: 0 5px;
    div {
      margin: 10px;
    }
  }
}
.mui-card-footer {
  display: block;
  button {
    margin: 15px 0;
  }
}
.ball {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  z-index: 9999;
  top: 465px;
  left: 144px;
}
</style>
