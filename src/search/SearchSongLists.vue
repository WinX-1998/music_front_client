<template>
  <div class="search-song-Lists">
    <content-list :contentList="albumDatas"></content-list>
  </div>
</template>

<script>
  import ContentList from "../components/ContentList";
    export default {
        name: "SearchSongLists",
        components: {ContentList},
        data(){
          return{
            albumDatas: []
          }
        },
        mounted(){
        this.getSearchList();
        },
        methods:{
        getSearchList(){
          let _this=this;
          if(!this.$route.query.keywords){
            this.notify('您输入的内容为空','warning')
          }else{
            this.$axios.get("http://localhost:8888/songList/selectSongListsLikeTitle/"+this.$route.query.keywords).then(function (data) {
              if(data.data.length!=0) {
                _this.albumDatas = data.data;
              }else{
                _this.$message.error("暂无资源");
              }
              })
           }
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import '../assets/css/search-song-lists.scss';
</style>
