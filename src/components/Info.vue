<template>
  <div>
    <div class="info">
      <div class="title">
        <span>编辑个人资料</span>
      </div>
      <hr/>
      <div class="personal">
        <el-form :model="registerForm" ref="registerForm" label-width="70px" class="demo-ruleForm" :rules="rules">
          <el-form-item prop="id" label="用户名" hidden>
            <el-input v-model="registerForm.id" ></el-input>
          </el-form-item>
          <el-form-item prop="username" label="用户名">
            <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
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
            <el-date-picker type='date' :editable="false" v-model="registerForm.birth" placeholder="选择日期" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item prop="introduction" label="签名">
            <el-input v-model="registerForm.introduction" placeholder="签名"></el-input>
          </el-form-item>
          <el-form-item prop="location" label="地区">
            <el-select v-model="registerForm.location" placeholder="地区" style="width: 100%;">
              <el-option v-for=" item in cities" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="btn">
          <div @click="saveMsg">保存</div>
          <div @click="goback(-1)">取消</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {cities} from '../assets/data/form'
    export default {
      name: "Info",
      data() {
        return {
          registerForm: {
            id:'',
            username: '',       //用户名
            sex: '',            //性别
            phoneNum: '',       //手机
            email: '',          //邮箱
            birth: '',          //生日
            introduction: '',   //签名
            location: ''       //地区
          },
          cities: [],            //所有的地区--省
          rules: {}               //表单提交的规则
        }
      },
      computed:{
        ...mapGetters([
          'userId'
        ])
      },
      created() {
        this.cities = cities;
      },
      mounted(){
        this.getMsg(this.userId);
      },
      methods:{
        getMsg(userId){
          let _this=this;
          this.$axios.get("http://localhost:8888/user/selectUserById/"+userId).then(function (data) {
            console.log(data.data)
            _this.registerForm.id=data.data.id;
            _this.registerForm.username = data.data.username;
            _this.registerForm.password = data.data.password;
            _this.registerForm.sex = data.data.sex;
            _this.registerForm.phoneNum = data.data.phoneNum;
            _this.registerForm.email = data.data.email;
            _this.registerForm.birth = data.data.birth;
            _this.registerForm.introduction = data.data.introduction;
            _this.registerForm.location = data.data.location;
          })
        },
        saveMsg(){
          let _this = this;
         this.$axios.post("http://localhost:8888/user/updateUser",this.registerForm).then(function (data) {
              console.log(data);
              if(data.data.status==200){
                _this.$notify({
                  title: data.data.msg,
                  type: 'success'
                });
              }else{
                _this.$notify({
                  title: data.data.msg,
                  type: 'error'
                });
              }
         })
        },
        goback(index){
          this.$router.go(index);
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import '../assets/css/info.scss';
</style>
