<template>
  <div>
    <div>
      <h3 class="title">{{ infolist.title }}</h3>
      <p class="subtitle">
        <span>发表时间:{{ infolist.add_time }}</span>
        <span>点击次数:{{ infolist.click }}次</span>
      </p>

      <hr>

      <!-- 缩略图 -->
      <div class="thumbs" style="width: 100px; background-color: pink;">
        <vue-preview :slides="list" @close="handleClose" >
        </vue-preview>
      </div>
      <!-- <img class="preview-img" v-for="(item, index) in list" :src="item.img" height="100" @click="$preview.open(index, list)" :key="item.img">    -->

      <!-- 图片内容区域 -->
      <div class="content">{{ infolist.content }}</div>

      <!-- 评论子组件 -->
      <cmt-box :id="id"></cmt-box>
    </div>
  </div>
</template>

<script>
import comment from "../subComponents/comment.vue";
import $ from 'jquery';

$(function () {
  $("img").click(function(){
    console.log("okk");
    $('img').css('width','300');
  });
})

export default {
  data() {
    return {
      id: this.$route.params.id,
      infolist: [],
      list: [] //缩略图的数组
    };
  },
  created() {
    this.getnewsinfo();
    this.getlist();
  },
  methods: {
    getnewsinfo() {
      this.$http.get("photoinfo" + this.id).then(result => {
        if (result.body.status === 0) {
          this.infolist = result.body.data[0];
        } else {
          console.log("nonono");
        }
      });
    },
    getlist() {
      this.$http.get("thumbnail" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.data.forEach(item => {
            item.w = 600;
            item.h = 400;
            item.msrc = item.src;
          });
          this.list = result.body.data;
        } else {
          console.log("ofdsfds");
        }
      });
    },
    handleClose() {
      console.log("close event");
    }
  },
  components: {
    "cmt-box": comment
  }
};
</script> 

<style lang="scss" scoped>
.title {
  padding: 8px 20px;
  color: #26a2ff;
}
.subtitle {
  padding: 0 8px;
}
.content {
  padding: 0 10px;
  font-size: 14px;
}
img {
  border: 0;
  width: 300px;
}
</style>
