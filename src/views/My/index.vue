<template>
  <div class="my">
    <header>
      <!-- 登录的盒子 -->
      <div v-if="isLogin" class="user-info banner">
        <van-row></van-row>
        <van-row class="row-2">
          <van-col span="12">
            <van-row type="flex" align="center" justify="space-around">
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="userInfo.photo"
              />
              <span class="mobile">1311111111</span>
            </van-row>
          </van-col>
          <van-col span="11">
            <van-row class="code-row" type="flex" align="center" justify="end">
              <van-button class="code-btn" size="mini" round>
                编辑资料</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid :border="false" class="grid">
            <van-grid-item text="头条">
              <template #icon>{{ userInfo.art_count }}</template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>{{ userInfo.fans_count }}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{ userInfo.follow_count }}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>{{ userInfo.like_count }}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 未登录的盒子 -->
      <div v-else class="login-register banner">
        <div class="warp" @click="toLogin">
          <img src="../../assets/images/mobile.png" alt="" />
          <span>登录 / 注册</span>
        </div>
      </div>
    </header>
    <main>
      <div>
        <van-grid column-num="2" class="grid" clickable>
          <van-grid-item icon="photo-o" text="收藏">
            <template #icon>
              <span class="toutiao toutiao-shoucang"></span>
            </template>
          </van-grid-item>
          <van-grid-item icon="photo-o" text="历史">
            <template #icon>
              <span class="toutiao toutiao-lishi"></span>
            </template>
          </van-grid-item>
        </van-grid>

        <div class="link">
          <van-cell title="消息通知" is-link></van-cell>
          <van-cell title="消息通知" is-link></van-cell>
        </div>
      </div>
    </main>
    <van-button v-if="isLogin" block class="login-btn" @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { getUserInfo } from '@/api'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    isLogin () {
      return !!this.$store.state.user.token
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    logout () {
      Dialog.confirm({
        title: '黑马头条',
        message: '确认退出当前帐号'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', {})
        })
        .catch(() => {
          // on cancel
        })
      // this.$store.commit('setUser', {})
    },
    toLogin () {
      this.$router.push('/login')
    },
    async getUserInfo () {
      console.log(11)
      if (this.isLogin) {
        try {
          const {
            data: { data }
          } = await getUserInfo()
          // console.log(res)
          //  = res
          this.userInfo = data
          console.log(this.userInfo)
        } catch (error) {}
      }
    }
  }
}
</script>

<style scoped lang="less">
.my {
  background-color: #f5f7f9;
  height: calc(100vh - 100px);
}
.banner {
  width: 100%;
  height: 400px;
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
}
.user-info {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .row-2 {
    .van-col {
      height: 100%;
    }
  }
  .mobile {
    font-size: 0.4rem;
    color: #fff;
  }
  code-btn {
    width: 1.53333rem;
    height: 0.42667rem;
    background: #fff;
    border-radius: 0.21333rem;
    font-size: 0.26667rem;
    color: #666;
    padding: 0;
  }

  .code-row {
    height: 100%;
  }
  .grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
  }
  .van-grid-item {
    font-size: 0.34rem;
    color: #fff;
    :deep(.van-grid-item__text) {
      color: #fff;
    }
  }
}
.login-register {
  display: flex;
  justify-content: center;
  align-items: center;
  .warp {
    // width: 100px;
    // height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ffffff;
    font-size: 0.37rem;
    img {
      width: 100px;
      margin-bottom: 10px;
    }
  }
}
// 主体区域
main {
  .grid {
    color: #646566;
    // 字体图标
    .toutiao {
      font-size: 0.6rem;

      &.toutiao-lishi {
        color: #ffb31d;
      }
      &.toutiao-shoucang {
        color: #ed5253;
      }
    }
  }
}
.login-btn {
  :deep(.van-button__text) {
    color: red;
  }
}
</style>
