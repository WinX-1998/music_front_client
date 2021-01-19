<template>
  <div class="the-header">
    <div class="header-logo" @click="goHome">
        <svg class="icon">
            <use xlink:href = "#icon-erji"></use>
        </svg>
        <span>music</span>
    </div>
    <ul class="navbar">
        <li :class="{active: item.name == activeName}" v-for="item in navMsg" :key="item.path" @click="goPage(item.path,item.name)">
            {{item.name}}
        </li>
        <li>
            <div class="header-search">
                <input type="text" placeholder="搜索音乐" @keyup.enter="goSearch()" v-model="keywords">
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
          'isSearchUpdate'
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
          this.$store.commit('setActiveName',name);
          this.$router.push({path: path});
      },
      goSearch(){
          this.$store.commit('setIsSearchUpdate',true);
          console.log(this.$store.getters.isSearchUpdate);
          this.$router.push({path:'/search',query:{keywords: this.keywords}})
      },
    //获取图片地址
    attachImageUrl (srcUrl) {
      return srcUrl? this.$store.state.configure.HOST+srcUrl : '../assets/img/user.jpg';
    },
    goMenuList(path){
      if(path == 0){
        this.$store.commit('setIsLogin',false);
        this.$store.commit('setIsActive',false);
        this.$router.go(0);
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
