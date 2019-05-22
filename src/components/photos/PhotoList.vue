<template>
  <div>
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider mui-content">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
        data-scroll="1"
      >
        <div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px);">
          <a
            :class="['mui-control-item', item.id==1  ? 'mui-active' : '']"
            v-for="item in tabbarList"
            :key="item.id"
            @click="getphotolist(item.id)"
          >{{ item.msg }}</a>
        </div>
      </div>
    </div>

    <div class="post-list">
      <ul>
        <router-link v-for="item in picslist" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li"> 
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
import mui from "../../lib/mui/js/mui.js";
// mui('body').on('tap','a',function(){document.location.href=this.href;});

export default {
  data() {
    return {
      tabbarList: [],
      picslist: []
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
        width: 320px;
        height: 152px;
        margin: 5px;
        vertical-align: middle;
      }
      img[lazy="loading"] {
        width: 320px;
        height: 152px;
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
</style>
