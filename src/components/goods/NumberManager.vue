<template>
  <!-- 数量控制器来说：
      只需要去负责对数量的逻辑处理，而不需要去管其他的东西 -->
  <div class="number-manager">
    <span class="number-manager-less" :class="{'number-manager-disable' : number === 1}" @click="onLessClick">-</span>
    <span class="number-manager-num">{{number}}</span>
    <span class="number-manager-add" @click="onAddClick">+</span>
  </div>
</template>

<script>
export default {
  name: 'numberManager',
  props: {
    // 父组件指定的默认数量
    defaultNum: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      number: 1
    }
  },
  methods: {
    // 减号
    onLessClick () {
      if (this.number === 1) {
        return
      }
      this.number--
    },
    // 加号
    onAddClick () {
      this.number++
    }
  },
  watch: {
    defaultNum (newval) {
      this.number = newval
    },
    number (newval) {
      this.$emit('onChangeNum', newval)
    }

  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.number-manager {
  display: flex;
  font-size: $infoSize;
  height: px2rem(20);
  line-height: px2rem(20);
  span {
    width: px2rem(30);
    text-align: center;
    display: inline-block;
    font-weight: 500;
  }
  &-num {
    background-color: $bgColor;
    padding: 0 px2rem(4);
  }
  &-disable {
    color: $textHintColor;
  }
}
</style>
