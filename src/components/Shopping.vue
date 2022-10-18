<template>
  <!-- 从商品详情中进入购物车页面：
  1. 首先进入到 main.vue,
  2. 通过 main.vue 跳转到 购物车 （可以通过自定义的标记的方式来实现）
  问题：
    当我们从商品详情进入购物车后，再返回到商品详情页面，我们发现无论点击哪个商品，都会进入到我们最初进入的商品详情页面
  原因：
    虚拟任务栈缓存了商品详情的页面
  解决方案：
    在跳转到 main 之后，通过自定义指令，来初始化虚拟任务栈。
  -->
  <div class="shopping">
    <navigation-bar
      :pageHeaderTitle="'老公暂存处'"
      :isShowBack="false"
    ></navigation-bar>
    <div class="shopping-content">
      <!-- 商品区 -->
      <div class="shopping-content-list">
        <div
          class="shopping-content-list-item"
          v-show="goodsData.length"
          v-for="(item, index) in goodsData"
          :key="index"
        >
          <img
            class="shopping-content-list-item-checked"
            :src="selectGoods(item.isCheck)"
            @click="selectDataClick(item)"
          />
          <img class="shopping-content-list-item-img" :src="item.img" />
          <div class="shopping-content-list-item-desc">
            <p class="shopping-content-list-item-desc-name two-row-text">
              <direct v-if="item.isDirect"></direct>
              {{ item.name }}
            </p>
            <div class="shopping-content-list-item-desc-data">
              <p class="shopping-content-list-item-desc-data-price">
                ￥{{ item.price | priceValue }}
              </p>
              <!-- 商品计数加减组件 -->
              <number-manager
                :defaultNum="item.number"
                @onChangeNum="onChangeNum(arguments, item, index)"
              ></number-manager>
            </div>
          </div>
        </div>
        <!-- 跑马灯效果 -->
        <div class="marquee" v-if="!goodsData.length">
          <marquee
            direction="down"
            width="100%"
            height="100%"
            behavior="alternate"
          >
            <marquee behavior="alternate">
              这是我为你开发的，呐，送你，嘿嘿嘿
            </marquee>
          </marquee>
        </div>
      </div>
      <!-- 商品统计 -->
      <div class="shopping-content-total">
        <div class="shopping-content-total-isChecked">
          <img
            :src="checkedIconAll()"
            @click="selectAll"
            alt=""
            srcset=""
          /><span>全选</span>
        </div>
        <div class="shopping-content-total-desc">
          <p class="shopping-content-total-desc-total">
            总共消费：<span>￥{{ totalDatas.totalPrice | priceValue }}</span>
          </p>
          <p class="shopping-content-total-desc-all">
            消费:<span>￥{{ totalDatas.totalPrice | priceValue }}</span
            >&nbsp;&nbsp;立减:<span>￥00.00</span>
          </p>
        </div>
        <div class="shopping-content-total-settlement">
          快付钱({{ totalDatas.goodsNumber }})
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from "@c/currency/NavigationBar.vue";
import Direct from "@c/goods/Direct.vue";
import NumberManager from "./goods/NumberManager.vue";
export default {
  name: "shopping",
  components: {
    NavigationBar,
    Direct,
    NumberManager
  },
  data() {
    return {
      // 购物车数据源
      goodsData: this.$store.state.shoppingDatas,
      // 统计数据源
      totalDatas: {
        isAll: false,
        totalPrice: 0,
        goodsNumber: 0
      }
    };
  },
  activated() {
    this.goodsData.forEach(item => {
      if (!item.isCheck) {
        this.totalDatas.isAll = false;
      }
    });
  },
  methods: {
    /**
     * @params $arguments JS提供的类数组对象，如果想获取到传递的第一个参数，那么就拿$arguments[0]
     */
    onChangeNum($arguments, item, index) {
      const number = $arguments[0];
      this.$store.commit("changeShoppingDataNum", {
        index: index,
        number: number
      });
      // 商品数量发生变化，并且处于选中的状态
      if (item.isCheck) {
        this.computedGoods();
      }
    },
    // 购物车选择数据源
    selectDataClick(item) {
      item.isCheck = !item.isCheck;
      this.computedGoods();
    },
    // 全选
    selectAll() {
      this.totalDatas.isAll = !this.totalDatas.isAll;
      this.goodsData.forEach(item => (item.isCheck = this.totalDatas.isAll));
    },
    // 监听选择的购物车数据的变化
    computedGoods() {
      this.totalDatas = {
        isAll: true,
        totalPrice: 0,
        goodsNumber: 0
      };
      let price = 0;
      let goodsNum = 0;
      this.goodsData.forEach(item => {
        if (!item.isCheck) {
          this.totalDatas.isAll = false;
        } else {
          price += parseFloat(item.number) * parseFloat(item.price);
          goodsNum += parseFloat(item.number);
        }
      });
      this.totalDatas.totalPrice = price;
      this.totalDatas.goodsNumber = goodsNum;
    },
    // 购物车选择框
    selectGoods(isChecked) {
      return isChecked
        ? require("@img/check.svg")
        : require("@img/no-check.svg");
    },
    checkedIconAll() {
      return this.totalDatas.isAll
        ? require("@img/check.svg")
        : require("@img/no-check.svg");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.shopping {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  &-content {
    background-color: $bgColor;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    // 商品区
    &-list {
      height: 100%;
      overflow: hidden;
      overflow-y: auto;
      &-item {
        background-color: white;
        padding: $marginSize;
        display: flex;
        border-bottom: px2rem(1) solid $lineColor;
        &-checked {
          width: $checkSize;
          align-self: center;
          padding: px2rem(6);
        }
        &-img {
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
          }
        }
      }
    }
    // 商品统计
    &-total {
      height: px2rem(56);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      background-color: white;
      border-top: px2rem(1) solid $lineColor;
      &-isChecked {
        display: flex;
        align-items: center;
        margin-left: $marginSize;
        margin-right: $marginSize;
        img {
          width: $checkSize;
          padding: px2rem(6);
        }
        span {
          font-size: $infoSize;
        }
      }
      &-desc {
        flex-grow: 2;
        display: flex;
        flex-direction: column;
        color: $wordColor;
        &-total {
          font-size: $titleSize;
          margin-bottom: px2rem(6);
          span {
            font-weight: bold;
          }
        }
        &-all {
          font-size: $minInfoSize;
          span {
            font-weight: bold;
          }
        }
      }
      &-settlement {
        width: px2rem(120);
        height: 100%;
        font-size: $titleSize;
        background-color: rgb(252, 218, 252);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
