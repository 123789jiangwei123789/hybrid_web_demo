<template>
  <div class="my">
    <navigation-bar :pageHeaderTitle="'杜沂琳小窝'" :isShowBack="false"></navigation-bar>
    <div class="my-content">
      <div class="my-content-header" @click="onLoginClick">
        <img class="my-content-header-avatar" src="@img/13.jpg" />
        <p class="my-content-header-login">{{$store.state.username ? $store.state.username : '点我/申请'}}</p>
      </div>

      <div class="my-content-area">
        <div class="my-content-area-item" v-for="(item,index) in toolsDatas" :key="index">
          <p class="my-content-area-item-name">{{item}}</p>
          <img class="my-content-area-item-img" src="@img/right-arrow.svg"/>
        </div>
      </div>
      <div class="marquee">
        <marquee class="marquee-color">
          琳琳，我想对你说，在我这里，你的快乐比对错重要，如果可以的话，我想做那个为你打伞的人，一直保护着你，宠着你
        </marquee>
      </div>
      <div class="my-content-footer page-commit" @click="onLoginOut" v-if="$store.state.username">
        残忍离开
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
export default {
  name: 'my',
  components: {
    NavigationBar
  },
  data () {
    return {
      toolsDatas: ['小可爱', '大宝贝', '更喜欢', '哪个']
    }
  },
  methods: {
    onLoginClick () {
      this.$router.push({
        name: 'login',
        params: {
          routerType: 'push'
        }
      })
    },
    /**
     * 退出登录
     */
    onLoginOut () {
      // 判断当前的项目是运行在 Android 设备还是 IOS 设备中
      if (window.androidJSBridge) {
        // window 下存在 android 注入的对象（androidJSBridge）
        this.onLoginOutToAndroid()
      } else if (window.webkit) {
        // window 下存在 webkit，表示在ios设备运行
        this.onLoginOutToIOS()
      }
    },
    onLoginOutToAndroid () {
      const result = window.androidJSBridge.logout()
      this.onLoginOutCallback(result)
    },
    onLoginOutToIOS () {
      window.logoutCallback = this.onLoginOutCallback
      window.webkit.messageHandlers.logout.postMessage()
    },
    onLoginOutCallback (result) {
      if (result) {
        alert('退出成功！')
      } else {
        alert('退出失败，请重新操作！')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.my {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
  &-content {
    height: 100%;
    width: 100%;
    &-header {
      margin-top: $marginSize;
      background-color: white;
      height: px2rem(68);
      display: flex;
      align-items: center;
      border-bottom: 1px solid $lineColor;
      padding: $marginSize;
      &-avatar {
        width: px2rem(52);
        height: px2rem(52);
        border-radius: 100%;
      }
      &-login {
        margin-left: $marginSize;
        font-size: $titleSize;
      }
    }
    &-area {
      &-item {
        display: flex;
        height: px2rem(46);
        box-sizing: border-box;
        align-items: center;
        padding: $marginSize;
        background-color: white;
        border-bottom: 1px solid $lineColor;
        &-name {
          font-size: $infoSize;
          flex-grow: 1;
        }
        &-img {
          width: px2rem(16);
        }
      }
    }
    .marquee {
      &-color {
        margin-top: calc((100% - 81px) / 2);
      }
    }
    &-footer {
      margin-top: 20%;
    }
  }
}
</style>
