<template>
  <div class="container">
    <el-row class="form-body">
     <div class="titleStyle"><h2>登录</h2></div>
      <el-form ref="form" :model="loginForm" label-width="0px">
        <el-form-item  class="form-item">
          <el-input placeholder="请输入用户名" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="form-confirm">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="toRegister" class="form-confirm">去注册</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loginForm: {
          name: '',
          password: '',
        }
      }
    },
    methods: {
      onSubmit() {
        const _this=this;
        this.$axios.post("http://localhost:8888/user/login",this.loginForm).then(function (response) {
          if (response.data.msg=='success'){
            _this.$message({
              message: '登录成功!',
              type: 'success'
            });
            _this.$store.commit('setIsLogin',true);
            _this.$store.commit('setUserId',response.data.object.userId);
            _this.$store.commit('setUsername',response.data.object.username);
            _this.$store.commit('setAvator',response.data.object.avator);
            setTimeout(function(){
              _this.changeIndex('首页');
              _this.$router.push({path: '/'});
            },2000);
          }else{
            _this.$message({
              message: '用户名或密码错误!',
              type: 'error'
            });
          }
        })
      },
      toRegister(){
        this.$router.push('/register');
      },
      changeIndex(value){
        this.$store.commit('setActiveName',value);
      }
    }
  }
</script>

<style scoped>
  .container{
    height: 100%;
    width: 100%;
    /*background-image: url("../../static/homeMask.png");*/
    background-color: #ebeef0;
    background-size: cover;
    position: fixed;
    left: 0px;
    top:0px;
    padding-top: 30px;
  }
  .form-body{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    border-radius: 10px;
    margin: 0 auto;
    width: 25%;
    min-width: 300px;
    padding: 30px 30px 15px 30px;
    background-color: rgba(255,255,255,0.8);
    box-shadow: 5px 3px 10px rgba(0,0,0,0.9);
  }
  .titleStyle{
    margin-left: 138px;
    margin-bottom: 25px;
  }
  .form-confirm{
    width: 100%;
    background-color: #585858;
    border: 2px solid #484848;
    border-radius: 4px;
  }
</style>
