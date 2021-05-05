<template>
  <div class="container">
  <div class="content-list">
    <ul class="section-content">
      <li class="content-item" v-for="(item,index) in contentList" :key="index">
        <div class="kuo" @click="goArticleContent(item.id)">
          <img class="item-img" :src="attachImageUrl(item.firstPic)">
          <div class="mask">
          </div>
        </div>
        <p class="item-name">{{item.name||item.title}}</p>
      </li>
    </ul>
  </div>
  </div>
</template>

<script>
    import {mixin} from "../mixins";
    export default {
        name: "BlogList",
        mixins: [mixin],
        data(){
          return{
            contentList:[],
          }
        },
        created() {
          let _this=this;
          this.$axios.get("http://localhost:8888/article/selectAll").then(function (data) {
            console.log(data);
            _this.contentList=data.data;
          })
        },
        methods:{
          goArticleContent(id){
            console.log(id);
            this.$router.push({path:"/blog-content",query:{articleId:id}});
          },

      }
    }
</script>

<style lang="scss" scoped>
  @import '../assets/css/content-list.scss';
  .container{
    padding-top: 80px;
  }
</style>
