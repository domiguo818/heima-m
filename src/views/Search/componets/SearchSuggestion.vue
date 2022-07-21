<template>
  <div>
    <van-cell
      v-for="(item, index) in heightlightData"
      :key="item"
      @click="toResultPage(index)"
    >
      <template #icon>
        <van-icon name="search" class="search-icon" />
      </template>
      <template #title><span v-html="item"></span></template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api'
// import { EventBus } from './event-bus'
export default {
  data () {
    return {
      SuggestionList: []
    }
  },
  computed: {
    heightlightData () {
      const reg = new RegExp(this.keywords, 'ig')
      return this.SuggestionList.map((str) =>
        str.replace(reg, (e) => `<span style="color:red">${e}</span>`)
      )
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler () {
        this.getSearchSuggestion()
      }
    }
  },
  methods: {
    async getSearchSuggestion () {
      try {
        // console.log(111111111)
        const res = await getSearchSuggestion(this.keywords)
        // console.log(res)
        this.SuggestionList = res.data.data.options.filter(Boolean)
        if (this.SuggestionList.length === 0) {
          this.$toast.fail('暂无建议')
        }
      } catch (error) {
        this.$toast.fail(error)
      }
    },
    toResultPage (index) {
      const keywords = this.SuggestionList[index]
      // console.log(11)
      this.$emit('ResultPage', keywords)
    }
  }
}
</script>

<style scoped lang="less">
.search-icon {
  margin-top: 10px;
}
</style>
