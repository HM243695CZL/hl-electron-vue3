<template>
  <div class="carousel-list-container">
    <el-carousel :interval="6000" type="card" height="200px">
      <el-carousel-item v-for="item in state.bannerList" :key="item.encodeId">
        <div class="banner-list">
          <img class="carousel-img" :src="item.imageUrl" alt="">
          <div class="type-title">{{ item.typeTitle }}</div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts" setup>
import {getAction} from '../../../../api/common';
import {getBannerListApi} from '../../../../api/banner';
import {StatusEnum} from '../../../../common/status.enum';
import {onMounted, reactive} from 'vue';

const state = reactive({
  bannerList: [] as any
});
const getBannerList = () => {
  getAction(getBannerListApi + '?type=0', '').then((res: any) => {
    if (res.code === StatusEnum.SUCCESS) {
      state.bannerList = res.banners;
    }
  });
};
onMounted(() => {
  getBannerList();
});
</script>

<style scoped lang="scss">
  .carousel-list-container{
    .banner-list{
      position: relative;
      height: 200px;
      border-radius: 10px;
      overflow: hidden;
      .carousel-img{
        display: block;
        width: 100%;
        height: 100%;
      }
      .type-title{
        position: absolute;
        right: 0;
        bottom: 0;
        padding: 5px 10px;
        background: #cc4a4a;
        color: #fff;
        border-radius: 5px 5px 0 0;
      }
    }
  }
</style>
