<template>
  <div>
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
        data-scroll="1"
      >
        <div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px);">
          <router-link
            class="mui-control-item mui-active"
            to="/item1mobile"
            data-wid="tab-top-subpage-1.html"
          >推荐</router-link>
          <router-link class="mui-control-item" to="/item2mobile" data-wid="tab-top-subpage-2.html">热点</router-link>
          <router-link class="mui-control-item" to="/item3mobile" data-wid="tab-top-subpage-3.html">北京</router-link>
          <router-link class="mui-control-item" to="/item4mobile" data-wid="tab-top-subpage-4.html">社会</router-link>
          <router-link class="mui-control-item" to="/item5mobile" data-wid="tab-top-subpage-5.html">娱乐</router-link>
          <router-link class="mui-control-item" to="/item6mobile" data-wid="tab-top-subpage-6.html">体育</router-link>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.js";

// mui("body").on("tap", "a", function() {
//   document.location.href = this.href;
// });

export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    mui("#sliderSegmentedControl").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
</style>
