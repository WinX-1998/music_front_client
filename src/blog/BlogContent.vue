<template>
<div class="container">
  <div class="article clearfix">
      <div class="header">
        <div class="blogtext">
          <div >
            <img :src="getUrl(article.firstPic)" style="height: 350px;width: 100%">
          </div>
        <h1 class="title">{{article.title}}</h1>
        <div class="author">
          <div class="avatar">
            <img class="auth-logo"
                 :src="getUrl(article.firstPic)"
                 alt="BiaoChenXuYing">
          </div>
          <div class="info">
              <span class="name">
                <span>{{article.author}}</span>
              </span>
            <div props-data-classes="user-follow-button-header"
                 data-author-follow-button="" />
            <div class="meta">
                <span class="publish-time">
                 {{article.createTime}}
                </span>
              <span class="wordage">
                  字数{{wordCount}}
                </span>
              <span class="views-count">
                  阅读{{article.articleView}}
                </span>
              <span class="comments-count">
                  评论
                </span>
              <span class="likes-count">
                  喜欢{{article.articleLike}}
                </span>
            </div>
          </div>
          <div class="tags"
               title="标签">
            <el-tag v-for="item in article.tags"
                    :key="item.id"
                    size="mini"
                    class="tag"
                    type="success">{{item.name}}</el-tag>
          </div>
          <span class="clearfix" />
        </div>
      <!--   <div class="content">
           <div id="content"
                class="article-detail"
                v-html="article.content">
           </div>
         </div>-->

          <div class="content">
            <div class="article_message hljs renderNav markdown-body" v-html="htmlContent"></div>
            </div>
            <div class="heart">
           <el-button type="danger"
                      size="large"
                      icon="heart"
                      @click="likeArticle"
                      >
             点赞
           </el-button>
         </div>
         <!-- <div class="comment">
            <el-input placeholder="文明社会，理性评论"
                      type="textarea"
                      v-model="content"></el-input>
            <el-button style="margin-top: 15px"
                       type="primary"
                       :loading="btnLoading"
                       @click="handleAddComment">发 送</el-button>
          </div>-->
       </div>
      </div>
  </div>
</div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import hljs from "highlight.js"; // 引入 highlight.js
    //import "highlight.js/styles/monokai-sublime.css"; // 引入高亮样式 这里我用的是sublime样式
    import 'highlight.js/styles/googlecode.css';
    import '@/assets/css/markdown.css'
    import 'mavon-editor/dist/css/index.css';
    //import MarkdownIt from'markdown-it';
    //import hljs from 'highlight.js';
    //import 'highlight.js/styles/default.css';

    import marked from 'marked'
    export default {
        name: "BlogContent",
        data(){
          return {
            id:'',
            content:"123456878",
            article:{},
            htmlContent:'',
            wordCount:0,
          }
        },
      created() {
          if(this.$route.query.articleId){
            this.id=this.$route.query.articleId;
            this.loadArticle(this.$route.query.articleId)
          }
      },
      computed:{
        ...mapGetters([
          'isLogin',
          'userId',
        ]),
      },
      mounted(){
        var rendererMD = new marked.Renderer();
        marked.setOptions({
          renderer: rendererMD,
          highlight: function(code) {
            return hljs.highlightAuto(code).value;
          },
          pedantic: false,
          gfm: true,
          tables: true,
          breaks: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
          xhtml: false
        });
        this.code = marked(this.code);// 将markdown内容解析
      },
      methods:{
          loadArticle(id){
          const _this = this;
          this.$axios.get("http://localhost:8888/article/selectArticleHtmlById/"+id).then(function(data){
            _this.article=data.data;
            console.log(data.data.content)
            _this.wordCount=_this.getByteLen(data.data.content);
            _this.htmlContent = marked(data.data.content || '', {
              sanitize: true
            });
            console.log(_this.htmlContent);
          })
        },
        //根据相对地址获取绝对地址
        getUrl(url){
        /*  return `${this.$store.state.HOST}/${url}`*/
          return 'http://127.0.0.1:8888/'+url;
        },
        getByteLen(val) {
          var strs = val.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?|\，|\。|\？|\：|\；|\‘|\’|\”|\“|\、|\·|\！|\（|\）|\》|\《|\『|\』]/g, "");
          //let recxType = /^[0-9A-Za-z\u4e00-\u9fa5]{15,}$/;
          return strs.length;
        },
          likeArticle(){
            if(!this.isLogin){
              this.$notify({
                title: '请先登录',
                type: 'error'
              });
              return;
            }
            let _this=this;
            let param=new URLSearchParams();
            param.append("articleId",this.id)
            param.append("userId",this.userId);
            this.$axios.post("http://localhost:8888/article/likeArticle",param).then(function(data){
             console.log(data);
             if(data.data.status==200){
               _this.loadArticle(_this.id);
               _this.$notify({
                 title: '点赞成功',
                 type: 'success'
               });
             }else{
               _this.$notify({
                 title: data.data.msg,
                 type: 'error'
               });
             }
            })
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import '../assets/css/blog.scss';
  .container{
    padding-top: 80px;
  }
  .firstPic{
    width: 100%;
    height: 50px;
  }
  .blogtext{
    padding-left: 200px;
    padding-right: 300px;
    border-color: #67757f;
  }

</style>
