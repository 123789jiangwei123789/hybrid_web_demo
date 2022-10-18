<template>
  <div class="home" ref="home" @scroll="onScrollClick">
    <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
      <template v-slot:nav-left>
        <img :src="navBarCurrentSlotStyle.leftIcon" />
      </template>
      <template v-slot:nav-center>
        <search
          :bgColor="navBarCurrentSlotStyle.search.bgColor"
          :icon="navBarCurrentSlotStyle.search.icon"
          :hintColor="navBarCurrentSlotStyle.search.hintColor"
        ></search>
      </template>
      <template v-slot:nav-right>
        <img :src="navBarCurrentSlotStyle.rightIcon" />
      </template>
    </navigation-bar>
    <div class="home-content">
      <!-- 轮播 -->
      <my-swiper
        :swiperImgs="swiperData.map((item) => item.icon)"
        :height="height"
      ></my-swiper>
      <!-- 活动 -->
      <activity>
        <div class="activity-520">
          <img
            v-for="(item, index) in activityData"
            :key="index"
            :src="item.icon"
            alt=""
          />
        </div>
      </activity>
      <!-- 功能选项 -->
      <mode-options></mode-options>
      <!-- 秒杀组件 -->
      <seconds :dataSource="secondsData"></seconds>
      <!-- 拼购节 -->
      <activity>
        <div class="activity-pin-gou-jie">
          <img src="@img/pinGouJie.gif" />
        </div>
      </activity>
      <!-- 商品列表 -->
      <goods :layoutType="'3'" :isScroll="false"></goods>
    </div>
  </div>
</template>

<script>
import MySwiper from "@c/swiper/MySwiper.vue";
import Activity from "@c/currency/Activity.vue";
import ModeOptions from "@c/currency/ModeOptions.vue";
import Seconds from "@c/seconds/Seconds.vue";
import Goods from "@c/goods/Goods.vue";
import NavigationBar from "@c/currency/NavigationBar.vue";
import Search from "@c/currency/Search.vue";
export default {
  name: "home",
  components: {
    MySwiper,
    Activity,
    ModeOptions,
    Seconds,
    Goods,
    NavigationBar,
    Search,
  },
  data() {
    return {
      swiperData: [],
      height: window.isIphoneX ? "228px" : "184px",
      activityData: [],
      secondsData: [],
      // navBar插槽的样式数据，
      // 且包含页面未开始滑动的时候插槽样式和滑动开始到锚点之后插槽的样式
      navBarSlotStyle: {
        // 默认样式下的插槽样式
        normal: {
          leftIcon: require("@img/more-white.svg"),
          search: {
            bgColor: "#ffffff",
            hintColor: "#999999",
            icon: require("@img/search.svg"),
          },
          rightIcon: require("@img/message-white.svg"),
        },
        // 高亮显示下的插槽样式
        highlight: {
          leftIcon: require("@img/more-white.svg"),
          search: {
            bgColor: "#ffffff",
            hintColor: "#999999",
            icon: require("@img/search.svg"),
          },
          rightIcon: require("@img/message-white.svg"),
        },
      },
      // 当前插槽的样式
      navBarCurrentSlotStyle: {},
      // 顶部样式
      navBarStyle: {
        backgroundColor: "",
        position: "fixed",
      },
      // 锚点值
      MAX_SCROLL_VALUE: 160,
      // 页面滚动距离
      scrollTopValue: -1,
    };
  },
  activated() {
    this.$refs.home.scrollTop = this.scrollTopValue;
  },
  // 记录小坑：data先挂载到实例，触发created,dom解构挂载完毕才会执行mounted
  created() {
    this.initData();
    this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal;
  },
  methods: {
    /**
     * 监听页面滚动
     *   1.获取当前页面滚动的距离
     *   2.计算navbar背景颜色（navbar背景透明的）
     *     当前滚动的距离 / 锚点值 = navbar背景透明度opacity
     *   3.opacity >=1,navbar高亮插槽显示
     *     opacity < 1,navbar默认插槽显示
     */
    onScrollClick($event) {
      // 获取当前滚动距离
      this.scrollTopValue = $event.target.scrollTop;
      // 计算navbar背景颜色（navbar背景透明的）
      const opacity = this.scrollTopValue / this.MAX_SCROLL_VALUE;
      // 获取当前插槽的样式
      if (opacity >= 1) {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.highlight;
      } else {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal;
      }
      // 当前顶部的navbar背景颜色
      this.navBarStyle.backgroundColor = "rgba(252,218,252," + opacity + ")";
    },
    // 获取轮播数据
    initData() {
      // axios 同时发送多个请求（并行）
      this.$http
        .all([
          this.$http.get("/swiper"),
          this.$http.get("/activitys"),
          this.$http.get("/seconds"),
        ])
        .then(
          this.$http.spread((swiperData, activityData, secondsData) => {
            this.activityData = activityData.list;
            this.swiperData = swiperData.list;
            this.secondsData = secondsData.list;
          })
        );
    },
    // async/await方式
    // async initData () {
    //   const res = await this.$http.all([this.$http.get('/swiper'),
    //     this.$http.get('/activitys')]
    //   )
    //   this.activityData = res[1].list
    //   this.swiperData = res[0].list
    // }
    onLeftBack() {},
  },
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.home {
  width: 100%;
  height: 100%;
  background-color: $bgColor;
  overflow: hidden;
  overflow-y: auto;
  &-content {
    height: 100%;
    .activity-520 {
      margin-top: px2rem(-8);
      border-top-left-radius: px2rem(8);
      border-top-right-radius: px2rem(8);
      img {
        display: inline-block;
        width: 33.33%;
      }
    }
    .activity-pin-gou-jie {
      margin-top: $marginSize;
      img {
        width: 100%;
      }
    }
  }
}
</style>
