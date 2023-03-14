<template>
  <div class="recommend-mv-list-container">
    <el-row :gutter="20">
      <el-col :span="8" v-for="item in state.dataList" :key="item.id">
        <div class="item">
          <div class="img-box">
            <img :src="item.picUrl" alt="">
            <div class="play-count">
              <el-icon color="#fff" size="20">
                <ele-CaretRight/>
              </el-icon>
              {{(item.playCount + '').length > 4 ? (item.playCount + '').slice(0, 4) + '万' : item.playCount}}
            </div>
          </div>
          <div class="name">{{ item.name }}</div>
          <div class="artist-name">{{item.artistListName.join('/')}}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive} from 'vue';
import {getAction} from '../../../../api/common';
import {getRecommendMvApi} from '../../../../api/personalized';
import {StatusEnum} from '../../../../common/status.enum';

const state = reactive({
  dataList: [] as any
});
const getMvList = () => {
  getAction(getRecommendMvApi, '').then((res: any) => {
    if (res.code === StatusEnum.SUCCESS) {
      state.dataList = res.result;
      state.dataList.map((item: any) => {
        item.artistListName = [];
        item.artists.map((ele: any) => {
          item.artistListName.push(ele.name);
        });
      });
    }
  });
};
onMounted(() => {
  getMvList();
});
</script>

<style scoped lang="scss">
.recommend-mv-list-container {
  margin: 20px 0;
  .item {
    .img-box {
      position: relative;

      img {
        display: block;
        width: 100%;
        height: auto;
        border-radius: 10px;
      }

      .play-count {
        position: absolute;
        top: 10px;
        right: 10px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .name {
      margin: 10px 0;
    }
    .artist-name{
      color: #999;
    }
  }
}
</style>
