<template>
  <div id="app">
    <the-header />
    <router-view :key="keyValue" class="music-content"/>
    <song-audio></song-audio>
    <the-aside></the-aside>
    <scroll-top/>
    <play-bar></play-bar>
    <the-footer/>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader';
import ScrollTop from './components/ScrollTop';
import TheFooter from './components/TheFooter';
import SongAudio from "./components/SongAudio";
import PlayBar from "./components/PlayBar";
import TheAside from "./components/TheAside";
export default {
  name: 'App',
  data(){
    return {
    }
  },
  components: {
    PlayBar,
    TheHeader,
    ScrollTop,
    TheFooter,
    SongAudio,
    TheAside
  },
  computed:{
    keyValue:function(){
      return this.$route.fullPath
    }
  }
}
</script>

<style  lang="scss" scoped>
@import './assets/css/app.scss';
</style>
