<template>
  <div class="shopcar-containter">
    <div class="goods-list">
      <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
        <!--内容区-->
        <div class="mui-card-content" id="mui-card-content">
          <mt-switch v-model="$store.getters.getgoodsselected[item.id]"
            @change="selectedChange(item.id, $store.getters.getgoodsselected[item.id])"
          ></mt-switch>
          <img :src="item.thumb_path" alt="title">
          <div class="info">
            <h1>{{ item.title }}</h1>
            <p>
              <span class="price">￥{{ item.price }}</span>
              <numbox :initcount="$store.getters.getgoodscount[item.id]" :goodsid="item.id"></numbox>
              <!-- 如何从购物车获取商品的数量 
                可以创建一个空对象，然后循环购物车中所有的商品，把当前循环这条商品的ID ，
                作为对象的属性名，count 值作为对象的属性值，这样，当吧所有的商品循环一遍，
                就会得到一个对象，{{ 88: 2, 89: 1, 90:4 }}
              -->
              <a href="#" @click.prevent="remove(item.id, i)">删除</a>
            </p>
          </div>
        </div>
      </div>
      <div class="mui-card">
        <!--内容区-->
        <div class="mui-card-content" id="accounts">
          <div class="left">
            <p>总计(不急运费):</p>
            <p>已勾选商品 <span class="red">{{ $store.getters.getgoodscount.count }}</span> 件，总价￥ <span class="red">{{ $store.getters.getgoodscount.amount }}</span></p>
          </div>
          <div class="right">
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    <p>{{ $store.getters.getgoodsselected }}</p>
    </div>
  </div>
</template>

<script>
import numbox from "../subComponents/shopCar_numbox.vue";

export default {
  data() {
    return {
      goodslist: []
    };
  },
  created() {
    this.getgoodslist();
  },
  methods: {
    getgoodslist() {
      var idArr = [];
      this.$store.state.car.forEach(item => {
        // 将数据push到idArr中去
        idArr.push(item.id);
      });
      // 如果购物车商品列表没有商品，则直接返回，不需要请求数据接口，否则会报错
      if (idArr.length <= 0) {
        return;
      }
      // 获取购物车列表
      this.$http
        .get(
          "https://www.easy-mock.com/mock/5cd98c42eebf633b5de54c7d/VueProject/goodsshopcar" +
            idArr.join(",")
        )
        .then(result => {
          if (result.body.status == 0) {
            this.goodslist = result.body.data;
          }
        });
    },
    remove(id, index){
      // 点击删除，把商品中根据id删除，car中的对应商品，并且同时删除goodslist中删除
      this.goodslist.splice(index, 1);
      this.$store.commit('removeFormCar', id);
    },
    selectedChange(id, value){
      // 每当点击开关，打印状态
      console.log(id+ '----' + value);
      this.$store.commit('updateSelected', {id, selected: value});
    }
  },
  components: {
    numbox
  }
};
</script>


<style lang="scss" scoped>
.shopcar-containter {
  background-color: #eee;
  overflow: hidden;
  #mui-card-content {
    display: flex;
    justify-content: space-between;
    padding: 20px 10px;
  }
  .goods-list {
    img {
      height: 20%;
      width: 22%;
      margin: auto 0;
    }
    h1 {
      font-size: 15px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
}
#accounts{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  .red{
    font-size: 16px;
    color: red;
  }
}
</style>
