<template>
  <div class="home">
    <swiper />
    <div class="section" v-for="(item,index) in songsList" :key="index">
      <div class="section-title">{{item.name}}</div>
      <content-list :contentList="item.list"></content-list>
    </div>
  </div>
</template>

<script>
import Swiper from "../components/Swiper";
import contentList from '../components/ContentList';
export default {
  name: 'home',
  components: {
    Swiper,
    contentList
  },
  data () {
    return {
      songsList: [
        {name:"歌单",list: []},
        {name:"歌手",list: []}
      ]
    }
  },
  created () {
   this.getSongList();
   this.getSinger();
  },
  methods: {
    getSongList(){//获取前十条歌单
      var _this=this;
      this.$axios.get("http://localhost:8888/songList/selectTenSongLists").then(function (data) {
        _this.songsList[0].list=data.data;
    });
    },
    getSinger(){                      //获取前十名歌手
      var _this=this;
      this.$axios.get("http://localhost:8888/singer/selectTenSingers").then(function (data) {
        _this.songsList[1].list=data.data;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/css/home.scss';
</style>
