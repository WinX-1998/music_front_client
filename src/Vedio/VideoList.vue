<template>
  <div class="song-list">
    <ul class="song-list-header">
      <li v-for="(item,index) in videoStyleList" :key="index" @click="handleChangeView(item.name)"
          :class="{active:item.name==activeName}">
        {{item.name}}
      </li>
    </ul>
    <div>
      <ContentList :contentList="data"></ContentList>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" background layout="total,prev,pager,next"
                       :current-page="currentPage" :page-size="pageSize" :total="albumDatas.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import ContentList from '../components/ContentList';
  import {songStyle} from "../assets/data/songList";
    export default {
      name: "VideoList",
      components:{
        ContentList
      },
      created() {
        let _this=this;
        this.$store.commit('setIsHide',false);
        this.$axios.get("http://localhost:8888/videoStyle/selectAllVideoStyle").then(function (data) {
          console.log(data);
          let all={name:'全部'};
          _this.videoStyleList.push(all);
          for(let item of data.data){
            _this.videoStyleList.push(item)
          }
        })
        },
      data(){
        return{
          albumDatas: [],      //歌单数据
          pageSize: 15,        //页面大小，一页有15条数据
          currentPage: 1,      //当前页，默认第一页
          songStyle: [],           //风格
          activeName: '全部',    //当前风格
          videoStyleList:[]
        }
      },
      computed:{
        ...mapGetters([
          'isHide'
        ]),
        //计算当前表格中的数据
        data(){
          return this.albumDatas.slice((this.currentPage - 1)*this.pageSize,this.currentPage*this.pageSize)
        }
      },
      mounted(){
       // this.songStyle = songStyle;
        this.getVideoList();
      },
      methods:{
        goArticleContent(id){
          console.log(id);
          this.$router.push({path:"/blog-content",query:{articleId:id}});
        },
        getVideoList(){
          let _this=this;
          this.$axios.get("http://localhost:8888/StudyVideo/selectAllStudyVideos").then(function (data) {
            console.log(data);
            _this.albumDatas=data.data;
            _this.currentPage=1;
          })
        },
        //获取当前页
        handleCurrentChange(val){
          this.currentPage = val;
        },
        //根据style显示对应的歌单
        handleChangeView(name){
          this.activeName = name;
          this.albumDatas = [];
          if(name == '全部'){
            this.getVideoList();
          }else{
            this.getVideoListByStyle(name)
          }
        },
        //根据style查询对应的歌单
        getVideoListByStyle(style){
          let _this=this;
          console.log(style);
          this.$axios.get("http://localhost:8888/StudyVideo/selectStudyVideoByStyle/"+style).then(function (data) {
            console.log(data);
            _this.currentPage = 1;
            _this.albumDatas = data.data;
          })
        },

      }
    }
</script>

<style lang="scss" scoped>
  @import '../assets/css/song-list.scss';
</style>
