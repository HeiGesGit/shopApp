<template>
  <div>
    <div class="title">{{ goodinfo.title }}</div>
    <hr>
    <div class="content" v-html=" goodinfo.content "></div>
    <!-- 使用bootstrap的自适应图片布局 -->
    <img :src="goodinfo.img" width="100%">
  </div>
</template>

<script>


export default {
  data() {
    return {
      id: this.$route.params.id,
      goodinfo: []
    }
  },
  created(){
    this.getgoodpicinfo();
  },
  methods: {
    getgoodpicinfo(){
      this.$http.get("godesc"+this.id).then(result => {
        if(result.body.status == 0){
          this.goodinfo = result.body.data;
        }
      })
    }  
  },

}
</script>

<style lang="scss" scoped>
.title{
  font-size: 18px;
  color: #226aff;
  padding: 8px 15px;
  font-weight: bold;
}
</style>
