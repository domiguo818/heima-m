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
    <van-form @submit="login" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
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
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-button size="mini" round class="iconbtn">发送验证码</van-button>
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
import { login } from '@/api/user'
export default {
  data () {
    return {
      username: '',
      code: ''
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
      await login(this.mobile, this.code)
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
