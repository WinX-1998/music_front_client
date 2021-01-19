<template>
  <div class="container">
    <div class="form-body">
      <div class="titleStyle"><h2>注册账户</h2></div>
      <el-form ref="registerForm" :rules="rules" :model="registerForm" label-width="85px">
        <el-form-item  prop="username" class="form-item" label="用户名">
          <el-input placeholder="请输入用户名" v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input placeholder="请输入密码" v-model="registerForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" label="确认密码">
          <el-input placeholder="请确认密码" v-model="registerForm.checkPass" show-password></el-input>
        </el-form-item>
        <el-form-item prop="sex" label="性别">
          <el-radio-group v-model="registerForm.sex">
            <el-radio :label="0">女</el-radio>
            <el-radio :label="1">男</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="phoneNum" label="手机">
          <el-input v-model="registerForm.phoneNum" placeholder="手机"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="registerForm.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="birth" label="生日">
          <el-date-picker v-model="registerForm.birth" placeholder="选择日期" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item prop="introduction" label="签名">
          <el-input v-model="registerForm.introduction" type="textarea" placeholder="签名"></el-input>
        </el-form-item>
        <el-form-item prop="location" label="地区">
          <el-select v-model="registerForm.location" placeholder="地区" style="width: 100%;">
            <el-option v-for=" item in cities" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
          <el-button type="primary"  @click="onSubmit('registerForm')" class="form-confirm">注册</el-button>
        <br/>
          <el-button type="primary" @click="toLogin" class="form-confirm">去登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {cities} from "../assets/data/form";

  export default {
        name: "SignUp",
      data(){
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.registerForm.checkPass !== '') {
              this.$refs.registerForm.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.registerForm.password) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          registerForm: {
              username: '',       //用户名
              password: '',       //密码
              checkPass:'',       //确认密码
              sex: '',            //性别
              phoneNum: '',       //手机
              email: '',          //邮箱
              birth: '',          //生日
              introduction: '',   //签名
              location: ''  ,     //地区
              cities: [],          //所有的地区--省
            },
          rules: {
            username: [
              { required: true, message: '请输入用户名', trigger: 'blur' },
              { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
            ],
            password: [
              { required: true, validator: validatePass, trigger: 'blur' },
              {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
            ],
            checkPass: [
              {required: true, validator: validatePass2, trigger: 'blur' }
            ],
            birth: [
              { type: 'date', required: true, message: '请选择您的生日', trigger: 'change' }
            ],
            sex: [
              { required: true, message: '请选择性别', trigger: 'change' }
            ],
            phoneNum: [
              { required: true, message: '请填写您的电话号码', trigger: 'blur' },
            ],
            email: [
              {required: true,message: '请输入电子邮箱',trigger: 'blur'},
              {type: 'email',message:'请输入正确的电子邮箱地址',trigger:['blur','change']}
            ],
            location: [
              { required: true, message: '请填写您的地址', trigger: 'blur' }
            ],
            introduction: [
              { message: '请填写您的个性签名', trigger: 'blur' }
            ],
          },
        }
      },
      created() {
        this.cities = cities;
      },
      methods:{
        onSubmit(registerForm){
          const _this=this;
          this.$refs[registerForm].validate((valid) => {
            if (valid) {
              _this.$axios.post("http://localhost:8888/user/add",_this.registerForm).then(function (data) {
                if(data.data.status==200){
                  _this.$message({
                    message: '注册成功!',
                    type: 'success'
                  })
                  setTimeout(function(){
                    _this.changeIndex('登录');
                    _this.$router.push({path: '/login'});
                  },1000);
                }else{
                  _this.$message({
                    message: '注册失败!',
                    type: 'error'
                  });
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        toLogin(){
          this.$router.push('login');
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
    /*background-image: url("../../static/bg.png");*/
   /* background-image: url("../../static/homeMask.png");*/
    background-color: #ebeef0;
    background-size: cover;
    position: fixed;
    left: 0px;
    top:0px;
    overflow: auto;
  }
  .form-body{
    border-radius: 10px;
    margin: 80px auto 80px auto;
    width: 20%;
    min-width: 380px;
    padding: 30px 30px 15px 30px;
    background-color: rgba(255,255,255,0.8);
    box-shadow: 5px 3px 10px rgba(0,0,0,0.9);
  }
  .form-confirm{
    width: 80%;
    margin-left: 42px;
    margin-bottom: 15px;
    background-color: #585858;
    border: 2px solid #484848;
    border-radius: 4px;
  }
  .el-form-item{
    margin-left: -20px;
  }

  .fontstyle {
    margin-bottom: 5px;
    display: inline-block;
    width: 100%;
    color: #67757f;
    font-weight: 700;
  }
  .titleStyle{
    margin-left: 145px;
    margin-bottom: 25px;
  }

  .form-body{
    overflow: auto;
  }
</style>
