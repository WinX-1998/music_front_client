<template>
  <div class="my-music">
    <div class="album-slide">
      <div class="album-img">
        <img :src="attachImageUrl(avator)">
      </div>
      <ul class="album-info">
        <li>昵称:    {{username}}</li>
        <li>性别:    {{userSex}}</li>
        <li>生日：{{birth}}</li>
        <li>故乡：{{location}}</li>
      </ul>
    </div>
    <div class="album-content">
      <div class="album-title">
        个性签名：{{introduction}}
      </div>
      <div class="songs-body">
        <songs-content :listSongs="collectList">
          <template slot="title">我的收藏</template>
        </songs-content>
      </div>
    </div>
  </div>
</template>

<script>
  import {mixin} from '../mixins';
  import {mapGetters} from 'vuex';
  import SongsContent from "../search/SongsContent";

  export default {
    name: 'my-music',
    mixins: [mixin],
    components:{
      SongsContent,
    },
    data(){
      return {
        avator: '',       //用户头像
        username: '',     //昵称
        userSex: '',      //性别
        birth: '',        //生日
        location: '',     //故乡
        introduction: '', //签名
        collection: [],     //收藏的歌曲列表
        collectList: [],    //收藏的歌曲列表（带歌曲详情）
      }
    },
    computed:{
      ...mapGetters([
        'listOfSongs',      //当前播放列表
        'userId',           //当前登录用户id
      ])
    },
    mounted(){
      this.getMsg(this.userId);
      this.getCollection(this.userId);
    },
    methods:{
      getMsg(userId){
        let _this=this;
        this.$axios.get("http://localhost:8888/user/selectUserById/"+userId).then(function (data) {
          console.log(data.data);
          _this.avator = data.data.avator;
          _this.username = data.data.username;
          if(data.data.sex==0){
            _this.userSex = '女';
          }else if (data.data.sex==1){
            _this.userSex = '男';
          }
          _this.birth =data.data.birth;
          _this.location = data.data.location;
          _this.introduction = data.data.introduction;
        })
      },
      //获取我的收藏列表
      getCollection(userId){
        let _this=this;
        this.$axios.get("http://localhost:8888/collect/selectCollectByUserId/"+userId).then(function (data) {
          _this.collection=data.data;
          for(let item of data.data){
              _this.getSongsOfIds(item.songId);
          }
        })
      },

      //通过歌曲id获取歌曲信息
      getSongsOfIds(id){
        let _this=this;
        this.$axios.get("http://localhost:8888/song/selectSongById/"+id).then(function (data) {
            _this.collectList.push(data.data);
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/my-music.scss';
</style>
