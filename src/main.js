import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import './assets/css/index.scss'
import ElementUI from 'element-ui'
import axios from 'axios' //引入axios
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/js/iconfont.js'
import '@/assets/js/iconfont1.js'
import '@/assets/js/iconfont2.js'
import '@/assets/js/iconfont3.js'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css' // 引入样式
import 'vue-video-player/src/custom-theme.css' // 引入样式
import 'videojs-flash'
import 'mavon-editor/dist/css/index.css'
import mavonEditor from 'mavon-editor'  // 引入mavon-editor 就是上面所安装的


Vue.use(VueVideoPlayer)
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$axios = axios; //添加axios到Vue的原型对象上



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
