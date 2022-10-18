<template>
  <!-- 在vue这种单页面的应用程序中，它只存在一个页面--App.vue，其他的都是组件 -->
  <div class="main">
    <keep-alive>
      <!-- 动态组件 -->
      <component :is="currentComponent"></component>
    </keep-alive>
    <tool-bar ref="toolBar" @onChangeFragment="onChangeFragment"></tool-bar>
  </div>
</template>

<script>
import ToolBar from '@c/currency/ToolBar.vue'
export default {
  name: 'Main',
  data () {
    return {
      currentComponent: 'home'
    }
  },
  components: {
    'tool-bar': ToolBar,
    // 异步组件引入方式，异步组件：只有在需要去展示这个组件的时候，才会把组件去进行相应的渲染
    // eslint-disable-next-line quote-props
    'my': () => import('@c/My.vue'),
    // eslint-disable-next-line quote-props
    'home': () => import('@c/Home.vue'),
    // eslint-disable-next-line quote-props
    'shopping': () => import('@c/Shopping.vue')
  },
  activated () {
    // keep - alive被激活时调用
    this.pushFragment()
  },
  methods: {
    // 组件切换
    onChangeFragment (componentName) {
      this.currentComponent = componentName
    },
    /**
     * 指定加载的页面组件
     */
    pushFragment () {
      // 获取到组件加载的下标
      const componentIndex = this.$route.params.componentIndex
      if (componentIndex === undefined) return false
      if (componentIndex) {
        this.$refs.toolBar.pushFragment(componentIndex)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
}
</style>
