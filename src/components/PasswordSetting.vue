<template>
  <div>
    <div class="info">
      <div class="title">
        <span>修改密码</span>
      </div>
      <hr/>
      <div class="personal">
        <el-form :model="passwordForm" ref="passwordForm" label-width="100px" class="demo-ruleForm" :rules="rules">
          <el-form-item prop="id" label="id" hidden>
            <el-input v-model="passwordForm.id" ></el-input>
          </el-form-item>
          <el-form-item prop="oldPassword" label="旧密码">
            <el-input type="password" v-model="passwordForm.oldPassword" placeholder="请输入旧密码"></el-input>
          </el-form-item>
          <el-form-item prop="newPassword" label="新密码">
            <el-input type="password" v-model="passwordForm.newPassword" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass" label="确认新密码">
            <el-input type="password" v-model="passwordForm.checkPass" placeholder="请再输入一次新密码"></el-input>
          </el-form-item>
        </el-form>
        <div class="btn">
          <div @click="saveMsg('passwordForm')">保存</div>
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
    name: "PasswordSetting",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.passwordForm.checkPass !== '') {
            this.$refs.passwordForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.passwordForm.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        passwordForm: {
          id:'',
          oldPassword:'',
          newPassword:'',
          checkPass:''
        },
        cities: [],            //所有的地区--省
        rules: {
          password: [
            {required: true, validator: validatePass, trigger: 'blur'},
            {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
          ],
          checkPass: [
            {required: true, validator: validatePass2, trigger: 'blur'}
          ],
        }
      }
    },
    computed:{
      ...mapGetters([
        'userId'
      ])
    },
    methods:{
      saveMsg(passwordForm){
        let _this = this;
        this.$refs[passwordForm].validate((valid) => {
          if (valid) {
            let param = new URLSearchParams();
            param.append("id", _this.userId);
            param.append("oldPassword", _this.passwordForm.oldPassword);
            param.append("newPassword", _this.passwordForm.newPassword);
            this.$axios.post("http://localhost:8888/user/setPassword", param).then(function (data) {
              console.log(data);
              if (data.data.status == 200) {
                _this.$notify({
                  title: data.data.msg,
                  type: 'success'
                });
                _this.$store.commit("setUserId",'');
                _this.$store.commit("setUsername",'');
                _this.$store.commit("setAvator",'');
                console.log(_this.userId);
                _this.$store.commit("setIsLogin",false);
                _this.$store.commit("setActive",'');
                _this.$router.push("/login")
              } else {
                _this.$notify({
                  title: data.data.msg,
                  type: 'error'
                });
              }
            })
          }else{
            console.log('error submit!!');
            return false;
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
