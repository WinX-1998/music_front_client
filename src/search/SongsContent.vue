<template>
    <div class="content">
      <h1 class="title">
        <slot name="title"></slot>
      </h1>
      <ul>
        <li>
          <div class="song-item">
            <span class="item-index"></span>
            <span class="item-name">歌手名</span>
            <span class="item-title">歌曲名</span>
            <span class="item-intro">专辑</span>
            <span class="item-index"></span>

          </div>
        </li>
        <li v-for="(item,index) in listSongs" :key="index">
          <div class="song-item"  @click="toplay(item.id,item.url,item.pic,index,item.name,item.fullName,item.lyric,item.vip)">
          <span class="item-index">
            {{index+1}}
          </span>
          <span class="item-name">{{getSingerName(item.fullName)}}</span>
          <span class="item-title">{{item.name}}  </span>
          <span class="item-intro">{{item.introduction}}</span>
            <div v-if="item.vip" class="item-index"><el-tag>会员可听</el-tag></div>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
    import {mapGetters} from'vuex';
    import {mixin} from '../mixins';
    export default {
        mixins: [mixin],
        name: "SongsContent",
        data(){
          return{
          }
        },
      props:[
        'listSongs'
      ],
    }
</script>

<style lang="scss" scoped>
  @import '../assets/css/album-content.scss';
  .el-tag {
    background-color: #ecf5ff;
    border-color: #d9ecff;
    display: inline-block;
    height: 32px;
    margin-top: 5px;
    padding-top: 0px;
    padding-right: 23px;
    padding-bottom: 0px;
    padding-left: 10px;
    line-height: 30px;
    font-size: 12px;
    color: #409EFF;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>
