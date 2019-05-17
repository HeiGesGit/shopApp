<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.docid">
        <router-link :to="'/home/newsinfo/' + item.docid">
          <img class="mui-media-object mui-pull-left" :src="item.imgsrc">
          <div class="mui-media-body">
            <h1>{{ item.title }}</h1>
            <p class="mui-ellipsis">
              <span>发表时间: {{ item.ptime | dataFormat('YYYY-MM-DD')}}</span>
              <span>热度: {{ item.commentCount }}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      newsList: []
    };
  },
  created() {
    this.getNewslist();
  },
  methods: {
    getNewslist() {
      //获取数据列表
      this.$http.get("newslist").then(result => {
        if (result.body.status === 0) {
          //如果没有失败,把数据保存至data
          // console.log(result);
          this.newsList = result.body.BBM54PGAwangning;
        } else {
          Toast("获取新闻列表失败");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #226aff;
      display: flex; //设置flex布局
      justify-content: space-between; //space-between：两端对齐，项目之间间隔相等；
    }
  }
}
</style>
