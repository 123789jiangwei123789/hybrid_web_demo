<template>
<div class="goods-list-page">
  <navigation-bar :pageHeaderTitle="'商品列表'">
    <template v-slot:nav-right>
      <img :src="layoutSelectList.icon" alt="" srcset="" @click="onChangeLayoutType()"/>
    </template>
  </navigation-bar>
  <div class="goods-list-page-content" :class="{ 'iphonex-bottom': isIphoneX }">
    <goods-options @changeSortType="changeSortType"></goods-options>
    <goods :sort='sortStype' :layoutType="layoutSelectList.type" :isScroll="true"></goods>
  </div>
</div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
import GoodsOptions from '@c/goods/GoodsOptions.vue'
import Goods from '@c/goods/Goods.vue'
export default {
  name: 'goodsList',
  components: {
    NavigationBar,
    GoodsOptions,
    Goods
  },
  data () {
    return {
      isIphoneX: window.isIphoneX,
      layoutSource: [
        // 垂直布局
        {
          icon: require('@img/list-type.svg'),
          type: '1'
        },
        // 网格布局
        {
          icon: require('@img/grid-type.svg'),
          type: '2'
        },
        // 瀑布流布局
        {
          icon: require('@img/waterfall-type.svg'),
          type: '3'
        }
      ],
      // 当前选中的布局图片
      layoutSelectList: {},
      // 排序规则
      sortStype: '1'
    }
  },
  created () {
    this.layoutSelectList = this.layoutSource[0]
  },
  methods: {
    onChangeLayoutType () {
      if (this.layoutSelectList.type === '1') {
        this.layoutSelectList = this.layoutSource[1]
      } else if (this.layoutSelectList.type === '2') {
        this.layoutSelectList = this.layoutSource[2]
      } else {
        this.layoutSelectList = this.layoutSource[0]
      }
    },
    changeSortType (sortStype) {
      this.sortStype = sortStype
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.goods-list-page {
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: $bgColor;
  display: flex;
  flex-direction: column;
  position: absolute;
  &-content {
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
}
</style>
