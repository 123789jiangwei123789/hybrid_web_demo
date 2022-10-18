<template>
  <div class="goods-detail">
    <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
      <template v-slot:nav-left>
        <div class="goods-detail-nav-left">
          <!-- 默认状态下黑色后退按钮 -->
          <img src="@img/back-2.svg" @click="onGoBack" :style="{opacity: leftImgOpacity}" />
          <!-- 完全展示之后的白色后退按钮 -->
          <img src="@img/back-white.svg" @click="onGoBack" :style="{opacity: navBarSlotOpacity}"/>
        </div>
      </template>
      <template v-slot:nav-center>
        <p class="goods-detail-nav-title" :style="{opacity: navBarSlotOpacity}">商品详情</p>
      </template>
    </navigation-bar>
    <div class="goods-detail-content">
      <parallax @onScrollChange="onScrollChange">
        <template v-slot:parallax-slow>
          <my-swiper
          :swiperImgs="goodsData.swiperImgs"
          :height="SWIPER_IMAGE_HEIGHT + 'px'"
          :paginationType="'2'"
        ></my-swiper>
        </template>
        <template v-slot:parallax-content>
          <!-- 内容 -->
          <div class="goods-detail-content-desc">
            <div class="goods-detail-content-desc-item">
              <p class="goods-detail-content-desc-item-price">￥{{ goodsData.price | priceValue }}</p>
              <p class="goods-detail-content-desc-item-name">
                <direct v-if="goodsData.isDirect"></direct>
                {{ goodsData.name }}</p>
            </div>
            <div class="goods-detail-content-desc-item">
              <p class="goods-detail-content-desc-item-select">已选<span class="single-row-text">{{goodsData.name}}</span></p>
              <div class="goods-detail-content-desc-item-support">
                <ul class="goods-detail-content-desc-item-support-list">
                  <li class="goods-detail-content-desc-item-support-list-item" v-for="(item,index) in supportDatas" :key="index">
                    <img src="@img/support.svg" alt="" srcset="" />
                    <span>{{item}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="goods-detail-content-desc-detail">
              <img v-for="(item, index) in goodsData.detailImgs" :key="index" :src="item" alt="" srcset="">
            </div>
          </div>
        </template>
      </parallax>
    </div>
    <div class="goods-detail-buy" :class="{ 'iphonex-bottom': isIphoneX }">
      <div class="goods-detail-buy-add" @click="addGoodsBar">加入老公暂存处</div>
      <div class="goods-detail-buy-now" @click="onBuyClick">狠点下单</div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
import MySwiper from '@c/swiper/MySwiper.vue'
import Direct from '@c/goods/Direct.vue'
import Parallax from '@c/parallax/Parallax.vue'
export default {
  name: 'goodsDetail',
  components: {
    NavigationBar,
    MySwiper,
    Direct,
    Parallax
  },
  data () {
    return {
      isIphoneX: window.isIphoneX,
      // 轮播高度
      SWIPER_IMAGE_HEIGHT: 364,
      goodsData: {},
      // 滚动距离
      scrollValue: -1,
      // 锚点值
      ANCHOR_SCROLL_TOP: 310,
      // 附加服务
      supportDatas: ['可配送海外', '京东发货&售后', '京准达', '211限时达', '可自提', '不可使用优惠卷']
    }
  },
  created () {
    this.$http.get('/goodsDetail', {
      params: {
        goodsId: this.$route.query.goodsId
      }
    }).then(res => {
      this.goodsData = res.goodsData
      console.log(this.goodsData)
    })
  },
  computed: {
    /**
    *默认状态下左侧后退按钮的透明度
     */
    leftImgOpacity () {
      /**
      *与Home.vue的滚动原理一样
      *随着滚动距离的变大，按钮逐渐隐藏 1-opacity
      */
      return 1 - this.scrollValue / this.ANCHOR_SCROLL_TOP
    },
    /**
    *navBar的样式
     */
    navBarStyle () {
      return {
        backgroundColor: 'rgba(252,218,252,' + this.navBarSlotOpacity + ')',
        position: 'fixed',
        top: 0
      }
    },
    /**
    *navBar的插槽
     */
    navBarSlotOpacity () {
      // 随着页面滚动，插槽逐渐显示
      return 1 - this.leftImgOpacity
    }
  },
  methods: {
    onGoBack () {
      this.$router.go(-1)
    },
    onScrollChange (scrollValue) {
      this.scrollValue = scrollValue
    },
    // 立即购买
    onBuyClick () {
      this.$router.push({
        name: 'buy',
        query: {
          goodsId: this.$route.query.goodsId
        },
        params: {
          routerType: 'push'
        }
      })
    },
    addGoodsBar () {
      // 保存商品信息
      this.$store.commit('addShoppingData', this.goodsData)
      alert('添加成功')
      this.$router.push({
        name: 'Main',
        params: {
          routerType: 'push',
          // 自定义标记，在toolbar 中定义的 tab 数据源数据的下标
          componentIndex: 1,
          // 自定义标记，清空虚拟任务栈
          clearTask: true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.goods-detail {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  &-nav-left {
    position: relative;
    width: 100%;
    img {
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      margin-top: px2rem(-13);
    }
  }
  &-nav-title {
    width: 100%;
    height: 100%;
    font-size: $titleSize;
    font-weight: bold;
    text-align: center;
    color: white;
  }
  &-content {
    height: 100%;
    overflow: hidden;//解决立即购买和加入购物车按钮消失的问题
    &-desc {
      width: 100%;
      background-color: $bgColor;
      box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);
      &-item {
        background: white;
        padding: $marginSize;
        margin-bottom: $marginSize;
        &-price {
          font-size: px2rem(20);
          color: $wordColor;
          font-weight: 500;
        }
        &-name {
          margin-top: $marginSize;
          font-size: $titleSize;
          font-weight: 500;
          line-height: px2rem(20);
        }
        &-select {
          font-size: $infoSize;
          color: $textHintColor;
          height: px2rem(44);
          display: flex;
          align-items: center;
          border-bottom: px2rem(1) solid $lineColor;
          span {
            color: $textColor;
            font-size: $titleSize;
            font-weight: bold;
            margin-left: px2rem(4);
            width: 80%;
          }
        }
        &-support {
          margin-top: $marginSize;
          &-list {
            display: flex;
            flex-wrap: wrap;
            &-item {
              display: flex;
              align-items: center;
              padding: px2rem(6) 0;
              margin-right: $marginSize;
              img {
                width: px2rem(12);
                margin-right: px2rem(4);
              }
              span {
                font-size: $minInfoSize;
                color: $textHintColor;
              }
            }
          }
        }
      }
      &-detail {
        img {
          width: 100%;
        }
      }
    }
  }
  &-buy {
    background-color: white;
    border-top: px2rem(1) solid $lineColor;
    height: px2rem(46);
    line-height: px2rem(46);
    text-align: right;
    div {
      display: inline-block;
      width: px2rem(100);
      text-align: center;
      font-size: $infoSize;
      color: white;
    }
    &-add {
      background-color: rgb(252,218,252);
    }
    &-now {
      background-color: darkgoldenrod;
    }
  }
}
</style>
