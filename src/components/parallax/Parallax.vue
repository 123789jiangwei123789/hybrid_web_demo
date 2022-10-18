<template>
  <!-- 视差效果：让多层背景以不同的速度去进行移动
  1、至少需要拥有二层背景 （缓慢移动区，正常移动区）
  2、将背景设置为相对布局（为缓慢移动区设置 top 来缓冲掉 scroll 滚动）
  3、监听 Parallax组件的滑动，根据滑动来计算，缓慢移动区 top 的值。 -->
  <div class="parallax" @scroll="isScrollChange">
    <!-- 缓慢移动区 -->
    <div class="parallax-slow" :style="{top: slowTop}">
      <slot name="parallax-slow"></slot>
    </div>
    <!-- 正常移动区 -->
    <div class="parallax-content z-index-2">
      <slot name="parallax-content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'parallax',
  data () {
    return {
      // 速度差（正常移动区移动100px，缓慢移动区100 / 2）
      SPEED_DIFF: 2,
      // 页面滑动值
      parallaxScroll: 0
    }
  },
  computed: {
    /**
     * 返回 slow 缓慢移动区的距离顶部的距离
     */
    slowTop () {
      // 当前页面的滑动距离 / 速度差 = 缓慢移动区应该滑动的距离
      // 当前页面的滑动距离 - 缓慢移动区应该滑动的距离 = 缓慢移动区缓冲掉 scroll 的距离
      return this.parallaxScroll - (this.parallaxScroll / this.SPEED_DIFF) + 'px'
    }
  },
  methods: {
    /**
     * 监听滑动
     */
    isScrollChange ($event) {
      this.parallaxScroll = $event.target.scrollTop
      this.$emit('onScrollChange', this.parallaxScroll)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.parallax {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  &-slow {
    width: 100%;
    position: relative;
  }
  &-content {
    height: 100%;
    position: relative;
  }
}

</style>
