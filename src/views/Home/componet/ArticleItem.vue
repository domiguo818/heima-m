<template>
  <div>
    <van-cell-group>
      <van-cell
        :title="articelInfo.title"
        v-if="articelInfo.cover.type === 0"
        :label="articleDesc"
      />

      <van-cell
        :title="articelInfo.title"
        v-if="articelInfo.cover.type === 1"
        :label="articleDesc"
      >
        <van-image
          width="3rem"
          height="2rem"
          :src="articelInfo.cover.images[0]"
        />
      </van-cell>
      <van-cell :title="articelInfo.title" v-if="articelInfo.cover.type === 3">
        <template #label>
          <div>
            <van-image
              v-for="(item, index) in articelInfo.cover.images"
              :key="index"
              width="3rem"
              height="2rem"
              :src="item"
            />
          </div>
          <span>{{ articleDesc }}</span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    articelInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    articleDesc () {
      const art = this.articelInfo
      const time = dayjs(art.pubdate).fromNow()
      return `${art.aut_name} ${art.comm_count}评论 ${time}`
    }
  }
}
</script>

<style></style>
