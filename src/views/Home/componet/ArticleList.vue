<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="loadNextPage" success-text="刷新成功">
      <van-list
        @load="loadNextPage"
        v-model="loading"
        :finished="isFinished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="出错了，请重新加载！"
      >
        <ArticleItem
          v-for="(item, index) in articles"
          :key="index"
          :articelInfo="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  components: {
    ArticleItem
  },
  data () {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      isFinished: false,
      error: false,
      isLoading: false
    }
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  created () {
    this.getArticleList()
  },
  methods: {
    async getArticleList () {
      try {
        const { data } = await getArticleList(this.id, +new Date())
        this.pre_timestamp = data.data.pre_timestamp
        this.articles = data.data.results
        // console.log(data)
      } catch (error) {
        const status = error.response.status
        if (status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败，请重新刷新')
        }
      }
    },
    async loadNextPage () {
      // console.log(111111111)
      try {
        if (Math.random() < 0.4) {
          throw new Error('错误了')
        }
        const { data } = await getArticleList(this.id, this.pre_timestamp)
        if (!data.data.pre_timestamp) {
          this.isFinished = true
        }
        // console.log(data)
        if (this.isLoading) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }

        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.isLoading = false
      }
    }
  }
}
</script>

<style></style>
