<template>
  <div>
    <swiper :options="swiperOptions">
      <swiper-slide v-for="(item, index) in swiperImgs" :key="index">
        <img class="swiper-slide-img" :style="{height: height}" :src="item" alt="" srcset="" />
      </swiper-slide>
      <template v-slot:pagination>
        <div class="swiper-pagination"></div>
      </template>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'MySwiper',
  // props: ['height'],
  props: {
    height: {
      type: String,
      default: 'auto'
    },
    swiperImgs: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    },
    /**
     * 分页器类型
     * 1：圆点分页器
     * 2：数字分页器
     */
    paginationType: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      // swiper配置
      swiperOptions: {
        // 自动滚动
        autoplay: true,
        // swiper高度跟随slide 高度进行变化
        autoHeight: true,
        // 分页器设置效果
        pagination: {
          // 分页器对应的html元素
          el: '.swiper-pagination',
          // 分页器样式
          type: 'bullets',
          // 分页器内的元素，添加类名
          bulletClass: 'custom-bullet-class'
        }
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  created () {
    this.initPaginationType()
  },
  methods: {
    initPaginationType () {
      switch (this.paginationType) {
        case '1':
          this.swiperOptions.pagination = {
          // 分页器对应的html元素
            el: '.swiper-pagination',
            // 分页器样式
            type: 'bullets',
            // 分页器内的元素，添加类名
            bulletClass: 'custom-bullet-class'
          }
          break
        case '2':
          this.swiperOptions.pagination = {
          // 分页器对应的html元素
            el: '.swiper-pagination',
            // 分页器样式
            type: 'fraction'
          }
          break
      }
    }
  }
}
</script>

<style lang="scss">
@import '@css/style.scss';
.swiper-container {
  .swiper-wrapper {
    .swiper-slide {
      background-color: white;
      .swiper-slide-img {
        width: 100%;
      }
    }
  }
  // 圆点分页器
  .swiper-pagination {
    bottom: px2rem(12);
    .custom-bullet-class {
      box-sizing: border-box;
      border-radius: 100%;
      height: px2rem(6);
      width: px2rem(6);
      border:px2rem(1) solid #fff ;
      margin: 0 px2rem(4);
      display: inline-block;
      opacity: 1;
    }
    .swiper-pagination-bullet-active {
      background: #fff;
    }
  }
  //数字分页器
  .swiper-pagination-fraction {
    left: auto;
    right: 0;
    width: auto;
    font-size: $infoSize;
    background-color: rgba(0, 0, 0, 0.3);
    padding: px2rem(6) px2rem(18);
    border-top-left-radius: px2rem(16);
    border-bottom-left-radius: px2rem(16);
    bottom: px2rem(32);
    color: white;
    .swiper-pagination-current {
      font-size: $titleSize;
      font-weight: bold;
    }
  }
}
</style>
