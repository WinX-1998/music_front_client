<template>
  <div class="song-list-album">
    <div class="album-slide">
      <div class="album-img">
        <img :src="attachImageUrl(tempList.pic)">
      </div>
      <div class="album-info">
        <h2>简介：</h2>
        <span>
         {{tempList.introduction}}
        </span>
      </div>
    </div>
    <div class="album-content">
      <div class="album-title">
        <p>{{tempList.title}}</p>
      </div>
      <div class="album-score">
        <div>
          <h3>歌单评分：</h3>
          <div>
            <el-rate v-model="average" disabled></el-rate>
          </div>
        </div>
        <span>{{average*2}}</span>
        <div>
          <h3>评价：</h3>
          <div  @click="setRank">
            <el-rate v-model="rank" allow-half show-text></el-rate>
          </div>
        </div>
      </div>
      <div class="songs-body">
        <songs-content  :listSongs="songList">
          <template slot="title">歌单</template>
        </songs-content>
       <Comment :playId="songListId" :type="1"></Comment>
      </div>
    </div>
  </div>
</template>

<script>
  import {mixin} from '../mixins';
  import {mapGetters}from 'vuex';
  import SongsContent from "../search/SongsContent";
  import Comment from "../components/Comment";
    export default {
        name: "SongListAlbum",
      components: {Comment, SongsContent, SongsContent},
      mixins:[mixin],
        data(){
          return{
            songList:[],
            songListId:'',
            average:0,
            rank:0,
          }
        },
        computed:{
          ...mapGetters([
            'listOfSongs',
            'tempList',
            'isLogin',          //用户是否已登录
            'userId',           //当前登录用户id
          ])
        },
      methods:{
          getSongs() {
            var _this=this;
            this.$axios.get("http://localhost:8888/listSong/selectSongsBySongList/"+this.songListId).then(function (data) {
                for( let item of data.data){
                  _this.getSongById(item.songId);
                }

            })
          },
          getSongById(id) {
            var _this=this;
          this.$axios.get("http://localhost:8888/song/selectSongById/"+id).then(function (data) {
            /*console.log(111)
            console.log(data)*/
            _this.songList.push(data.data);
          })
          },
          getRank(){
            let _this=this;
            this.$axios.get("http://localhost:8888/grade/gradeOfSongListId/"+this.songListId).then(function (data){
              console.log(123456)
              console.log(data);
              _this.average=(data.data)/2;
            })
          },
          setRank(){
            let _this=this;
            if(this.isLogin){
              let param=new URLSearchParams();
              param.append("songListId",this.songListId);
              param.append("userId",this.userId);
              param.append("score",(this.rank)*2);
              this.$axios.post("http://localhost:8888/grade/addGrade",param).then(function (data) {
                if(data.data.status==200){
                  _this.$message({
                    message: data.data.msg,
                    type: 'success'
                  });
                }else{
                  _this.$message.error(data.data.msg);
                }
                }
              )
            }else{
              this.$message.error('请先登录账号');
            }
          }
      },
      created() {
          this.songListId=this.$route.params.id;
          console.log(this.songListId);
          this.getSongs();
          console.log("rankrank")
          this.getRank();
          console.log(111222333)
      },


    }
</script>

<style lang="scss" scoped>
  @import '../assets/css/song-list-album.scss';
</style>

