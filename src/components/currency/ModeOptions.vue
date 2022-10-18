<template>
  <div class="mode-option">
    <div class="mode-option-item" v-for="(item,index) in dataSource" :key="index" @click="onClickItem">
      <img class="mode-option-item-img" :src="item.icon" alt="" srcset="" />
      <p class="mode-option-item-title">{{item.title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modeoptions',
  data () {
    return {
      dataSource: [
        {
          id: '1',
          icon: require('@img/1.jpg'),
          title: '我'
        },
        {
          id: '2',
          icon: require('@img/13.jpg'),
          title: '希望'
        },
        {
          id: '3',
          icon: require('@img/3.jpg'),
          title: '杜沂琳'
        },
        {
          id: '4',
          icon: require('@img/4.jpg'),
          title: '同学'
        },
        {
          id: '5',
          icon: require('@img/8.jpg'),
          title: '永远'
        },
        {
          id: '6',
          icon: require('@img/6.jpg'),
          title: '开心'
        },
        {
          id: '7',
          icon: require('@img/17.jpg'),
          title: '来自'
        },
        {
          id: '8',
          icon: require('@img/18.jpg'),
          title: '不知名'
        },
        {
          id: '9',
          icon: require('@img/10.jpg'),
          title: '的大哥哥'
        },
        {
          id: '10',
          icon: require('@img/20.jpg'),
          title: '不许点我'
        }
      ]
    }
  },
  methods: {
    onClickItem () {
      this.$router.push({
        name: 'goodsList',
        params: {
          routerType: 'push'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.mode-option {
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  padding-bottom: px2rem(14);
  &-item {
    width: 20%;
    text-align: center;
    margin-top: px2rem(10);
    &-img {
      width: px2rem(40);
      height: px2rem(40);
    }
    &-title {
      font-size: $minInfoSize;
      margin-top: px2rem(6);
      color: $toolBarColor;
    }
  }
}
</style>
