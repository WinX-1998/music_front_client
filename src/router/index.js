import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
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

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
    }

  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
