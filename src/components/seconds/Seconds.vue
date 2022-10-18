<template>
  <div class="seconds">
  <div class="seconds-wrap">
    <p class="seconds-wrap-title">
      小手一抢
    </p>
  <!-- 倒计时模块 -->
  <count-down :endHours="11"></count-down>
  </div>
  <div class="seconds-content">
    <div class="seconds-content-item" v-for="(item,index) in dataSource" :key="index">
      <img class="seconds-content-item-icon" :src="item.icon" alt="" srcset="" />
      <p class="seconds-content-item-price">￥{{item.price | priceValue}}</p>
      <p class="seconds-content-item-oldPrice">￥{{item.oldPrice | priceValue}}</p>
    </div>
  </div>
  </div>
</template>

<script>
import CountDown from '@c/seconds/CountDown.vue'
export default {
  name: 'seconds',
  props: {
    dataSource: {
      type: Array,
      require: true,
      default: () => {
        return []
      }
    }
  },
  components: {
    CountDown
  }
}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.seconds {
  background-color: white;
  border-radius: $radiusSize;
  margin: $marginSize;
  &-wrap {
    display: flex;
    padding: $marginSize;
    &-title {
      font-size: $titleSize;
      display: inline-block;
      color: $toolBarColor;
    }
  }
  &-content {
    padding: $marginSize 0;
    display: flex;
    overflow: hidden;
    overflow-x: scroll;
    &-item {
      padding: 0 $marginSize;
      text-align: center;
      &-icon {
        width: px2rem(66);
        height: px2rem(66);
      }
      &-price {
        color: $toolBarColor;
        font-size: $titleSize;
      }
      &-oldPrice {
        color: $textHintColor;
        font-size: $infoSize;
        margin-top: px2rem(6);
        text-decoration: line-through;//划线
      }
    }
  }
}
</style>
