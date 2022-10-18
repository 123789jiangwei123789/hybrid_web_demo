<template>
  <div class="search" :style="{backgroundColor:bgColor}">
    <img class="search-icon" :src="icon" alt="" srcset="" />
    <span class="search-title" :style="{color:hintColor}">请输入我要开心下去继续浏览</span>
  </div>
</template>

<script>
export default {
  name: 'search',
  props: {
    // 背景颜色
    bgColor: {
      default: '#ffffff',
      type: String
    },
    // 输入框字体颜色
    hintColor: {
      default: '#999999',
      type: String
    },
    // icon图标
    icon: {
      default: require('@img/search.svg'),
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.search {
  background-color: white;
  width: 100%;
  margin: px2rem(6);
  border-radius: px2rem(22);
  display: flex;
  align-items: center;
  .search-icon {
    margin-left: $marginSize;
    width: px2rem(16);
  }
  .search-title {
    margin-left: $marginSize;
    font-size: $minInfoSize;
    color: $textHintColor;
  }
}
</style>
