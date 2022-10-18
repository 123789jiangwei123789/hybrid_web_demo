/* eslint-disable prefer-const */
<template>
  <!-- 瀑布流布局：
  1.创建商品列表的基本html和css，让item 相对于goods的div进行排列
  2.生成不同高度的图片，撑起不同高度的item
  3.计算item的位置，来达到从上而下，从左到右依次排列的目的 -->
  <!-- 商品排序：
    1、排序之后的数据源，用来在 html 中进行展示（替换掉 dataSource）。
    2、定义排序规则。（可以直接使用 GoodsOptions 中数据源的id）。
    3、定义排序的方法，根据排序规则来修改对应的排序 -->
  <div
    class="goods"
    :class="[layoutClass, { 'goods-scroll': isScroll }]"
    :style="{ height: goodViewHeight }"
    ref="goods"
    @scroll="scrollChangeClick"
  >
    <div
      class="goods-item"
      :class="layoutItemClass"
      v-for="(item, index) in sortDataSource"
      :key="index"
      @click="onItemDetailClick(item)"
      :style="goodItemsStyle[index]"
      ref="goodsItem"
    >
      <img
        class="goods-item-img"
        :style="imgHeights[index]"
        :src="item.img"
        alt=""
        srcset=""
      />
      <div class="goods-item-desc">
        <p
          class="goods-item-desc-name"
          :class="{ 'goods-item-desc-name-hint': !item.isHave }"
        >
          <direct v-if="item.isDirect"></direct>
          <no-have v-if="!item.isHave"></no-have>
          {{ item.name }}
        </p>
        <div class="goods-item-data">
          <p class="goods-item-data-price">￥{{ item.price | priceValue }}</p>
          <p class="goods-item-data-volume">销量：{{ item.volume }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Direct from '@c/goods/Direct.vue'
import NoHave from '@c/goods/NoHave.vue'
export default {
  name: 'goods',
  components: {
    Direct,
    NoHave
  },
  props: {
    /**
     * 在父元素中指定的展示形式
     * 1: 垂直布局
     * 2: 网格布局
     * 3: 瀑布流布局
     */
    layoutType: {
      type: String,
      default: '1'
    },
    /**
     * 是否允许单独滑动
     */
    isScroll: {
      type: Boolean,
      default: true
    },
    /**
     * 排序规则
     * 根据GoodsOptions的排序
     * 1：默认
     * 1-2：价格由低到高
     * 1-3：销量由低到高
     * 2：有货优先
     * 3：直营优先
     */
    sort: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      dataSouce: [],
      MAX_HEIGHT_SIZE: 230,
      MIN_HEIGHT_SIZE: 178,
      imgHeights: [],
      // item的magin
      ITEM_MARGIN_SIZE: 8,
      // item的样式
      goodItemsStyle: [],
      // 排序数组
      sortDataSource: [],
      // goods可视区域的高度
      goodViewHeight: '100%',
      /** layoutClass
       * 垂直布局: goods-list -> goods-list-item
       * 网格布局: goods-grid-list -> goods-grid-list-item
       * 瀑布流布局: goods-waterfull -> goods-waterfull-item
       * */
      layoutClass: 'goods-list',
      layoutItemClass: 'goods-list-item',
      // 页面滚动距离
      scrollValue: 0
    }
  },
  activated () {
    this.$refs.goods.scrollTop = this.scrollValue
  },
  created () {
    this.initData()
  },
  methods: {
    scrollChangeClick ($event) {
      this.scrollValue = this.$event.target.scrollTop
    },
    initData () {
      this.$http.get('/goods').then(res => {
        this.dataSouce = res.list
        this.sortGetDataSource()
        // 设置布局
        this.initLayout()
      })
    },
    sortGetDataSource () {
      switch (this.sort) {
        // 默认
        case '1':
          // 深拷贝，使得原数组不被影响
          this.sortDataSource = this.dataSouce.slice(0)
          break
        // 价格由低到高
        case '1-2':
          this.getSortGoodsDataFromKey('price')
          break
        // 销量由低到高
        case '1-3':
          this.getSortGoodsDataFromKey('volume')
          break
        // 有货优先
        case '2':
          this.getSortGoodsDataFromKey('isHave')
          break
        // 直营优先
        case '3':
          this.getSortGoodsDataFromKey('isDirect')
          break
      }
    },
    getSortGoodsDataFromKey (key) {
      /**
       * sort 可以完成数组的数据排序
       * 当接受的值为负数的时候：goods1排在goods2的前面
       * 当接受的值为负数的时候：goods1排在goods2的后面
       * 当接受的值为0的时候：排列顺序不变
       */
      this.sortDataSource.sort((goods1, goods2) => {
        // 根据传入的key值获取对应的value
        const v1 = goods1[key]
        const v2 = goods2[key]
        // 对value进行对比
        // boolean 类型的值（表示有货优先和直营优先）
        if (typeof v1 === 'boolean') {
          if (v1) {
            return -1
          }
          if (v2) {
            return 1
          }
          return 0
        }
        // float类型的值（价格优先或者销量优先）
        if (parseFloat(v1) >= parseFloat(v2)) {
          return -1
        }
        return 1
      })
    },
    /**
     *设置布局，为不同的layoutType设定不同的展示形式
     *1.初始化影响到布局的数据
     *  1.goodViewHeight -> 垂直布局、网格布局（100%）,瀑布流（实际高度）
     *  2.goodItemsStyle
     *  3.imgHeights
     *2.为不同的layoutType设置不同的展示类
     */
    initLayout () {
      this.goodViewHeight = '100%'
      this.goodItemsStyle = []
      this.imgHeights = []
      switch (this.layoutType) {
        // 垂直布局
        case '1':
          this.layoutClass = 'goods-list'
          this.layoutItemClass = 'goods-list-item'
          break
        // 网格布局
        case '2':
          this.layoutClass = 'goods-grid-list'
          this.layoutItemClass = 'goods-grid-list-item'
          break
        // 瀑布流布局
        case '3':
          this.layoutClass = 'goods-waterfull'
          this.layoutItemClass = 'goods-waterfull-item'
          this.getImgHeight()
          // Dom实例挂载完成才初始化瀑布流布局
          this.$nextTick(() => {
            this.initWaterfall()
          })
          break
      }
    },
    initImgStyle () {
      // eslint-disable-next-line prefer-const
      let result = Math.floor(
        Math.random() * (this.MAX_HEIGHT_SIZE - this.MIN_HEIGHT_SIZE) +
          this.MIN_HEIGHT_SIZE
      )
      return result
    },
    getImgHeight () {
      this.dataSouce.forEach(item => {
        // eslint-disable-next-line prefer-const
        let imgHeight = this.initImgStyle() + 'px '
        this.imgHeights.push({
          height: imgHeight
        })
      })
    },
    /**
     * 瀑布流布局
     * 1.获取到所有的 item元素
     * 2.遍历item元素，得到每一个item的高度，加上一个margin的高度
     * 3.创建2个变量：leftHeightTotal,rightHeightTotal 分别表示左右2侧目前距离顶部的高度。
     * 通过对于左右2侧距离顶部的高度，来确定item的位置
     *   如果左侧小于右侧高度的话（leftHeightTotal <= rightHeightTotal）,那么item就left: 0,top: leftHeightTotal
     *   否则，item放置到右侧，此时item距离右侧为0，距离当前的top为rightHeightTotal
     * 4.保存计算出的item的所有样式，配置到item上
     * 5.item配置完成后，对比左右2侧的最大高度，最后最大的高度就为可视区域的goods组件的最大高度
     */
    initWaterfall () {
      // eslint-disable-next-line prefer-const
      let goodsItem = this.$refs.goodsItem
      if (!goodsItem) return
      // eslint-disable-next-line prefer-const
      let leftHeightTotal = 0
      // eslint-disable-next-line prefer-const
      let rightHeightTotal = 0
      goodsItem.forEach($el => {
        // item的样式
        let goodsItemStyle = {}
        // eslint-disable-next-line prefer-const
        let elHeight = $el.clientHeight + this.ITEM_MARGIN_SIZE
        if (leftHeightTotal <= rightHeightTotal) {
          goodsItemStyle = {
            left: '0px',
            top: leftHeightTotal + 'px'
          }
          leftHeightTotal += elHeight
        } else {
          goodsItemStyle = {
            right: '0px',
            top: rightHeightTotal + 'px'
          }
          rightHeightTotal += elHeight
        }
        this.goodItemsStyle.push(goodsItemStyle)
      })
      // 在不需要 goods 自滑动的时候，再去计算 goodsView 的高度
      if (!this.isScroll) {
        this.goodViewHeight =
          (leftHeightTotal > rightHeightTotal
            ? leftHeightTotal
            : rightHeightTotal) + 'px'
      }
    },
    // 点击商品跳转商品详情页面
    /**
     * 知识点注意：
     * query的参数在url直接体现
     * params的参数不会在url体现
     */
    onItemDetailClick (item) {
      if (!item.isHave) {
        alert('该商品暂时缺货！')
        return
      }
      this.$router.push({
        name: 'goodsDetail',
        query: {
          goodsId: item.id
        },
        params: {
          routerType: 'push'
        }
      })
    }
  },
  watch: {
    // 监听布局切换
    layoutType () {
      this.initLayout()
    },
    // 监听sort变化
    sort () {
      this.sortGetDataSource()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.goods {
  background-color: $bgColor;
  &-scroll {
    overflow: hidden;
    overflow-y: auto;
  }
  &-item {
    background-color: white;
    padding: $marginSize;
    box-sizing: border-box;
    &-desc {
      width: 100%;
      &-name {
        font-size: $infoSize;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        line-height: px2rem(18);
        &-hint {
          color: $textHintColor;
        }
      }
    }
    &-data {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: $marginSize;
      &-price {
        font-size: $titleSize;
        color: $wordColor;
        font-weight: 500;
      }
      &-volume {
        font-size: $infoSize;
        color: $textHintColor;
      }
    }
  }
}
// 垂直布局
.goods-list {
  &-item {
    display: flex;
    border-bottom: 1px solid $lineColor;
    .goods-item-img {
      width: px2rem(120);
      height: px2rem(120);
    }
    .goods-item-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: $marginSize;
    }
  }
}
// 网格布局
.goods-grid-list {
  margin: $marginSize;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &-item {
    width: 49%;
    border-radius: $radiusSize;
    margin-bottom: $marginSize;
    .goods-item-img {
      width: 100%;
    }
  }
}
// 瀑布流布局
.goods-waterfull {
  position: relative;
  margin: $marginSize;
  &-item {
    position: absolute;
    width: 49%;
    border-radius: $radiusSize;
    .goods-item-img {
      width: 100%;
    }
  }
}
</style>
