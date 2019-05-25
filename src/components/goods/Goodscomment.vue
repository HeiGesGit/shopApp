<template>
  <div>
    <comment-box :id="$route.params.id"></comment-box>
  </div>
</template>

<script>
import comment from "../subComponents/comment.vue";

export default {
  data() {
    return {
    };
  },
  created(){
    // this.getcomments();
  },
  methods: {
    // getcomments() {
    //   this.$http.get("goodscoment" + this.id).then( result =>{
    //     if(this.result.status == 0){
    //       this.goodsdata = result.body.data;
    //     }
    //   });
    // }
  },
  components: {
    "comment-box": comment
  }
};
</script>

<style lang="scss" scope>
</style>
