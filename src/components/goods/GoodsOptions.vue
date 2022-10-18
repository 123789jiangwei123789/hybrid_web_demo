<template>
  <div class="good-option z-index-2">
    <ul class="good-option-list">
      <li class="good-option-item" v-for="(item, index) in optionsData" :key="index">
        <a class="good-option-item-content" @click="onOptionItemClick(item, index)">
          <span class="good-option-item-content-name" :class="{'good-option-item-content-active' : selectOption.id === item.id}">{{item.name}}</span>
          <span class="good-option-item-content-curet curet" v-if="item.subs.length > 0" :class="[isShowSubs && selectOption.id === item.id ? 'good-option-item-content-curet-open' : 'good-option-item-content-curet-close']"></span>
        </a>
      </li>
    </ul>
    <transition name="fold-height">
      <div class="option-subs z-index-2" v-if="isShowSubs">
        <ul class="option-subs-list">
          <li class="option-subs-list-item" v-for="(item, index) in optionsData[0].subs" :key="index">
            <a class="option-subs-list-item-content" @click="onSubsOptionItemClick(item, index)">
              <span class="option-subs-list-item-content-name" :class="{'option-subs-list-item-content-active' : selectOption.id === item.id}">{{item.name}}</span>
              <img class="option-subs-list-item-content-select" src="@img/options-select.svg" alt="" v-show="selectOption.id === item.id" />
            </a>
          </li>
        </ul>
      </div>
    </transition>
    <div class="cover" v-show="isShowSubs" @click="isShowSubs = false"></div>
  </div>
</template>

<script>
export default {
  name: 'goodsoptions',
  data () {
    return {
      // 筛选数据源
      optionsData: [
        {
          id: '1',
          name: '默认',
          subs: [
            {
              id: '1',
              name: '默认'
            },
            {
              id: '1-2',
              name: '价格由高到低'
            },
            {
              id: '1-3',
              name: '销量由高到低'
            }
          ]
        },
        {
          id: '2',
          name: '有货优先',
          subs: []
        },
        {
          id: '3',
          name: '直营优先',
          subs: []
        }
      ],
      // 选中的选项
      selectOption: {},
      // 展示子选项
      isShowSubs: false
    }
  },
  mounted () {
    this.selectOption = this.optionsData[0]
  },
  methods: {
    // 一级选项点击方法
    onOptionItemClick (item, index) {
      /**
      * 1.如果子选项处于展开状态，关闭它
      * 2.一级选项包含子选项
      * 3.并且当前一级选项处于一个选中状态下的时候，展开子选项
      * 4.设置选中项等于一级选项
      *  */
      if (this.isShowSubs) {
        this.isShowSubs = false
        return false
      }
      if (item.subs.length > 0 && item.id === this.selectOption.id) {
        this.isShowSubs = true
      }
      this.selectOption = item
    },
    // 子选项点击方法
    onSubsOptionItemClick (item, index) {
    /**
     *设置选中项为子选项即用户点击的
     *2.将选中的子选项的名字顶到一级选项
     *3.关闭子选项
     */
      this.selectOption = item
      this.optionsData.forEach(item => {
        item.subs.forEach(obj => {
          if (obj.id === this.selectOption.id) {
            item.id = obj.id
            item.name = obj.name
          }
        })
      })
      this.isShowSubs = false
    }
  },
  watch: {
    selectOption (newval) {
      this.$emit('changeSortType', newval.id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.good-option {
  width: 100%;
  border-bottom: 1px solid $lineColor;
  // 一级选项css
  &-list {
    width: 100%;
    display: flex;
    background-color: white;
    height: $goodsOptionsHeight;
  }
  .good-option-item {
    flex-grow: 1;
    &-content {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      &-name {
        font-size: $infoSize;
        margin-right: $marginSize;
      }
      // 子选项展开时，三角形的动画
      &-curet {
        &-open {
          transform: rotate(-180deg);
          transition: all 0.3s;
        }
        &-close {
          transform: rotate(0deg);
          transition: all 0.3s;
        }
      }
      &-active {
        color: $wordColor;
      }
    }
  }
  //子选项内容区
  .option-subs {
    // 脱离标准文档流
    position: absolute;
    width: 100%;
    max-height: px2rem(180);
    overflow: hidden;
    overflow-y: auto;
    background-color: white;
    &-list {
      &-item {
        &-content {
          display: flex;
          align-items: center;
          border-top: 1px solid $lineColor;
          padding: $marginSize;
          height: px2rem(44);
          box-sizing: border-box;
          &-name {
            font-size: $infoSize;
            display: inline-block;
            flex-grow: 1;
            &-active {
              color: $toolBarColor;
            }
          }
          &-active {
            color: $wordColor;
          }
          &-select {
            width: px2rem(18);
            height: px2rem(18);
          }
        }
      }
    }
  }
  // 子选项内容展开的动画，当v-if="true"时候调用
  .fold-height-enter-active {
    animation-duration: 0.3s;
    animation-name: fold-height-open;
  }
  @keyframes fold-height-open {
    0% {
      max-height: 0;
    }
    100% {
      max-height: px2rem(180);
    }
  }
  // 子选项内容关闭的动画，当v-if="false"时候调用
  .fold-height-leave-active {
    animation-duration: 0.3s;
    animation-name: fold-height-close;
  }
  @keyframes fold-height-close {
    0% {
      max-height: px2rem(180);
    }
    100% {
      max-height: 0;
    }
  }
}
</style>
