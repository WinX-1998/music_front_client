<template>
  <div>
    <the-header v-show="!this.isHide"/>
    <router-view :key="keyValue" class="music-content"/>
    <the-footer v-show="!this.isHide"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import TheHeader from './components/TheHeader';
  import ScrollTop from './components/ScrollTop';
  import TheFooter from './components/TheFooter';
  import SongAudio from "./components/SongAudio";
  import PlayBar from "./components/PlayBar";
  import TheAside from "./components/TheAside";
  import BlogList from "./new/FirstBlogList";
  export default {
    name: 'Bpp',
    data(){
      return {
      }
    },
    components: {
      BlogList,
      PlayBar,
      TheHeader,
      ScrollTop,
      TheFooter,
      SongAudio,
      TheAside
    },
    computed:{
        ...mapGetters([
         'isHide'
        ]),
      keyValue:function(){
        return this.$route.fullPath
      }
    }
  }
</script>

<style  lang="scss" scoped>
  @import './assets/css/app.scss';
</style>
