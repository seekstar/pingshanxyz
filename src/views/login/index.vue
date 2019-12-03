<template>
<div class="container"> <el-dialog
      title="Or connect with"
      :visible.sync="showDialog"
    >
     <el-form  :model="passwordForm"  >
        <el-form-item label="手机">
    <el-input v-model="passwordForm.phone" placeholder=""></el-input>
  </el-form-item>
  <el-form-item label="用户名">
    <el-input v-model="passwordForm.username" placeholder=""></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="passwordForm.password" placeholder="" show-password></el-input>
  </el-form-item>
   <el-form-item label="确认密码">
    <el-input v-model="passwordForm.repassword" placeholder=""  show-password></el-input>
  </el-form-item>
  <el-form-item label="验证码">
    <el-input v-model="passwordForm.code" placeholder=""></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="updatePassword">提交</el-button>
    <el-button  @click="getCode" :disabled="codebtn!='获取验证码'">{{codebtn}}</el-button>
  </el-form-item>
  
</el-form>
    </el-dialog>
    
    <div class="login-container">
    <a class="logo" href="http://www.szpsq.gov.cn/" target="_blank">
      <img class="logo-img" src="./components/坪山区人民政府.png" alt="坪山区人民政府">
    </a>
    
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
       <el-button class="thirdparty-button" type="text" @click="showDialog=true">
            找回密码
          </el-button>
      <div class="title-container">
        <h3 class="title">
          深圳市坪山区民生诉求分析系统
        </h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span
            class="show-pwd"
            @click="showPwd"
          >
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin(loginForm)"
      >
        登录
      </el-button>



    </el-form>

   
  </div>
    </div>
  
</template>

<script>

import { login,getCode,resetPassword } from "@/api/user"
import './components/TCaptcha.js'
import { Message } from 'element-ui'

export default {
  name: 'Login',
  data() {

    const validatePassword = (rule, value, callback) => {
      callback()
    }
    return {
      interval:null,
      codebtn:'获取验证码',
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      passwordForm:{
        phone:'',
        username: '',
        password: '',
        repassword:'',
        code:''
        },
      loginRules: {
        username: [{ required: true, trigger: 'blur'}],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    getCode(){
      if(!(/^1[3456789]\d{9}$/.test(this.passwordForm.phone))){
        Message({
          message: "电话号码格式填写错误！",
          type: "error",
          duration: 5 * 1000
        });
        return;
      }
      getCode(this.passwordForm.phone).then(resp=>{
        this.codebtn=60
        this.interval=setInterval(()=>{
          this.codebtn-=1
          if(this.codebtn==0){
            this.codebtn='获取验证码'
clearInterval(this.interval)
          }
          

        },1000)
        Message({
              message: "发送成功",
              type: "success",
              duration: 5 * 1000
            });
      }
      )
    },
    updatePassword(){
      if(this.passwordForm.password!=this.passwordForm.repassword){
        Message({
          message: "密码不一致！",
          type: "error",
          duration: 5 * 1000
        });
        return;
      }
      if(!(/^1[3456789]\d{9}$/.test(this.passwordForm.phone))){
        Message({
          message: "电话号码格式填写错误！",
          type: "error",
          duration: 5 * 1000
        });
        return;
      }
      resetPassword(this.passwordForm).then(
        resp=>{
        Message({
              message: "修改成功",
              type: "success",
              duration: 5 * 1000
            });
      }
      )
    },

    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin(loginForm) {
      // var captcha = new TencentCaptcha('2050079011', resp => {
      //   if(resp.ret == 0){
      //     login(loginForm.username, loginForm.password, resp.ticket, resp.randstr).then(resp => {
      //       console.log(resp)
      //     }).catch(resp => {

      //     })
      //   }
      // });
      // captcha.show();
      /*
      login(loginForm.username, loginForm.password).then(resp => {
        console.log(resp)
      })
      */
      // var captcha = new TencentCaptcha('2050079011', res => {
        
      // });
      // captcha.show();


      this.$refs.loginForm.validate(valid => {
        if (valid) { //用户名密码格式合法
          var captcha = new TencentCaptcha('2050079011', resp => {
            if(resp.ret == 0){
              this.loading = true
              this.$store.dispatch('user/login', {'username': this.loginForm.username, 'password': this.loginForm.password, 'ticket': resp.ticket, 'randstr': resp.randstr})
                .then(() => {
                  this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                  this.loading = false
                })
                .catch(() => {
                  this.loading = false
                })
            }
          });
          captcha.show();
        } else { //用户名密码格式非法
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

//$bg:#283443;
$bg: #fff;
$blue: rgb(13, 141, 226);
$cursor: #000;
$word_col: $blue;
$input_col: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      -webkit-appearance: none;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $input_col;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border-top: 1px solid #e3e4e5;
    border-left: 1px solid #e3e4e5;
    border-right: 1px solid #e3e4e5;
    border-bottom: 1px solid #e3e4e5;

    //background: rgba(0, 0, 0, 0.1);
    background: $bg;
    border-radius: 5px; //???
    color: $blue; //???
  }
}
</style>

<style lang="scss" scoped>
//$bg:#2d3a4b;
$bg: #fff;

$dark_gray:#889aa4;
//$light_gray:#eee;

$dark_blue: rgb(13, 76, 119);
$word_col: $dark_blue;

.login-container {
  min-height: 100%;
  width: 100%;
  //background-color: $bg;
  background: url("./components/backgroundImage1_gauss.jpg") no-repeat center;
  background-size: cover; //覆盖整个页面
  position: absolute;
  overflow: hidden;
  
  // position:fixed;
  // top: 0;
  // left: 0;
  // //width:100%;
  // //height:100%;
  // //min-width: 1000px;
  // z-index:-10;
  // zoom: 1;
  // //background-color: #fff;
  // background-repeat: no-repeat;
  // background-size: cover;
  // -webkit-background-size: cover;
  // -o-background-size: cover;
  // background-position: center 0;

  .login-form {
    //margin-left: 1400px;
    margin-left: 70%;
    position: absolute;
    top: 20%;
    //width: 400px;
    width: 25%;
    max-width: 100%;
    padding: 50px 35px 10px;
    //margin: 10 left;
    overflow: hidden;
    background: #fff;
  }

  .tips {
    font-size: 14px;
    //color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    background: $bg;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $word_col;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $word_col;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    left: 40px;
    bottom: 0px;
    
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}

.logo {
  margin-left: 3%;
  position: absolute;
  top: 3%
}

</style>
