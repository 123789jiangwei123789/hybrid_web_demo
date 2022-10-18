<template>
  <div class="login-page">
    <navigation-bar
      :pageHeaderTitle="'申请处'"
      :isShowBack="true"
    ></navigation-bar>
    <div class="login-page-content">
      <div class="input-container">
        <input v-model="username" type="text" placeholder="昵称" />
      </div>
      <div class="input-container">
        <input v-model="password" type="password" placeholder="密码" />
      </div>
      <div class="login-page-content-login page-commit" @click="onLoginClick">
        申请
      </div>
      <a class="login-page-content-register" @click="onToRegisterClick"
        >申请新用户</a
      >
    </div>
  </div>
</template>

<script>
import NavigationBar from "@c/currency/NavigationBar.vue";
import md5 from "@js/md5.min.js";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      md5Password: "",
    };
  },
  components: {
    NavigationBar,
  },
  methods: {
    // 登录
    onLoginClick() {
      if (!this.username.length || !this.password.length) {
        alert("用户名或密码未输入");
        return false;
      }
      // 与原生交互，保存用户输入的用户名和密码
      // 对用户输入的密码进行MD5加密
      this.md5Password = md5(this.password);
      // 判断当前的项目是运行在 Android 设备还是 IOS 设备中
      if (window.androidJSBridge) {
        // window 下存在 android 注入的对象（androidJSBridge）
        this.onLoginToAndroid();
      } else if (window.webkit) {
        // window 下存在 webkit，表示在ios设备运行
        this.onLoginToIOS();
      }
    },
    /**
     * 调用 android 登录接口
     */
    onLoginToAndroid() {
      // JSON字符串,Android只能接收基本数据类型
      const user = JSON.stringify({
        username: this.username,
        password: this.md5Password,
      });
      const result = window.androidJSBridge.login(user);
      this.onLoginCallback(result);
    },
    /**
     * 调用 IOS 登录接口
     */
    onLoginToIOS() {
      // IOS能接收对象类型的参数
      /**
       * IOS不能直接返回返回值，只能回调对应的方法，同时原生调用 JS 的方法只能使调用 绑定到 window 对象中的方法，
       * 所以需要把IOS回调的方法，绑定到window的对象下
       */
      const user = {
        username: this.username,
        password: this.md5Password,
      };
      window.loginCallback = this.onLoginCallback;
      window.webkit.messageHandlers.login.postMessage(user);
    },
    /**
     * 登录方法回调
     */
    onLoginCallback(result) {
      switch (result) {
        case "-1":
          alert("系统内部出现错误！");
          break;
        case "0":
          alert("登录成功！");
          this.$router.push("/");
          break;
        case "1":
          alert("登录用户不存在！");
          break;
        case "2":
          alert("密码错误！");
      }
    },
    // 注册
    onToRegisterClick() {
      this.$router.push({
        name: "register",
        params: {
          routerType: "push",
        },
      });
    },
  },
};
</script>

<style lang="scss">
@import "@css/style.scss";
.login-page {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: white;
  overflow: hidden;
  &-content {
    width: 100%;
    height: 100%;
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
