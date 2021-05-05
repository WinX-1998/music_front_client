import Vue from 'vue'
import Router from 'vue-router'
import MyMusic from '@/pages/MyMusic'
import Singer from '@/pages/Singer'
import SongList from '@/pages/SongList'
import Search from '@/pages/Search'
import SearchSongs from "../search/SearchSongs";
import SearchSongLists from "../search/SearchSongLists";
import Lyric from "../components/Lyric";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import SingerAlbum from "../pages/SingerAlbum";
import SongListAlbum from "../pages/SongListAlbum";
import Setting from "../components/Setting";
import BlogContent from "../blog/BlogContent";
import BlogList from "../blog/BlogList";
import VideoList from "../Vedio/VideoList";
import MyVideoPlayer from "../Vedio/MyVideoPlayer";
import SourceList from "../Source/SourceList";
import SourceContentList from "../components/SourceContentList";
import sourceUpload from "../upload/sourceUpload";
import ArticleList from "../blog/ArticleList";
import IndexFirst from "../components/IndexFirst";
import Bpp from "../Bpp";
import QueryArticleList from "../blog/QueryArticleList";
import QueryVideoList from "../Vedio/QueryVideoList";
import QuerySourceList from "../Source/QuerySourceList";

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      name:'bpp',
      component: Bpp,
      children:[
        {
          path:"/index-first",
          name:"index-first",
          component:IndexFirst
        },
        {
          path:'/article-list',
          name:'article-list',
          component:ArticleList
        },
        {
          path:"/blog-content",
          name:"BlogContent",
          component:BlogContent
        },
        {
          path:"/query-article-list",
          name:"QueryArticleList",
          component:QueryArticleList
        },
        {
          path:'/video-list',
          name:'VideoList',
          component:VideoList
        },
        {
          path:'/query-video-list',
          name:'QueryVideoList',
          component:QueryVideoList
        },
        {
          path:'/query-source-list',
          name:'QuerySourceList',
          component:QuerySourceList
        },
        {
          path:'/my-video-player',
          name:'MyVideoPlayer',
          component:MyVideoPlayer
        },
        {
          path:'/source-list',
          name:'SourceList',
          component:SourceList
        },
        {
          path:'/singer-album/:id',
          name:'SingerAlbum',
          component:SingerAlbum
        },
        {
          path:'/sourceUpload',
          name:'sourceUpload',
          component:sourceUpload
        },
        {
          path:'/sign-up',
          name:'sign-up',
          component:SignUp
        },
        {
          path:'/login',
          name:'login',
          component:Login
        },
        {
          path:'/setting',
          name:'setting',
          component:Setting
        },
      ]

    },
    {
      path: '/my-music',
      name: 'my-music',
      component: MyMusic
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer
    },
    {
      path: '/song-list',
      name: 'song-list',
      component: SongList
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path:'/searchSongs',
      name:'searchSongs',
      component:SearchSongs
    },
    {
      path:'/searchSongLists',
      name:'searchSongLists',
      component:SearchSongLists
    },
    {
      path:'/lyric',
      name:'lyric',
      component:Lyric
    },
    {
      path:'/sign-up',
      name:'sign-up',
      component:SignUp
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/singer-album/:id',
      name:'SingerAlbum',
      component:SingerAlbum
    },
    {
      path:'/song-list-album/:id',
      name:'SongListAlbum',
      component:SongListAlbum
    },
    {
      path:'/setting',
      name:'setting',
      component:Setting
    },
    {
      path:"/blog-content",
      name:"BlogContent",
      component:BlogContent
    },
    {
      path:"/blog-list",
      name:"BlogList",
      component:BlogList
    },
    {
      path:'/video-list',
      name:'VideoList',
      component:VideoList
    },
    {
      path:'/my-video-player',
      name:'MyVideoPlayer',
      component:MyVideoPlayer
    },
    {
      path:'/source-list',
      name:'SourceList',
      component:SourceList
    },
    {
      path:'/source-content-list',
      name:'SourceContentList',
      component:SourceContentList
    },
    {
      path:'/sourceUpload',
      name:'sourceUpload',
      component:sourceUpload
    }

  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
