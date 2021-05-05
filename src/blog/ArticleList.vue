<template>
  <div>
  <div class="song-list">
    <ul class="song-list-header">
      <li v-for="(item,index) in this.tagList" :key="index" @click="handleChangeView(item.name,item.id)"
          :class="{active:item.name==activeName}">
        {{item.name}}
      </li>
    </ul>
    <div>
      <ArticleContentList :contentList="data"></ArticleContentList>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" background layout="total,prev,pager,next"
                       :current-page="currentPage" :page-size="pageSize" :total="albumDatas.length">
        </el-pagination>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import ArticleContentList from "./ArticleContentList";
  export default {
    name: "ArticleList",
    components:{
      ArticleContentList,
    },
    data(){
      return{
        tagList:[],
        albumDatas: [],      //歌单数据
        pageSize: 15,        //页面大小，一页有15条数据
        currentPage: 1,      //当前页，默认第一页
        songStyle: [],           //风格
        activeName: '全部',    //当前风格
        input: ''
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
    created() {
      this.$store.commit('setIsHide',false);
      let _this=this;
      this.$axios.get("http://localhost:8888/tag/selectAllTag").then(function (data) {
          console.log(data);
          let all={name:'全部'};
          _this.tagList.push(all);
          for(let item of data.data){
            _this.tagList.push(item);
          }
      })
    },
    mounted(){
      this.getArticleList();
    },
    methods:{
      goArticleContent(id){
        console.log(id);
        this.$router.push({path:"/blog-content",query:{articleId:id}});
      },
      getArticleList(){
        let _this=this;
        this.$axios.get("http://localhost:8888/article/selectAll").then(function (data) {
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
      handleChangeView(name,id){
        this.activeName = name;
        this.albumDatas = [];
        if(name == '全部'){
          this.getArticleList();
        }else{
          this.getArticleListByTag(id)
        }
      },
      //根据style查询对应的歌单
      getArticleListByTag(id){
        let _this=this;
        console.log(id);
        this.$axios.get("http://localhost:8888/article/selectArticleByTag/"+id).then(function (data) {
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
