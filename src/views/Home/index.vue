<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round @click="$router.push('/search')">
          <van-icon name="search" />
          搜索
        </van-button>
      </template>
    </van-nav-bar>
    <van-tabs v-model="active">
      <van-tab :title="item.name" v-for="item in myChannel" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>

      <span class="toutiao toutiao-gengduo" @click="clickFn"></span>
    </van-tabs>
    <EditChannelPopup
      ref="popup"
      :channeList="myChannel"
      @delchannel="delchannelFn"
      @changeactive="changeactiveFn"
      @addChannels="addChannelsFn"
    ></EditChannelPopup>
  </div>
</template>

<script>
import EditChannelPopup from './componet/EditChannelPopup.vue'
import {
  getChannels,
  getMyChannelsByLocal,
  setMyChannelToLocal,
  delMyChannel,
  addMyChannel
} from '@/api'
import ArticleList from './componet/ArticleList.vue'

export default {
  components: {
    ArticleList,
    EditChannelPopup
  },
  computed: {
    isLogin () {
      return !!this.$store.state.user.token
    }
  },
  data () {
    return {
      active: 0,
      myChannel: []
    }
  },
  created () {
    this.getChannels()
  },
  methods: {
    async getChannels () {
      try {
        if (!this.isLogin) {
          const myChannels = getMyChannelsByLocal()
          if (myChannels) {
            this.myChannel = myChannels
          } else {
            const { data } = await getChannels()

            this.myChannel = data.data.channels
          }
        } else {
          const { data } = await getChannels()

          this.myChannel = data.data.channels
        }
      } catch (error) {}

      // console.log(this.myChannel)
    },
    clickFn () {
      this.$refs.popup.show = true
    },
    async delchannelFn (id) {
      this.myChannel = this.myChannel.filter((item) => item.id !== id)
      if (!this.isLogin) {
        setMyChannelToLocal(this.myChannel)
      } else {
        try {
          await delMyChannel(id)
        } catch (error) {
          this.$toast.fail('删除用户频道失败')
        }
      }
      this.$toast.fail('删除用户频道成功')
    },
    changeactiveFn (active) {
      this.active = active
    },
    async addChannelsFn (channel) {
      this.myChannel.push(channel)
      if (!this.isLogin) {
        setMyChannelToLocal(this.myChannel)
      } else {
        try {
          await addMyChannel(channel.id, this.myChannel.length)
        } catch (error) {
          return this.$toast.fail('添加频道失败')
        }
      }
      this.$toast.success('添加频道成功')
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  z-index: 999;
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
