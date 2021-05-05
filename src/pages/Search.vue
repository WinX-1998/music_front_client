<template>
    <div class="search">
        <nav class="searchList-nav" ref="change">
          <span :class="{isActive:toggle=='Songs'}" @click="handleChangeView('Songs')">歌曲</span>
          <span :class="{isActive:toggle=='SongLists'}" @click="handleChangeView('SongLists')">歌单</span>
        </nav>
      <component :is="currentView"></component>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import SearchSongs from "../search/SearchSongs";
  import SearchSongLists from "../search/SearchSongLists";
  export default {
    name:'search',
    components:{
      SearchSongs,
      SearchSongLists
    },
    computed:{
      ...mapGetters([
        'isSearchUpdate'
      ]),
      updateFlag(){
       return this.$store.state.isSearchUpdate;
      }
    },
    data(){
      return{
        toggle:'Songs',
        currentView:'searchSongs'
      }
    },
    methods:{
      handleChangeView(component){
        console.log(component);
        this.toggle=component;
        this.currentView='search'+component;
      }
    },
    watch:{
      immediate: true,
      updateFlag:function(newVal,oldVal){
        if(newVal==true){
          console.log(123);
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../assets/css/search.scss';
</style>
