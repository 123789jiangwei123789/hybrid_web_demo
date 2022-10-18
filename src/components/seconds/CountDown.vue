<template>
  <div class="count-down">
    <span class="count-down-end-time">{{ endHours }}点场</span>
    <span class="count-down-surplus">{{ surplus | filterTime }}</span>
  </div>
</template>

<script>
/**
 * 能力：传递给组件一个活动开始时间，组件根据这个时间进行计算
 * 1.当前时间未到开始时间：展示倒计时，
 * 2.当前时间到了开始时间：展示活动进行中，
 * 3.当前时间超过开始时间：展示活动已结束
 */
export default {
  name: "countdown",
  props: {
    endHours: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  data() {
    return {
      // 展示活动状态
      surplus: "",
      // 距离活动开始时间的倒计时秒数
      diffSeconds: 0,
      interVal: undefined,
    };
  },
  mounted() {
    this.computedSurplus();
  },
  methods: {
    computedSurplus() {
      if (this.interVal) clearInterval(this.interVal);
      // 获取当前时间
      const date = new Date();
      // 当前时间超过开始时间：展示活动已结束
      if (date.getHours() > this.endHours) {
        this.surplus = "哎呀！没有抢到";
        return false;
      }
      // 当前时间到了开始时间：展示活动进行中
      if (date.getHours() === this.endHours) {
        this.surplus = "快抢啊";
        return false;
      }
      /**
       * 当前时间小于活动时间，活动未开始，进行倒计时,
       * -1 表示 预计时间为 16点 ， 当前为 12点00分，
       * 那么差距应该是 3个小时 59分 59秒，而不是4个小时
       */
      const diffHours = this.endHours - date.getHours() - 1;
      const diffMinutes = 60 - date.getMinutes() - 1;
      const diffSecond = 60 - date.getSeconds();
      // 获取当前秒数
      this.diffSeconds = diffHours * 3600 + diffMinutes * 60 + diffSecond;
      this.interVal = setInterval(() => {
        this.diffSeconds -= 1;
      }, 1000);
    },
  },
  watch: {
    diffSeconds(newval) {
      const hour = Math.floor(newval / 3600);
      const minute = Math.floor(newval / 60) % 60;
      const second = newval % 60;
      this.surplus = hour + ":" + minute + ":" + second;
    },
    endHours(newval) {
      this.computedSurplus();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.count-down {
  display: flex;
  font-size: px2rem(14);
  margin-left: $marginSize;
  span {
    display: inline-block;
    padding: px2rem(2) px2rem(4);
  }
  &-end-time {
    background-color: $mainColor;
    border-top-left-radius: px2rem(4);
    border-bottom-left-radius: px2rem(4);
    border: px2rem(1) solid $mainColor;
    color: white;
  }
  &-surplus {
    background-color: white;
    border-top-right-radius: px2rem(4);
    border-bottom-right-radius: px2rem(4);
    border: px2rem(1) solid $mainColor;
    color: $mainColor;
  }
}
</style>
