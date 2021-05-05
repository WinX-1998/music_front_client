<template>
  <div class="homepage-hero-module">
    <div class="video-container">
      <div :style="fixStyle" class="filter"></div>
      <video :style="fixStyle" autoplay loop class="fillWidth"  muted='muted' v-on:canplay="canplay">
        <source src="http://localhost:8888/StudyVideo/getIndexVideo" type="video/mp4"/>
      </video>
      <div class="poster hidden" v-if="!vedioCanPlay">
        <img :style="fixStyle" src="#" alt="">
      </div>
      <div class="box">
        <div><div class="ms-title">Welcome To Learning Resource Sharing System</div></div>
      <div class="ms-nav">
        <el-menu :default-active="this.$router.path" router mode="horizontal">
          <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name" @click="changeActiveName(item.navItem)">
            {{ item.navItem }}
          </el-menu-item>
        </el-menu>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: "IndexFirst",
      data() {
        return {
          vedioCanPlay: false,
          fixStyle: '',
          navList:[
            {name:'/article-list',navItem:'博客文章'},
            {name:'/video-list',navItem:'学习视频'},
            {name:'/source-list',navItem:'资源下载'},
          ]
        }
      },
      computed:{
        ...mapGetters([
          'isHide',
          'activeName',
        ]),
      },
      methods: {
        canplay() {
          this.vedioCanPlay = true
        },
        changeActiveName(navItem){
          this.$store.commit('setActiveName',navItem);
          console.log(this.activeName);
        }
      },
      created() {
         this.$store.commit('setIsHide',true);
         console.log(this.isHide)
      },
      mounted: function() {
        window.onresize = () => {
          const windowWidth = document.body.clientWidth
          const windowHeight = document.body.clientHeight
          const windowAspectRatio = windowHeight / windowWidth
          let videoWidth
          let videoHeight
          if (windowAspectRatio < 0.5625) {
            videoWidth = windowWidth
            videoHeight = videoWidth * 0.5625
            this.fixStyle = {
              height: windowWidth * 0.5625 + 'px',
              width: windowWidth + 'px',
              'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
              'margin-left': 'initial'
            }
          } else {
            videoHeight = windowHeight
            videoWidth = videoHeight / 0.5625
            this.fixStyle = {
              height: windowHeight + 'px',
              width: windowHeight / 0.5625 + 'px',
              'margin-left': (windowWidth - videoWidth) / 2 + 'px',
              'margin-bottom': 'initial'
            }
          }
        }
        window.onresize();
      }
    }
</script>

<style scoped>
  .homepage-hero-module,
  .video-container {
    position: relative;
    height: 100vh;
    overflow: hidden;
  }

  .video-container .poster img,
  .video-container video {
    z-index: 0;
    position: absolute;
  }

  .video-container .filter {
    z-index: 1;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
  }
  .ms-title {
    position: absolute;
    top: 55%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    font-weight: 600;
    color: #fff;
  }
  .ms-nav {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    height: 160px;
    margin-left: -190px;
    margin-top: -150px;
    padding: 40px;
    border-radius: 5px;
    background: transparent;
  }
  .el-menu {
    background-color:transparent;
  }
  .box{
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 100%;
  }
</style>
