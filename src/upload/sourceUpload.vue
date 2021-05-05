<template>
  <div class="upload">
    <p class="title">上传文件</p>
    <hr/>
    <div class="section">
      <el-upload drag :action="uploadUrl()" :show-file-list="false" :on-success="handleAvatorSuccess"
                 :before-upload="beforeAvatorUpload">
        <i class="el-icon-upload"></i>
        <div>
          将文件拖到此处，或<span style="color:blue">点击上传</span>
        </div>
        <div slot="tip">请上传压缩包，并且附上该资料的简介</div>
      </el-upload>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {mixin} from '../mixins'

  export default {
    name: 'sourceUpload',
    mixins: [mixin],
    computed:{
      ...mapGetters([
        'userId',
        'avator',
        'isLogin',
        'isHide'
      ])
    },
    created() {
      this.$store.commit('setIsHide',false);
      if(!this.isLogin){
        this.$notify({
          title:"请先登录",
          type: 'error'
        });
        this.$router.push("/login")
      }
    },
    methods:{
      //上传地址
      uploadUrl(){
        return `${this.$store.state.configure.HOST}/userStudySource/uploadStudySource?id=${this.userId}`
      },
      //上传成功
      handleAvatorSuccess(res){
        console.log(res);
        let _this = this;
        if(res.status == 200){
          _this.$notify({
            title: '上传成功',
            type: 'success'
          });
          this.$axios.get("http://localhost:8888/user/getAcator/"+this.userId).then(function (data) {
            _this.$store.commit("setAvator",data.data);
          })
        }else{
          _this.$notify({
            title: res.msg,
            type: 'error'
          });
        }
      },
      //更新头像之前的校验
      beforeAvatorUpload(file){
        let fileName = file.name
        let pos = fileName.lastIndexOf('.')
        let lastName = fileName.substring(pos, fileName.length)
        if (lastName.toLowerCase() !== '.zip' &&lastName.toLowerCase() !== '.rar') {
          this.$message.error('文件必须为.zip或者.rar类型')
          // this.resetCompressData()
          return
        }
        // 限制上传文件的大小
        const isLt =
          file.size / 1024 / 5 >= 1 && file.size / 1024 / 1024 / 100 <= 1
        if (!isLt) {
          this.$message.error('上传文件大小不得小于5KB,不得大于100MB!')
        }
        return isLt
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import '../assets/css/upload.scss';
</style>
