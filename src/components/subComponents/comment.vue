<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要BB的内容(最多吐槽120个字)" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment()">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in comments" :key="item.id">
        <div
          class="cmt-title"
        >第{{ i+1 }}楼 &nbsp;&nbsp;用户:{{ item.user_name }}&nbsp;&nbsp;发表时间:{{ item.add_time }}</div>
        <div class="cmt-body">{{ item.content === 'undefined' ? '此用户很懒，嘛都没说':item.content }}</div>
      </div>
    </div>

    <mt-button type="danger" size="large" @click="readMore()" plain>加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      pageIndex: 1, //默认展示第一页数据
      comments: [],
      msg: "" //评论输入的内容
    };
  },
  created() {
    this.getcomments();
  },
  methods: {
    getcomments() {
      this.$http
        .get("id=" + this.id + "&page=" + this.pageIndex)
        .then(result => {
          if (result.body.status === 0) {
            // this.comments = result.body.data;
            // 每当获取新评论数据的时候，不要把老数据清空，而是以老数据拼接上新数据
            this.comments = this.comments.concat(result.body.data);
          } else {
            Toast("加载数据失败");
          }
        });
    },
    readMore() {
      if (this.pageIndex === 2) {
        Toast("这是已经最后一页了");
      } else {
        this.pageIndex++;
        this.getcomments();
      }
    },
    postComment() {
      //发表评论
      this.$http
        .post('postComment', {
          content: this.msg.trim()
        })
        .then(function(result) {
          if (result.body.status === 0) {
            // 1. 拼接出一个评论对象
            var cmt = {
              user_name: "匿名用户",
              add_time: Date.now(),
              content: this.msg.trim()
            };
          }
          this.comments.unshift(cmt);
        });
    }
  },
  props: ["id"]
};
</script>

<style lang="scss" scoped>
.cmt-container {
  margin-bottom: 10px;
  h3 {
    font-size: 16px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
      }
    }
  }
}
</style>
