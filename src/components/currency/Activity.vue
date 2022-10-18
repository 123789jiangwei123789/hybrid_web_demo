<template>
  <div class="activity">
    <!-- 通过插槽来展示活动内容 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'activity'
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.activity {
  max-height: px2rem(160);
  position: relative;
  z-index: 2;
}
</style>
