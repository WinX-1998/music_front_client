<template>
    <div>
      <el-row>
        <div class="container">
          <div v-for="(item,index) in articles" class="cards">
          <el-card :body-style="{ padding: '0px' }" class="box-card" shadow="hover">
            <img :src="getUrl(item.firstPic)" class="image">
            <div style="padding: 14px;">
              <span>{{item.title}}</span>
              <div class="bottom clearfix">
                <time class="time">{{ item.createTime }}</time>
                <el-button type="text" class="button" @click="goArticleContent(item.id)">进入文章</el-button>
              </div>
            </div>
          </el-card>
          </div>
        </div>
      </el-row>
    </div>
</template>

<script>
  export default {
    name: "FirstBlogList",
    data() {
      return {
        currentDate: new Date(),
        articles:[]
      };
    },
    created() {
      let _this=this;
      this.$axios.get("http://localhost:8888/article/selectAll").then(function (data) {
          let articles=data.data;
          for(let item of articles){
            _this.articles.push(item);
          }
          console.log(_this.articles)
      })
    },
    methods:{
      goArticleContent(id){
        console.log(id);
        this.$router.push({path:"/blog-content",query:{articleId:id}});
      },
      //根据相对地址获取绝对地址
      getUrl(url){
        return this.$store.state.configure.HOST+url;
        console.log(this.$store.state.configure.HOST+url)
      },
    }
  }
</script>

<style>
  .container{
    padding-left: 120px;
    padding-right: 30px;
  }
  .cards{
    display: inline-block;
    padding-left: 45px;
    padding-top: 20px;
  }
  .box-card{
    display: inline-block;
    width: 250px;
    margin-left: 5px;
    margin-right: 5px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>

