<template>
  <div class="upload">
    <p class="title">修改头像</p>
    <hr/>
    <div class="section">
      <el-upload drag :action="uploadUrl()" :show-file-list="false" :on-success="handleAvatorSuccess"
                 :before-upload="beforeAvatorUpload">
        <i class="el-icon-upload"></i>
        <div>
          将文件拖到此处，或<span style="color:blue">修改头像</span>
        </div>
        <div slot="tip">只能上传jpg/png文件，且不能超过10MB</div>
      </el-upload>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {mixin} from '../mixins'

  export default {
    name: 'upload',
    mixins: [mixin],
    computed:{
      ...mapGetters([
        'userId',
        'avator'
      ])
    },
    methods:{
      //上传地址
      uploadUrl(){
        return `${this.$store.state.configure.HOST}/user/updateUserAcator?id=${this.userId}`
      },
      //上传成功
      handleAvatorSuccess(res){
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
            title: '上传失败',
            type: 'error'
          });
        }
      },
      //更新头像之前的校验
      beforeAvatorUpload(file){
        const isJPG = (file.type === 'image/jpeg')|| (file.type === 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import '../assets/css/upload.scss';
</style>
