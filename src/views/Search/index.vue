<template>
  <div>
    <form action="/">
      <van-search
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="backToPrePage"
        background="#3296fa"
        class="search"
        @focus="visibleSearchSuggestion"
        @onLoad="onLoadFn"
      />
    </form>
    <!-- <SearchHistory></SearchHistory>
    <SearchResult></SearchResult>
    <SearchSuggestion></SearchSuggestion> -->
    <component
      :is="componentName"
      :keywords="keywords"
      :resultsList="resultsList"
      @ResultPage="ResultPageFn"
      @historyToResultPage="HistoryToResultPageFn"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './componets/SearchHistory.vue'
import SearchResult from './componets/SearchResult.vue'
import SearchSuggestion from './componets/SearchSuggestion.vue'
import { getSearchResult } from '@/api/'

export default {
  data () {
    return {
      keywords: '',
      isShowSearchResult: false,
      resultsList: []
    }
  },

  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  methods: {
    // onSearch () {},
    backToPrePage () {
      this.$router.go(-1)
    },
    visibleSearchSuggestion () {
      this.isShowSearchResult = false
    },
    onSearch () {
      this.isShowSearchResult = true
      this.getSearchResult()
    },
    async getSearchResult () {
      const { data } = await getSearchResult(this.keywords, 1)
      this.resultsList = data.data.results
      console.log(this.resultsList)
    },
    ResultPageFn (val) {
      console.log(val)
      this.keywords = val
      this.isShowSearchResult = true
      this.getSearchResult()
      // this.historyList.push(val)
      // storage.set('KEYWORDS', this.historyList)
      // this.$set(this.componentName, this.componentName, 'SearchResult')
    },
    onLoadFn () {
      this.getSearchResult()
    },
    HistoryToResultPageFn (val) {
      this.keywords = val
      this.isShowSearchResult = true
      this.getSearchResult()
    }
  },
  computed: {
    componentName () {
      if (this.keywords.trim() === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  }
}
</script>

<style scoped lang="less">
.search [role='button'] {
  color: #eee;
}
</style>
