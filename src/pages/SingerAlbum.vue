<template>
  <div class="singer-album">
    <div class="album-slide">
      <div class="singer-img">
        <img :src="attachImageUrl(singer.pic)">
      </div>
      <ul class="info">
        <li v-if="singer.sex==0||singer.sex==1">{{attachSex(singer.sex)}}</li>
        <li>生日：{{singer.birth}}</li>
        <li>故乡：{{singer.location}}</li>
      </ul>
    </div>
    <div class="album-content">
      <div class="intro">
        <h2>{{singer.name}}</h2>
        <span>{{singer.introduction}}</span>
      </div>
      <div class="content">
        <SongsContent :listSongs="listOfSongs">
          <template slot="title">歌单</template>
        </SongsContent>
      </div>
    </div>
  </div>
</template>

<script>
  import {mixin} from '../mixins';
  import {mapGetters} from 'vuex';
  import SongsContent from "../search/SongsContent";
    export default {
      name: "SingerAlbum",
      mixins: [mixin],
      components: {SongsContent},
      data(){
        return {
          singerId: '',       //前面传来的歌手id
          singer: {},         //当前歌手信息
        }
      },
      computed:{
        ...mapGetters([
          'listOfSongs',      //当前播放列表
          'tempList',         //当前歌手对象
          'isLogin',          //用户是否已登录
          'userId',           //当前登录用户id
        ])
      },
      created(){
        this.singerId = this.$route.params.id;
        this.singer = this.tempList;
        this.getSongOfSingerId();
      },
      methods:{
        //根据歌手id查询歌曲
        getSongOfSingerId(){
          let _this=this;
          this.$axios.get("http://localhost:8888/song/selectSongsBySingerId/"+this.singerId).then(function (data) {
                console.log(123);
                console.log(data.data);
                if(data.data.status==200){
                  _this.$store.commit('setListOfSongs',data.data.object);
                  console.log(_this.listOfSongs);
                }else{
                  _this.$message.error("暂无资源");
                }
          })
        },
        //获取性别
        attachSex(value){
          if(value==0){
            return '女'
          }else if(value==1){
            return '男'
          }
          return ''
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import '../assets/css/singer-album.scss';
</style>
