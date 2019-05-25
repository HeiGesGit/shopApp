<template>
  <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="max">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChange" ref="numbox">
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
    console.log(this.max);
  },
  methods: {
    countChange(){
      // 每当文本框的数据被修改的时候，立即把最新的数据，通过时间调用，传递给父组件
      // console.log(this.$refs.numbox.value);
      this.$emit('getcount', parseInt(this.$refs.numbox.value))
    }
  },
  props: ['max'],
  watch: {
    //属性监听
  }

  //父组件向子组件传值:
  // 1.父组件传递给子组件，
  // 2.子组件接收值
  // 3.子组件渲染数据
};
</script> 

<style lang="scss" scoped>
</style>
