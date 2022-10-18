<template>
 <div class="register-page">
    <navgation-bar :pageHeaderTitle="'小窝注册处'" :isShowBack="true"> </navgation-bar>
    <div class="register-page-content">
      <div class="input-container">
        <input v-model="username" type="text" placeholder="你可爱的昵称" />
      </div>

      <div class="input-container">
        <input v-model="password" type="password" placeholder="你复杂的密码" />
      </div>

      <div class="input-container">
        <input v-model="comfirmPassword" type="password" placeholder="确认你的密码" />
      </div>

      <div class="register-page-content-login page-commit" @click="onRegisterClick">
        快点我吧
      </div>
    </div>
  </div>
</template>

<script>
import NavgationBar from '@c/currency/NavigationBar'
import md5 from '@js/md5.min.js'
export default {
  components: {
    NavgationBar
  },
  data () {
    return {
      username: '',
      password: '',
      comfirmPassword: '',
      md5Password: ''
    }
  },
  methods: {
    /**
     * 注册按钮点击事件
     */
    onRegisterClick () {
      if (!this.username.length) {
        alert('请完善用户名')
        return false
      }
      if (!this.password.length || this.password !== this.comfirmPassword) {
        alert('请完善密码')
        return false
      }
      // 与原生交互，保存用户输入的用户名和密码
      // 对用户输入的密码进行MD5加密
      this.md5Password = md5(this.password)
      // 判断当前的项目是运行在 Android 设备还是 IOS 设备中
      if (window.androidJSBridge) {
        // window 下存在 android 注入的对象（androidJSBridge）
        this.onRegisterToAndroid()
      } else if (window.webkit) {
        // window 下存在 webkit，表示在ios设备运行
        this.onRegisterToIOS()
      }
    },
    /**
     * 注册方法回调
     */
    onRegisterCallback (result) {
      if (result) {
        alert('注册成功')
        this.$router.go(-1)
      } else {
        alert('注册失败，请重试')
      }
    },
    /**
     * 调用 android 注册接口
     */
    onRegisterToAndroid () {
      // JSON字符串,Android只能接收基本数据类型
      const user = JSON.stringify({
        'username': this.username,
        'password': this.md5Password
      })
      const result = window.androidJSBridge.register(user)
      this.onRegisterCallback(result)
    },
    /**
     * 调用 IOS 注册接口
     */
    onRegisterToIOS () {
      // IOS能接收对象类型的参数
      /**
       * IOS不能直接返回返回值，只能回调对应的方法，同时原生调用 JS 的方法只能使调用 绑定到 window 对象中的方法，
       * 所以需要把IOS回调的方法，绑定到window的对象下
      */
      const user = {
        'username': this.username,
        'password': this.md5Password
      }
      window.registerCallback = this.onRegisterCallback
      window.webkit.messageHandlers.register.postMessage(user)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.register-page {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: white;
  overflow: hidden;
  &-content {
    width: 100%;
    height: 100%;

    &-username {
    }

    &-password {
    }

    &-login {
      margin-top: 40%;
    }

    &-register {
      font-size: $infoSize;
      color: $textHintColor;
      margin-top: $marginSize;
      display: inline-block;
      padding: $marginSize;
      float: right;
    }
  }
}
</style>
