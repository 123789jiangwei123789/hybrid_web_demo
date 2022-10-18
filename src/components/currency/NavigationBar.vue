<template>
  <div class="navigation-bar z-index-max" :style="navBarStyle" :class="[{ 'iphonex-top': isIphoneX },{'bottom-line' : pageHeaderTitle}]">
     <div class="left">
       <img v-if="isShowBack" @click="$router.go(-1)" src="@img/back.svg" alt="" srcset="" />
       <!-- 具名插槽 -->
       <slot name="nav-left"></slot>
     </div>
     <div class="center">
       <span class="page-title" v-if="pageHeaderTitle">{{pageHeaderTitle}}</span>
       <slot name="nav-center"></slot>
     </div>
     <div class="right">
       <slot name="nav-right"></slot>
     </div>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar',
  props: {
    pageHeaderTitle: {
      type: String,
      default: ''
    },
    isShowBack: {
      type: Boolean,
      default: true
    },
    navBarStyle: {
      type: Object,
      default: () => {
        return {
          backgroundColor: 'rgb(252,218,252)'
        }
      }
    }
  },
  data () {
    return {
      isIphoneX: window.isIphoneX
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.navigation-bar {
  width:100%;
  height: $navBarHeight;
  line-height: $navBarHeight;
  // 适配手机 stateBar
  padding-top: $stateBarHeight;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  .left,.right {
    height: 100%;
    display: flex;
    padding: 0 px2rem(8);
    width: px2rem(26);
    img {
      align-self: center;
      width: 100%;
    }
  }
  .center {
    display: flex;
    height: 100%;
    flex-grow: 1;
    .page-title {
      align-self: center;
      margin: 0 auto;
      font-size: $titleSize;
    }
  }
}
// .bottom-line {
//   border-bottom: 1px solid $lineColor;
// }
</style>
