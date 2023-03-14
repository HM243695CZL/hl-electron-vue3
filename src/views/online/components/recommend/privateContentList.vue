<template>
  <div class="private-content-container">
    <el-row :gutter="20">
      <el-col :span="8" v-for="item in state.dataList" :key="item.id">
        <div class="item">
          <div class="img-box">
            <img :src="item.picUrl" alt="">
            <div class="circle-box">
              <el-icon color="#fff" size="20">
                <ele-CaretRight/>
              </el-icon>
            </div>
          </div>
          <div class="name">{{ item.name }}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive} from 'vue';
import {getAction} from '../../../../api/common';
import {privateContentApi} from '../../../../api/personalized';
import {StatusEnum} from '../../../../common/status.enum';

const state = reactive({
  dataList: [] as any
});
const getPrivateContentList = () => {
  getAction(privateContentApi, '').then((res: any) => {
    if (res.code === StatusEnum.SUCCESS) {
      state.dataList = res.result;
    }
  })
};
onMounted(() => {
  getPrivateContentList();
});
</script>

<style scoped lang="scss">
.private-content-container {
  margin: 20px 0;

  .item {
    cursor: pointer;
    .img-box {
      position: relative;

      img {
        display: block;
        width: 100%;
        height: auto;
        border-radius: 10px;
      }

      .circle-box {
        position: absolute;
        top: 10px;
        left: 10px;
        width: 30px;
        height: 30px;
        background: rgba(0, 0, 0, .2);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid rgba(255, 255, 255, .3);
      }
    }

    .name {
      margin-top: 10px;
    }
  }
}
</style>
