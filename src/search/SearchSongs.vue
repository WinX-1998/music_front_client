<template>
<div class="search-songs">
  <songs-content :listSongs="listOfSongs"></songs-content>
</div>
</template>

<script>
  import {mapGetters} from "vuex";
  import SongsContent from "./SongsContent";
  import {mixin} from '../mixins';
    export default {
      name: "SearchSongs",
      components: {SongsContent},
      computed:{
          ...mapGetters([
            'listOfSongs'
          ])
      },
    mounted(){
        console.log(this.$store.getters.listOfSongs);
        console.log(this.$route.query.keywords);
        if(!this.$route.query.keywords) {
          this.$store.commit('setListOfSongs',[]);
          this.$notify({
            message: '您输入的内容为空',
            type: 'warning'
          });
        }else{
        var _this=this;
        this.$axios.get("http://localhost:8888/song/selectSongByLikeName/"+this.$route.query.keywords).then(function (data) {
          console.log(data);
          if(data.status!='200'){
            _this.$store.commit('setListOfSongs',[]);
            _this.$notify({
              message: '系统暂无符合条件的歌曲',
              type: 'warning'
            });
          }else {
            _this.$store.commit('setListOfSongs', data.data);
          }
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import '../assets/css/home.scss';
</style>
