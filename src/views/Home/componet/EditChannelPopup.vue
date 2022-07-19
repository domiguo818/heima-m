<template>
  <div>
    <van-popup
      v-model="show"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
      close-icon-position="top-left"
    >
      <div class="popupMain">
        <div class="my-channel">
          <van-cell title="推荐频道">
            <van-button
              size="small"
              round
              class="edit-btn"
              @click="isEdit = !isEdit"
              >{{ isEdit ? '完成' : '编辑' }}</van-button
            >
          </van-cell>
          <van-grid :border="false" gutter="10px">
            <van-grid-item
              :text="item.name"
              v-for="(item, index) in channeList"
              :key="item.id"
              :class="{ 'active-channel': item.name === '推荐' }"
              @click="delMyChannel(item, index)"
            >
              <template #icon
                ><van-icon name="cross" v-show="isEdit && item.name !== '推荐'"
              /></template>
            </van-grid-item>
          </van-grid>
        </div>
        <div class="recommend-channel">
          <van-cell title="我的频道"> </van-cell>
          <van-grid>
            <van-grid-item
              :text="item.name"
              icon="plus"
              v-for="item in recommandChannel"
              :key="item.id"
              @click="addChannel(item)"
            ></van-grid-item>
          </van-grid>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  data () {
    return {
      show: false,
      allChannels: [],
      isEdit: false
    }
  },
  props: {
    channeList: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getAllChannels()
    // console.log(this.recommandChannel)
  },
  methods: {
    async getAllChannels () {
      const { data } = await getAllChannels()

      this.allChannels = data.data.channels
      // console.log(this.allChannels)
    },
    delMyChannel (item, index) {
      if (this.isEdit && item.name !== '推荐') {
        return this.$emit('delchannel', item.id)
      }
      if (!this.isEdit) {
        this.$emit('changeactive', index)
        this.show = false
      }
    },
    addChannel (channel) {
      this.$emit('addChannels', { ...channel })
    }
  },
  computed: {
    recommandChannel () {
      return this.allChannels.filter((item) => {
        return !this.channeList.find((i) => i.id === item.id)
      })
    }
  }
}
</script>

<style scoped lang="less">
.active-channel {
  :deep(.van-grid-item__text) {
    color: red;
  }
}

.popupMain {
  padding-top: 100px;
  .edit-btn {
    color: red;
    padding: 0 30px;
    height: 48px;
    border: 00.02667rem solid red;
  }
  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;
      background: #eee;

      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          line-height: 0.32rem;
          font-size: 12px;
        }
      }
    }
  }
  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;
      background: #eee;

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
