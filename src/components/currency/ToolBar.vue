<template>
  <div class="toolbar" :class="{ 'iphonex-bottom': isIphoneX }">
    <!-- tab按钮，需要有一个数据源，通过数据源驱动视图 -->
    <div
      class="toolbar-item"
      @click="onChangeFragment(item, index)"
      v-for="(item, index) in toolBarData"
      :key="index"
    >
      <img
        class="toolbar-item-img"
        :src="[selectItemIndex === index ? item.hIcon : item.nIcon]"
        alt=""
        srcset=""
      />
      <!-- inedx和选中的index相等，添加class高亮显示 -->
      <p
        class="toolbar-item-name"
        :class="{ 'toolbar-item-name-h': selectItemIndex === index }"
      >
        {{ item.name }}
      </p>
    </div>
  </div>
</template>

<script>
/**
 * ToolBar 的功能
 * 1、永远位于页面的最底部（约束）
 * 2、点击toolbar按钮的时候，页面发生对应的切换（约束）
 * 3、按钮分为默认和选中 2个状态（能力）
 */
export default {
  name: 'toolbar',
  data () {
    return {
      // tab按钮的数据源，MVVM数据驱动视图
      toolBarData: [
        {
          // 默认icon
          nIcon: require('@img/home-n.svg'),
          // 高亮icon
          hIcon: require('@img/home-h.svg'),
          name: '琳琳',
          // 组件名称
          componentName: 'home'
        },
        {
          // 默认icon
          nIcon: require('@img/shopping-n.svg'),
          // 高亮icon
          hIcon: require('@img/shopping-h.svg'),
          name: '请一直',
          // 组件名称
          componentName: 'shopping'
        },
        {
          // 默认icon
          nIcon: require('@img/my-n.svg'),
          // 高亮icon
          hIcon: require('@img/my-h.svg'),
          name: '开心',
          // 组件名称
          componentName: 'my'
        }
      ],
      selectItemIndex: 0,
      isIphoneX: window.isIphoneX
    }
  },
  methods: {
    onChangeFragment (item, index) {
      this.selectItemIndex = index
      this.$emit('onChangeFragment', item.componentName)
    },
    // 通过下标切换toolBar
    pushFragment (index) {
      this.onChangeFragment(this.toolBarData[index], index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.toolbar {
  width: 100%;
  height: px2rem(46);
  display: flex;
  background-color: white;
  justify-content: space-around;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);
  border-top: 1px solid #e5e5e5;
  &-item {
    text-align: center;
    padding: px2rem(4) px2rem(12);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &-img {
      width: px2rem(22);
      height: px2rem(22);
    }
    &-name {
      font-size: $infoSize;
      margin-top: px2rem(4);
      &-h {
        color: $toolBarColor;
      }
    }
  }
}
</style>
