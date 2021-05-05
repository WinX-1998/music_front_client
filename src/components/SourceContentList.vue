<template>
  <div class="content-list">
    <ul class="section-content">
      <li class="content-item" v-for="(item,index) in contentList" :key="index">
        <div class="kuo" @click="goAlbum(item)">
          <img class="item-img" :src="attachImageUrl(item.firstPic)">
          <div class="mask">
           <!-- <svg class="icon">
              <use xlink:href="#icon-bofang"></use>
            </svg>-->
          </div>
        </div>
        <p class="item-name">{{item.name||item.title}}</p>
      </li>
    </ul>
  </div>
</template>


<script>
    import {mixin} from '../mixins';
    export default {
        name: "SourceContentList",
      name: 'content-list',
      mixins: [mixin],
      props: ['contentList'],
      methods:{
        goVideoPlay(id){
          window.location = "http://localhost:8888/StudySource/download/" + id;
         /* console.log(id);
          this.$axios.get("http://localhost:8888/StudySource/download/"+id).then(function (data) {
              console.log(data);
            const blob = new Blob([data.data], { type: 'application/rar' })
            const url = window.URL.createObjectURL(blob)
            window.location.href = url
          })*/
        },
        goAlbum(item){
          //歌手
            this.$router.push({path:`singer-album/${item.id}`});
        },
        getUrl(url){
          return `${this.$store.state.HOST}/${url}`
        },
      }
    }
</script>

<style lang="scss" scoped>
  @import '../assets/css/content-list.scss';
</style>
