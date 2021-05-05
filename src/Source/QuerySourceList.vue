<template>
  <div class="song-list">
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
    export default {
        name: "QuerySourceList",
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
        if(this.$route.query.sourceIds){
          console.log(111)
          console.log(this.$route.query.sourceIds)
          let param=new URLSearchParams();
          param.append("ids",this.$route.query.sourceIds);
          this.$axios.post("http://localhost:8888/StudySource/selectStudySourceByIds",param).then(function (data) {
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
