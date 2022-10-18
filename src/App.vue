<template>
  <div id="app">
    <!-- 过渡动画 -->
    <!-- 页面过渡效果实现逻辑
      1.创建动画的 css
      2.判断当前是需要执行跳转动画（进入新页面）还是后退动画（后退页面）
        1.监听路由对象 $route
        2.让页面在跳转的时候，携带包含跳转标记的params，通过对params的判断，是否为跳转动画(有标记为跳转，没有标记为后退)
      3.通过 transition 的方式来为 router-view 指定对应的动画效果。 -->
      <!-- 适配 沉浸式App 问题：
      1、沉浸式展示中，NavBar 与 statusBar 重叠
      IOS 设备根据屏幕的形状可以分为两种类型：
      1、iphoneX 以下的标准屏幕
      2、iphoneX 以上的刘海屏
      IOS问题：
        1、IOS网页滚动卡顿
        2、IOS点击按钮出现高亮显示
        3、在iphoneX 中展示，navBar 紧贴刘海位置展示
        4、toolBar 占据底部操作区的位置

      IOS设备问题解决方案
        1，2需要指定 滑动的元素使用 IOS 原生的滑动方式
        3，4解决方案
          1、判断当前设备是否为 iphoneX
          2、让项目的内容区域避开 iphoneX 中的危险区域，让内容区在安全区域展示
       -->
    <transition :name="transitionName">
      <keep-alive :include="virtualTaskStack">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      transitionName: '',
      // 虚拟任务栈
      virtualTaskStack: ['Main']
    }
  },
  watch: {
    // 监听路由对象，决定使用那种过渡效果
    $route (to, from) {
      const routerType = to.query.routerType
        ? to.query.routerType
        : to.params.routerType
      if (routerType === 'push') {
        // 当进入新页面的时候，保存新页面名称到虚拟任务栈
        this.virtualTaskStack.push(to.name)
        this.transitionName = 'fold-in'
      } else {
        this.virtualTaskStack.pop()
        // 执行后退操作的时候，把最后一个页面从任务栈种弹出
        this.transitionName = 'fold-out'
      }
      if (to.params.clearTask) {
        this.virtualTaskStack = ['Main']
      }
      console.log(this.virtualTaskStack, 'virtualTaskStack')
    }
  },
  created () {
    this.$store.commit('setisIphoneX', window.isIphoneX)
    window.nativeFunctionUserLogin = this.nativeFunctionUserLogin
  },
  methods: {
    /**
     * 原生端自动登录
     */
    nativeFunctionUserLogin (username) {
      this.$store.commit('setUsername', username)
    }
  }
}
</script>
<style lang="scss">
@import '@css/style.scss';
#app {
  width: 100%;
  height: 100%;
  .fold-in-enter-active {
    animation-name: 'left-in';
    animation-duration: 0.4s;
  }
  .fold-in-leave-active {
    animation-name: 'left-out';
    animation-duration: 0.4s;
  }
  // push页面：新页面进入
  @keyframes left-in {
    0% {
      transform: translate(100%, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }
  // push页面：原页面退出
  @keyframes left-out {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-100%, 0);
    }
  }
  .fold-out-enter-active {
    animation-name: 'right-in';
    animation-duration: 0.4s;
  }
  .fold-out-leave-active {
    animation-name: 'right-out';
    animation-duration: 0.4s;
  }
  // 后退：新页面退出
  @keyframes right-out {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(100%, 0);
    }
  }
  // 后退：原页面进入
  @keyframes right-in {
    0% {
      transform: translate(-100%, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }
}
</style>
