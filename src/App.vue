<template>
  <div id="app">
  <router-view/>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader';
import ScrollTop from './components/ScrollTop';
import TheFooter from './components/TheFooter';
import SongAudio from "./components/SongAudio";
import PlayBar from "./components/PlayBar";
import TheAside from "./components/TheAside";
import BlogList from "./new/FirstBlogList";
import Bpp from "./Bpp";
export default {
  name: 'App',
  data(){
    return {
    }
  },
  components: {
    Bpp,
    BlogList,
    PlayBar,
    TheHeader,
    ScrollTop,
    TheFooter,
    SongAudio,
    TheAside
  },
 /* computed:{
    keyValue:function(){
      return this.$route.fullPath
    },
  }*/
}
</script>

<style  lang="scss" scoped>
@import './assets/css/app.scss';
</style>
