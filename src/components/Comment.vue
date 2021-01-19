<template>
<div>
  <div class="comment">
    <h2>评论</h2>
    <div class="comment-msg">
      <div class="comment-img">
        <img :src="attachImageUrl(avator)">
      </div>
      <el-input class="comment-input" type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
      </el-input>
    </div>
    <el-button type="primary" class="sub-btn" @click="postComment">评论</el-button>
  </div>
  <p>精彩评论：共{{commentList.length}}条评论</p>
  <ul class="popular" v-for="(item,index) in commentList" :key="index">
    <li>
      <div class="popular-img">
        <img :src="attachImageUrl(userPic[index])">
      </div>
      <div class="popular-msg">
        <ul>
          <li class="name">{{userName[index]}}</li>
          <li class="time">{{item.createTime}}</li>
          <li class="content">{{item.content}}</li>
        </ul>
      </div>
      <div class="up" ref="up" @click="postUp(item.id,item.up,index)">
        <svg class="icon">
          <use xlink:href="#icon-zan"></use>
        </svg>
        {{item.up}}
      </div>
    </li>
  </ul>
</div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {mixin} from '../mixins';
    export default {
      name: "Comment",
      mixins: [mixin],
      props: [
        'playId',       //歌曲或歌单id
        'type'          //0歌曲、1歌单
      ],
      computed: {
        ...mapGetters([
          'id',               //歌曲或歌单id
          'isLogin',          //用户是否已登录
          'userId',           //当前登录用户id
          'avator',           //当前登录用户头像
        ])
      },
      data() {
        return {
          textarea: '',        //存放输入的评论内容
          commentList: [],    //存放评论列表
          userPic: [],        //用户的头像
          userName: [],       //用户的昵称
        }
      },
      mounted() {
        this.getComment();
      },
      methods: {
        postComment() {
          let _this=this;
          if (this.isLogin) {
            let params = new URLSearchParams();
            if (this.type == 0) {
              params.append('songId', this.playId);
            } else {
              params.append('songListId', this.playId);
            }
            params.append('userId', this.userId);
            params.append('type', this.type);
            params.append('content', this.textarea);
            this.$axios.post("http://localhost:8888/comment/addComment", params).then(function (data) {
              console.log(data);
              if(data.data.status==200){
                _this.textarea='';
                _this.$message({
                  message: data.data.msg,
                  type: 'success'
                });
              }else{
                _this.$message.error(data.data.msg);
              }
            })
          }else{
            this.$message.error('请先登录账号');
          }
        },
        getComment(){
          let _this=this;
          if(this.type==0){
          this.$axios.get("http://localhost:8888/comment/selectCommentBySongId/"+this.playId).then(function (data) {
            console.log(123654);
            console.log(data);
             _this.commentList=data.data;
              for(let item of data.data){
                _this.getUser(item.userId);
              }
          })
          }else{
            this.$axios.get("http://localhost:8888/comment/selectCommentBySongListId/"+this.playId).then(function (data) {
              console.log(123654);
              console.log(data.data);
              _this.commentList=data.data;
              for(let item of data.data){
                _this.getUser(item.userId);
              }
            })
          }
        },
        getUser(id){
          let _this=this;
          this.$axios.get("http://localhost:8888/user/selectUserById/"+id).then(function (data) {
            console.log(data);
              _this.userPic.push(data.data.avator);
              _this.userName.push(data.data.username);
          })
        },
        //给某一个评论点赞
        postUp(id,up,index){
          let _this=this;
          if(this.isLogin){
            let params = new URLSearchParams();
            params.append('id',id);
            params.append('up',up+1);
            this.$axios.post("http://localhost:8888/comment/like",params).then(function (data) {
                  if(data.data.status==200){
                    _this.$refs.up[index].children[0].style.color = '#2796cd';
                    _this.getComment();
                  }else{
                    this.$message.error('点赞失败');
                  }
            })
          }else{
            this.$message.error('请先登录账号');
          }
        }
      }
    }

</script>

<style lang="scss" scoped>
  @import '../assets/css/comment.scss';
</style>
