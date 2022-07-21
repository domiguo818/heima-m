<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell-group>
        <van-cell
          :title="item.title"
          v-for="item in resultsList"
          :key="item.art_id"
        />
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
// import { EventBus } from './event-bus'
import { getSearchResult } from '@/api/'
import { storage } from '@/utils/storage'
export default {
  data () {
    return {
      finished: false,
      loading: false,
      error: false,
      page: 1,
      historyList: storage.get('KEYWORDS') || []
    }
  },

  props: {
    resultsList: {
      type: Array,
      required: true
    },
    keywords: {
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad () {
      console.log(11)
      // this.$emit('onLoad')
      this.page++
      const res = await getSearchResult(this.keywords, this.page)
      this.$parent.resultsList.push(...res.data.data.results)
      this.loading = false
      if (res.data.data.results.filter(Boolean).length === 0) {
        this.finished = true
      }
      // console.log(res)
      // this.finished = true
    },
    setKeywords () {
      const exist = this.historyList.indexOf(this.keywords)
      if (exist > -1) {
        const historyList = this.historyList.filter(
          (item) => item !== this.keywords
        )
        historyList.unshift(this.keywords)
        storage.set('KEYWORDS', historyList)
      } else {
        this.historyList.unshift(this.keywords)
        storage.set('KEYWORDS', this.historyList)
      }
    }
  },
  created () {
    this.setKeywords()
  }
}
</script>

<style></style>
