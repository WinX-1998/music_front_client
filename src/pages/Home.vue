<template>
  <div class="home">
    <swiper />
    <first-blog-list></first-blog-list>
   <!-- <div class="section" v-for="(item,index) in songsList" :key="index">
      <div class="section-title">{{item.name}}</div>
      <content-list :contentList="item.list"></content-list>
    </div>-->
  </div>
</template>

<script>
import FirstBlogList from "../new/FirstBlogList";
import Swiper from "../components/Swiper";
import contentList from '../components/ContentList';
export default {
  name: 'home',
  components: {
    FirstBlogList,
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
    },
    download(){
      var _this=this;
      this.$axios({
        method:'get',
        url:'http://localhost:8888/file/top.rar',
        responseType:'blob'
      }).then(function (res) {
        let content = res.data;
        let eleLink = document.createElement('a');
        eleLink.download = `${_this.artist}-${_this.title}.rar`;
        eleLink.style.display = 'none';
        //把字符内容转换成blob地址
        let blob = new Blob([content]);
        eleLink.href = URL.createObjectURL(blob);
        //把链接地址加到document里
        document.body.appendChild(eleLink);
        //触发点击
        eleLink.click();
        //然后移除掉这个新加的控件
        document.body.removeChild(eleLink);
      })
        .catch(err =>{
          console.log(err);
        })
    }

  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/css/home.scss';
</style>
