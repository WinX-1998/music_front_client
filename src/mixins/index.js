import {mapGetters} from 'vuex';
export const mixin = {
  computed: {
    ...mapGetters([
      'isLogin',              //用户是否已登录
      'userId',               //当前登录用户的id
      'isVip',                //当前用户是否是vip
      'isHide',               //是否隐藏
    ])
  },
  methods: {
    //获取图片地址
    attachImageUrl (srcUrl) {
      return srcUrl? this.$store.state.configure.HOST+srcUrl : this.$store.state.configure.HOST+'/img/user.jpg';
    },
    //截取fullname拿到歌手
    getSingerName(str) {
      if(str) {
        let singerName = str.split('-');
        return singerName[0];
      }
    },
    //播放
    toplay: function (id, url,picUrl,index,name,fullName,lyric,vip) {
      console.log(this.isVip);
      if(vip==true){
        if(!this.isVip) {
          this.$notify({
            title: "只有会员可以听",
            type: 'error'
          });
        }else{
          this.$store.commit('setId', id);
          console.log(id);
          this.$store.commit('setUrl',this.$store.state.configure.HOST+url);
          this.$store.commit('setPicUrl',this.$store.state.configure.HOST+picUrl);
          this.$store.commit('setListIndex', index);
          this.$store.commit('setTitle', name);
          this.$store.commit('setArtist',this.getSingerName(fullName));
          this.$store.commit('setLyric', this.parseLyric(lyric));
          this.$store.commit('setIsActive',false);
          if(this.isLogin) {
            let param=new URLSearchParams();
            param.append("userId",this.userId);
            param.append("songId",id);
            let _this=this;
            this.$axios.post("http://localhost:8888/collect/isCollected",param).then(function (data) {
              if(data.data.status==200){
                _this.$store.commit('setIsActive',true);
              }
            })
          }
        }
      }else{
        this.$store.commit('setId', id);
        this.$store.commit('setUrl',this.$store.state.configure.HOST+url);
        this.$store.commit('setPicUrl',this.$store.state.configure.HOST+picUrl);
        this.$store.commit('setListIndex', index);
        this.$store.commit('setTitle', name);
        this.$store.commit('setArtist',this.getSingerName(fullName));
        this.$store.commit('setLyric', this.parseLyric(lyric));
        this.$store.commit('setIsActive',false);
        if(this.isLogin) {
          let param=new URLSearchParams();
          param.append("userId",this.userId);
          param.append("songId",id);
          let _this=this;
          this.$axios.post("http://localhost:8888/collect/isCollected",param).then(function (data) {
            if(data.data.status==200){
              _this.$store.commit('setIsActive',true);
            }
          })
        }
      }

      },
    //解析歌词
    parseLyric(text){
      let lines = text.split("\n");                   //将歌词按行分解成数组
      let pattern = /\[\d{2}:\d{2}.(\d{3}|\d{2})\]/g; //时间格式的正则表达式
      let result = [];                                //返回值
      //对于歌词格式不对的直接返回
      if(!(/\[.+\]/.test(text))){
        return [[0,text]]
      }
      //去掉前面格式不正确的行
      while(!pattern.test(lines[0])){
        lines = lines.slice(1);
      }
      //遍历每一行，形成一个每行带着俩元素的数组，第一个元素是以秒为计算单位的时间，第二个元素是歌词
      for(let item of lines){
        let time = item.match(pattern);  //存前面的时间段
        let value = item.replace(pattern,'');//存后面的歌词
        for(let item1 of time){
          let t = item1.slice(1,-1).split(":");   //取出时间，换算成数组
          if(value!=''){
            result.push([parseInt(t[0],10)*60 + parseFloat(t[1]),value]);
          }
        }
      }
      //按照第一个元素--时间--排序
      result.sort(function(a,b){
        return a[0] - b[0];
      });
      return result;
    },

  }
}
