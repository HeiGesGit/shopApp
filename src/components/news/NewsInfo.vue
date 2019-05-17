<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h3 class="title">{{newsInfo.title}}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间:{{newsInfo.ptime}}</span>
      <span>点击：{{ newsInfo.commentCount }}</span>
    </p>
    <hr>
    <!-- 内容区域 -->
    <div class="content" v-html="newsInfo.content">
    </div>
    <!-- 评论子组件区域 -->
    <comment-box :id="this.id"></comment-box>


  </div>
</template>

<script>

import { Toast } from "mint-ui"

import comment from '../subComponents/comment.vue'

export default {
  data() {
    return {
      id: this.$route.params.id, //将url的值挂载到data上，方便以后调用
      newsInfo: {}
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      //获取新闻详情
      this.$http.get(this.id).then(result => {
        if (result.body.status === 0) {
          this.newsInfo = result.body.data;
          
        } else {
          Toast("获取数据失败");
        }
      });
    }
  },
  components:{  //
    'comment-box': comment
  }
};
</script>

<style lang="scss">
.newsinfo-container {
  padding: 0 4px;
  .title {
    color: red;
    font-size: 16px;
    margin: 15px 0;
    text-align: center;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
    padding: 0 10px;
    img{
      width: 100%;
    }
  }
}
</style>
