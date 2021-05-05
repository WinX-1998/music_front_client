<template>
  <div class="song-list">
    <ul class="song-list-header">
      <li v-for="(item,index) in sourceStyle" :key="index" @click="handleChangeView(item.name)"
          :class="{active:item.name==activeName}">
        {{item.name}}
      </li>
    </ul>
    <div>
      <SourceContentList :contentList="data"></SourceContentList>
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
  import SourceContentList from "../components/SourceContentList";
  import {sourceStyle} from '../assets/data/sourceStyle';

    export default {
        name: "SourceList",
      components:{
        SourceContentList,
      },
      data(){
        return{
          albumDatas: [],      //歌单数据
          pageSize: 15,        //页面大小，一页有15条数据
          currentPage: 1,      //当前页，默认第一页
          sourceStyle: [],           //风格
          activeName: '全部'    //当前风格
        }
      },
      created() {
        this.$store.commit('setIsHide',false);
        let _this=this;
        if(this.$route.query.videoIds){
          console.log(111)
          console.log(this.$route.query.videoIds)
          let param=new URLSearchParams();
          param.append("ids",this.$route.query.videoIds);
          this.$axios.post("http://localhost:8888/StudyVideo/selectStudyVideoByIds",param).then(function (data) {
            _this.albumDatas=data.data;
            console.log(_this.albumDatas);
          })
        }
        this.$axios.get("http://localhost:8888/StudySourceStyle/selectAllStudySourceStyle").then(function (data) {
          let all={name:'全部'};
          _this.sourceStyle.push(all);
          for(let item of data.data){
            _this.sourceStyle.push(item);
          }
        })
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
        //this.sourceStyle = sourceStyle;
        this.getSourceList();
      },
      methods:{
        goArticleContent(id){
          console.log(id);
          this.$router.push({path:"/blog-content",query:{articleId:id}});
        },
        getSourceList(){
          let _this=this;
          this.$axios.get("http://localhost:8888/StudySource/selectAllStudySources").then(function (data) {
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
            this.getSourceList();
          }else{
            this.getSourceListByStyle(name)
          }
        },
        //根据style查询对应的歌单
        getSourceListByStyle(style){
          let _this=this;
          console.log(style);
          this.$axios.get("http://localhost:8888/StudySource/selectStudySourcesByStyle/"+style).then(function (data) {
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
