<template>
  <div>
    <!-- swipe横向滚动组件组件 -->
    <div class="swiper-custom">
      <swiper :options="swiperOption">
        <swiper-slide v-for="slide in tabbarList" :key="slide.id" class="swiper-slide">
          <!-- :class="['mui-control-item', slide.id==1  ? 'mui-active' : '']" -->
          <a
            @click="getphotolist(slide.id)"
            :class="['mystyle', slide.id==1  ? 'mystyle-active' : '']"
            id="selfslide"
            ref="a"
          >{{ slide.msg }}</a>
        </swiper-slide>
      </swiper>
    </div>

    <div class="post-list">
      <ul>
        <router-link
          v-for="item in picslist"
          :key="item.id"
          :to="'/home/photoinfo/'+item.id"
          tag="li"
        >
          <img v-lazy="item.img">
          <div class="info">
            <div class="info-title">{{ item.title }}</div>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>

// 导入swiper组件
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  data() {
    return {
      tabbarList: [],
      picslist: [],
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        slidesPerView: 5 //一次显示5张图片
      }
    };
  },
  created() {
    this.gettabbarlist();
    this.getphotolist(1);
  },
  methods: {
    gettabbarlist() {
      this.$http.get("tab-bar-item-list").then(result => {
        if (result.body.status == 0) {
          this.tabbarList = result.body.data;
        } else {
          Toast("加载数据失败...");
        }
      });
    },
    getphotolist(cateId) {
      this.$http.get("nba" + cateId).then(result => {
        if (result.body.status == 0) {
          this.picslist = result.body.data;
        } else {
          console.log("获取数据失败");
        }
      });
    }
  },
  components: {
    swiper: swiper,
    "swiper-slide": swiperSlide
  },
  mounted() {
    $(function() {
      $("a#selfslide").on("click", function() {
        $(this)
          .addClass("mystyle-active")
          .parent()
          .siblings()
          .children()
          .removeClass("mystyle-active");
      });
    });
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.mui-scroll {
  position: relative;
}

.post-list {
  ul {
    padding: 0;
    margin: 23px;
    li {
      list-style: none;
      box-shadow: 0 0 6px #999;
      position: relative;
      img {
        width: 97%;
        height: 100%;
        margin: 5px;
        vertical-align: middle;
      }
      img[lazy="loading"] {
        width: 97%;
        height: 100%;
        background-color: black;
      }
      .info {
        color: white;
        position: absolute;
        bottom: 0;
        width: 100%;
        .info-title {
          text-align: center;
          font-size: 14px;
          background: rgba($color: #000000, $alpha: 0.4);
          margin: auto 0;
        }
      }
    }
  }
}
.swiper-custom {
  background-color: #efeff4;
  .swiper-slide {
    text-align: center;
    font-size: 15px;
    height: 38px;
    .mystyle {
      transition: background-color 0.1s linear;
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 38px;
      color: #000;
      display: inline-block;
      width: auto;
      padding: 0 25px;
    }
    .mystyle-active {
      color: #007aff;
    }
  }
}
</style>


