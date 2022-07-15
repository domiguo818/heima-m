<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      title="登录"
      left-arrow
      @click-left="backToPrePage"
      class="navbar"
    >
      <template #left><van-icon name="cross" /></template>
    </van-nav-bar>
    <!-- input框 -->
    <van-form @submit="login" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="MobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="CheckNum"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-count-down
            :time="3 * 1000"
            v-if="CodeisShow"
            @finish="CodeisShow = false"
          />
          <van-button
            size="mini"
            round
            class="iconbtn"
            v-else
            @click.prevent="sendCode"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>

    <!-- 登录按钮 -->
  </div>
</template>

<script>
import { login, sendCode } from '@/api/user'
import { MobileRules, CheckNum } from '@/views/Login/rules'
export default {
  data () {
    return {
      mobile: '',
      code: '',
      MobileRules,
      CheckNum,
      CodeisShow: false
    }
  },

  methods: {
    backToPrePage () {
      this.$router.back()
    },
    onSubmit (values) {
      console.log('submit', values)
    },
    async login () {
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        this.$store.commit('setUser', res.data.data)
        console.log(res)
        this.$router.push('/profile')
        this.$toast.success('登陆成功')
      } catch (e) {
        // this.$toast.fail('登陆失败')
        // console.log(e)
        const status = e.response.status
        let message = '登录错误，请刷新'
        if (status === 400) {
          message = e.response.data.message
        }
        this.$toast.fail(message)
        // switch (status) {
        //   case 400:
        //     this.$toast.fail(e.response.data.message)
        //     break
        //   case 507:
        //     this.$toast.fail('服务器开小差了，请稍后重试~')
        //     break
        //   default:
        //     this.$toast.fail('服务器开小差了，请稍后重试~')
        //     break
        // }
      }
    },
    async sendCode () {
      try {
        await this.$refs.form.validate('mobile')
        await sendCode(this.mobile)
        this.CodeisShow = true
      } catch (e) {
        if (!e.response) {
          this.$toast.fail('手机号格式不正确')
        } else {
          const status = e.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(e.response.data.message)
          }
        }
        // this.$toast.fail('手机号非法')
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #4f98fc;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.form {
  :deep(.van-field__label) {
    flex: 1;
  }
  :deep(.van-cell__value) {
    flex: 20;
  }
  .toutiao {
    font-size: 0.49333rem;
  }
  .iconbtn {
    background-color: #eee;
    padding: 0 10px;
  }
}
</style>
