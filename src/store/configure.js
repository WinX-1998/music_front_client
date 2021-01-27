const configure = {
    state:{
        HOST: 'http://127.0.0.1:8888',  //后台访问地址根目录
        activeName: '' ,                //当前选中的菜单名
        isLogin:false,                  //记录当前用户是否登录
        showAside:false,                 //是否显示歌曲列表
        isActive: false,                //当前歌曲是否已收藏
    },
    getters: {
        activeName: state => {
            let activeName = state.activeName
            if(!activeName){
                activeName = JSON.parse(window.sessionStorage.getItem('activeName'))
            }
            return activeName
        },
      showAside: state => {
        let showAside = state.showAside
        if(!showAside){
          showAside = JSON.parse(window.sessionStorage.getItem('showAside'))
        }
        return showAside
      },
      isLogin: state => {
        let isLogin = state.isLogin
        if(!isLogin){
          isLogin = JSON.parse(window.sessionStorage.getItem('isLogin'))
        }
        return isLogin
      },
      isActive: state => {
        let isActive = state.isActive
        if(!isActive){
          isActive = JSON.parse(window.sessionStorage.getItem('isActive'))
        }
        return isActive
      },
      isSearchUpdate: state => {
        let isSearchUpdate = state.isSearchUpdate
        if(!isSearchUpdate){
          isSearchUpdate = JSON.parse(window.sessionStorage.getItem('isSearchUpdate'))
        }
        return isSearchUpdate
      },

    },
    mutations: {
        setActiveName: (state,activeName) => {
            state.activeName = activeName
            window.sessionStorage.setItem('activeName',JSON.stringify(activeName))
        },
      setShowAside: (state,showAside) => {
        state.showAside = showAside
        window.sessionStorage.setItem('showAside',JSON.stringify(showAside))
      },
      setIsLogin: (state,isLogin) => {
        state.isLogin = isLogin
        window.sessionStorage.setItem('isLogin',JSON.stringify(isLogin))
      },
      setIsSearchUpdate: (state,isSearchUpdate) => {
        state.isSearchUpdate = isSearchUpdate
        window.sessionStorage.setItem('isSearchUpdate',JSON.stringify(isSearchUpdate))
      },
      setIsActive: (state,isActive) => {
        state.isActive = isActive
        window.sessionStorage.setItem('isActive',JSON.stringify(isActive))
      }
    }
}

export default configure
