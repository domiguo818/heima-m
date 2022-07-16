<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/ ">
        <template #icon>
          <span class="toutiao toutiao-shouye"></span>
        </template>
        首页</van-tabbar-item
      >
      <van-tabbar-item icon="search" to="/video">
        <template #icon> <span class="toutiao toutiao-shipin"></span> </template
        >视频</van-tabbar-item
      >
      <van-tabbar-item icon="friends-o" to="/qa">
        <template #icon> <span class="toutiao toutiao-wenda"></span> </template
        >问答</van-tabbar-item
      >
      <van-tabbar-item icon="setting-o" to="/profile">
        <template #icon> <span class="toutiao toutiao-wode"></span> </template
        >{{ !!$store.state.user.token ? '我的' : '未登录' }}</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style scoped lang="less">
.toutiao {
  font-size: 0.5rem;
}
</style>
