<template>
  <div class="the-header">
    <div class="header-logo" @click="goHome">
       <!-- <svg class="icon">
            <use xlink:href = "#icon-erji"></use>
        </svg>-->
        <span>学习资源分享</span>
    </div>
    <ul class="navbar">
        <li :class="{active: item.name == activeName}" v-for="item in navMsg" :key="item.path" @click="goPage(item.path,item.name)">
            {{item.name}}
        </li>
        <li>
            <div class="header-search">
                <input type="text" placeholder="搜索资源" @keyup.enter="goSearch()" v-model="keywords">
                <div class="search-btn" @click="goSearch()">
                    <svg class="icon">
                        <use xlink:href = "#icon-sousuo"></use>
                    </svg>
                </div>
            </div>
        </li>
      <li  v-show="!isLogin" :class="{active: item.name == activeName}" v-for="item in loginMsg" :key="item.path" @click="goPage(item.path,item.name)">
        {{item.name}}
      </li>
    </ul>
    <div>
    </div>
    <div class="header-right" v-show="isLogin">
      <div id='user'>
        <img :src='attachImageUrl(avator)'>
      </div>
      <ul class="menu">
        <li v-for="(item,index) in menuList" :key="index" @click="goMenuList(item.path)">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {navMsg,loginMsg,menuList} from '../assets/data/header';
export default {
  name: 'the-header',
  data() {
      return {
          navMsg: [],    //导航栏
          keywords:'',       //搜索关键字
          loginMsg:[],        //右侧的登录注册导航栏
          menuList:[],
      }
  },
  mounted(){
    document.querySelector('#user').addEventListener('click',function(e){
      document.querySelector('.menu').classList.add("show");
      e.stopPropagation()           //关键在于阻止冒泡
    },false);
    document.querySelector('.menu').addEventListener('click',function(e){
      e.stopPropagation()           //点击菜单内部时，阻止时间冒泡，这样，点击内部时，菜单不会关闭
    },false);
    document.addEventListener('click',function(){
      document.querySelector('.menu').classList.remove('show');
    },false);
  },
  computed:{
      ...mapGetters([
          'activeName',
          'isLogin',
          'avator',
          'isSearchUpdate',
          'isLogin'
      ])
  },
  created() {
      console.log(this.$store.getters.isSearchUpdate);
      this.navMsg = navMsg;
      this.loginMsg=loginMsg;
      this.menuList=menuList;
  },

  methods: {
      goHome() {
          this.$router.push({path: "/"});
      },
      goPage(path,name) {
        if(!this.isLogin && path=='/sourceUpload'){
          this.$message.error("请先登录用户");
        }
        else{
          this.$store.commit('setActiveName',name);
          this.$router.push({path: path});}
      },
      goSearch(){
         let param=new URLSearchParams();
         let _this=this;
         param.append("keywords",this.keywords);
         this.$axios.post("http://localhost:8888/article/selectArticleLikeKeyWords/"+this.keywords).then(function (data) {
           console.log(data)
           if(data.data.status==200){
             _this.$store.commit('setActiveName',"博客文章");
             _this.$router.push({path:"/query-article-list",query:{articleIds:data.data.object}});
           }else{
             console.log(222);
             console.log(_this.keywords);
             let key=_this.keywords
             console.log(key)
             _this.$axios.get("http://localhost:8888/StudyVideo/selectStudyVideoLikeKeyWords/"+key).then(function (data) {
               console.log(123);
               console.log(data);
               if(data.data.status==200){
                 _this.$store.commit('setActiveName',"学习视频");
                 _this.$router.push({path:"/query-video-list",query:{videoIds:data.data.object}});
               }else{
                 _this.$axios.get("http://localhost:8888/StudySource/selectStudySourceLikeKeyWords/"+_this.keywords).then(function (data) {
                    console.log(data);
                   if(data.data.status==200){
                     _this.$store.commit('setActiveName',"资源下载");
                     _this.$router.push({path:"/query-source-list",query:{sourceIds:data.data.object}});
                   }else{
                     _this.$message({
                       message: '找不到该资源!',
                       type: 'error'
                     });
                   }
                 })
               }
             })
           }
         })
          /*this.$store.commit('setIsSearchUpdate',true);
          console.log(this.$store.getters.isSearchUpdate);
          this.$router.push({path:'/search',query:{keywords: this.keywords}})*/
      },
    //获取图片地址
    attachImageUrl (srcUrl) {
      return srcUrl? this.$store.state.configure.HOST+srcUrl : '../assets/img/user.jpg';
    },
    goMenuList(path){
      if(path == 0){
        this.$store.commit('setIsLogin',false);
        console.log('isLogin ='+this.isLogin)
        this.$store.commit('setIsActive',false);
        this.$router.push('/index-first');
      }else{
        this.$router.push({path:path});
      }
    }
  }

}
</script>

<style lang="scss" scoped>
@import '../assets/css/the-header.scss';
</style>
