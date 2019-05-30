<template>
  <div class="mui-numbox" data-numbox-min="1" style="height:25px;width:110px">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      :value="initcount"
      @change="countChange"
      readonly
      ref="numbox"
    >
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.js";

export default {
  data() {
    return {};
  },
  mounted() {
    mui(".mui-numbox").numbox();
  },
  methods: {
    countChange() {
      //数量改变
      // console.log(this.$refs.numbox.value);
      this.$store.commit("updateGoodsinfo", {
        id: this.goodsid,
        count: this.$refs.numbox.value
      });
    }
  },
  props: ["initcount", "goodsid"]

  //父组件向子组件传值:
  // 1.父组件传递给子组件，
  // 2.子组件接收值
  // 3.子组件渲染数据

  // Vuex安装
};
</script> 

<style lang="scss" scoped>
</style>
