<template>
  <div class="singer-album">
    <div class="album-slide">
      <div class="singer-img">
        <img :src="attachImageUrl(source.firstPic)">
      </div>
      <ul class="info">
        <li>标题：{{source.title}}</li>
        <li>类型：{{source.style}}</li>
      </ul>
    </div>
    <div class="album-content">
      <div class="intro">
        <span>点击下载</span>
      </div>
      <el-button type="success" @click="download(source.id)"></el-button>
      <div class="content">
        <SongsContent :introduction="source.introduction">
          <template slot="title">简介</template>
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
          sourceId: '',       //前面传来的歌手id
          source: {},         //当前歌手信息
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
        this.sourceId = this.$route.params.id;
        this.getSourceBySourceId();
      },
      methods:{
        getSourceBySourceId(){
          let _this=this;
          console.log(this.sourceId);
          this.$axios.get("http://localhost:8888/StudySource/selectSourceById/"+this.sourceId).then(function (data) {
              console.log(data);
              _this.source=data.data;
          })
        },
        download(id){
          window.location = "http://localhost:8888/StudySource/download/" + id;
        },
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
