<template>
  <div>
    <van-cell-group>
      <van-cell title="搜索历史">
        <template #right-icon v-if="isDel">
          <van-icon class="toutiao toutiao-shanchu" @click="isDel = false" />
        </template>
        <template #default v-else>
          <span @click="delAll">全部删除</span>&nbsp;
          <span @click="isDel = true">完成</span>
        </template>
      </van-cell>
      <van-cell
        :title="item"
        v-for="(item, index) in historyList"
        :key="index"
        @click="toResultPage(item)"
      >
        <template #right-icon>
          <van-icon
            name="close"
            v-if="!isDel"
            @click.stop="delItem(item)"
          /> </template
      ></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { storage } from '@/utils/storage'
export default {
  data () {
    return {
      historyList: [],
      isDel: true
    }
  },
  created () {
    this.getHistoryLis()
  },
  methods: {
    getHistoryLis () {
      this.historyList = storage.get('KEYWORDS')
      console.log(this.historyList)
    },
    delAll () {
      storage.remove('KEYWORDS')
      this.historyList = []
    },
    delItem (item) {
      this.historyList = this.historyList.filter((ele) => ele !== item)
      console.log(this.historyList)
      storage.set('KEYWORDS', this.historyList)
    },
    toResultPage (val) {
      // console.log(val)
      this.$emit('historyToResultPage', val)
      // console.log(11)
    }
  }
}
</script>

<style></style>
