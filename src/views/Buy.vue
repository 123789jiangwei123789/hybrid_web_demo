<template>
  <div class="buy-page">
    <navigation-bar :pageHeaderTitle="'立即购买'"></navigation-bar>
    <div class="buy-page-content">
      <div class="buy-page-content-product">
        <img :src="goodsData.img" alt="" srcset="" />
        <div class="buy-page-content-product-desc">
          <p class="buy-page-content-product-desc-name">{{goodsData.name}}</p>
          <p class="buy-page-content-product-desc-price">￥{{goodsData.price | priceValue}}</p>
        </div>
      </div>
      <ul class="buy-page-content-list">
        <li class="buy-page-content-list-item" v-for="(item,index) in payMomentData" :key="index" @click="selectPayment(item)">
          <img :src="item.icon" alt="" srcset="" class="buy-page-content-list-item-img" />
          <div class="buy-page-content-list-item-desc">
            <p class="buy-page-content-list-item-desc-name">{{item.name}}</p>
            <p class="buy-page-content-list-item-desc-desc">{{item.desc}}</p>
          </div>
          <img class="buy-page-content-list-item-checked" :src="getselectIcon(item.id === selectPayMent.id)" />
        </li>
      </ul>
    </div>
    <div class="buy-page-payment page-commit" @click="buySure">
      立即购买
    </div>
  </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
export default {
  name: 'buy',
  data () {
    return {
      // 商品数据源
      goodsData: {},
      // 支付方式数据源
      payMomentData: [
        {
          id: '1',
          name: '支付宝支付',
          desc: '数亿用户都在用，安全可托付',
          icon: require('@img/alipay.svg')
        },
        {
          id: '2',
          name: '微信支付',
          desc: '亿万用户选择，更快更安全',
          icon: require('@img/weichat.png')
        }
      ],
      // 选中的支付方式
      selectPayMent: {}
    }
  },
  components: {
    NavigationBar
  },
  created () {
    // 默认选中支付宝支付方式
    this.selectPayMent = this.payMomentData[0]
    // 获取当前商品的数据
    this.$http.get('/goodsDetail', {
      params: {
        goodsId: this.$route.query.goodsId
      }
    }).then(res => {
      this.goodsData = res.goodsData
    })
  },
  methods: {
    getselectIcon (checked) {
      return checked ? require('@img/check.svg') : require('@img/no-check.svg')
    },
    selectPayment (item) {
      this.selectPayMent = item
    },
    // 立即购买
    buySure () {
       // 判断支付方式
       // 支付宝支付
       if (this.selectPayMent.id === '1') {
         this.aliPay()
       } else if (this.selectPayMent.id === '2') {
         this.wxPay()
       }
    },
    // 支付宝支付
    aliPay () {
      if (window.androidJSBridge) {
        window.androidJSBridge.aliPay(JSON.stringify(this.goodsData))
      }
    },
    // 微信支付
    wxPay () {
      if (window.androidJSBridge) {
        window.androidJSBridge.wxPay(JSON.stringify(this.goodsData))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.buy-page {
  position: absolute;//组件没有脱离标准文档流的话，那么过度动画会有一个新页面从下往上的闪动。 如果脱离了文档流的话，那么就不会有这个闪动了。
  width: 100%;
  height: 100%;
  // 添加 overflow: hidden; 处理在 APP 中页面产生滑动的问题。
  overflow: hidden;
  &-content {
    height: 100%;
    &-product {
      display: flex;
      background-color: white;
      padding: $marginSize;
      border-bottom: px2rem(1) solid $lineColor;
      // border-top: px2rem(1) solid $lineColor;
      // margin-top: $marginSize;
      img {
        width: px2rem(100);
        height: px2rem(100);
      }
      &-desc {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 $marginSize;
        &-name {
          font-size: $infoSize;
          line-height: px2rem(18);
        }
        &-price {
          font-size: $titleSize;
          color: $mainColor;
          font-weight: 500;
        }
      }
    }
    &-list {
      &-item {
        display: flex;
        align-items: center;
        background-color: white;
        border-bottom: 1px solid $lineColor;
        padding: $marginSize;
        &-img {
          height: px2rem(30);
        }
        &-desc {
          margin-left: px2rem(12);
          flex: 1;
          &-name {
            font-size: $infoSize;
          }
          &-desc {
            font-size: $minInfoSize;
            margin-top: px2rem(6);
            color: $textHintColor;
          }
        }
        &-checked {
          width: px2rem(16);
          height: px2rem(16);
        }
      }
    }
  }
  &-payment {
    position: absolute;
    bottom: px2rem(52);
  }
}
</style>
