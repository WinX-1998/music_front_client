<template>
  <div class="song-list">
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
    export default {
        name: "QueryVideoList",
      components:{
        ContentList
      },
      data(){
        return{
          albumDatas: [],      //歌单数据
          pageSize: 15,        //页面大小，一页有15条数据
          currentPage: 1,      //当前页，默认第一页
          songStyle: [],           //风格
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
      methods:{
        goArticleContent(id){
          console.log(id);
          this.$router.push({path:"/blog-content",query:{articleId:id}});
        },
        //获取当前页
        handleCurrentChange(val){
          this.currentPage = val;
        },

      }
    }
</script>


<style lang="scss" scoped>
  @import '../assets/css/song-list.scss';
</style>
