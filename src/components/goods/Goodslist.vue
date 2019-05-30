<template>
  <div class="goods-list">
    <!-- <router-link class="goods-item" v-for="item in goodslist" :key="item.title" :to="'/home/goodsinfo/' + item.residue" tag="div">
      <img
        :src="item.img"
        width="300"
      >
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.newpri }}</span>
          <span class="old">￥{{ item.lodpri }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.residue }}件</span>
        </p>
      </div>
    </router-link>-->

    <!-- 编程式导航
      1.使用a标签形式跳转
      2.使用window。location.href的形式，编程式跳转
    -->
    <div
      class="goods-item"
      v-for="item in goodslist"
      :key="item.title"
      @click="goDetail(item.residue)"
    >
      <img :src="item.img" width="300">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.newpri }}</span>
          <span class="old">￥{{ item.oldpri }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.residue }}件</span>
        </p>
      </div>
    </div>

    <mt-button type="danger" size="large" @click="getnewdata">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodslist: [],
      pageindex: 1
    };
  },
  created() {
    this.getgoodslist();
  },
  methods: {
    getgoodslist() {
      this.$http.get("pageindex=" + this.pageindex).then(result => {
        if (result.body.status == 0) {
          // this.goodslist = result.body.data;
          this.goodslist = this.goodslist.concat(result.body.data);
        } else {
          console.log("okkk");
        }
      });
    },
    getnewdata() {
      this.pageindex++;
      this.getgoodslist();
    },
    goDetail(id) {
      //使用js使用路由导航
      // 区分this.$route和this.$router路由参数对象
      // 前者是路由参数对象，所有参数对象中，params，query 都属于它
      // 后者是一个路由导航对象，用它可以方便使用js代码，实现路由的前进后退,跳转新的url地址
      // 跳转1
      // this.$router.push("/home/goodsinfo/" + id);

      // 跳转2(传递对象)
      // this.$router.push({ path: "/home/goodsinfo/" + id });

      // 跳转3（传递一个命名的路由）
      this.$router.push({ name: 'goodsinfo', params: { id: id }})
    }
  }
};
</script> 

<style lang="scss" scoped>
.goods-list {
  display: flex; //流式布局
  flex-wrap: wrap; //自动换行
  padding: 7px;
  justify-content: space-between; //项目位于各行之间留有空白的容器内。
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 7px #ccc; //阴影面积7px
    margin: 3px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>
