<template>
  <div class="recommend-container">
    <h2>推荐</h2>
    <el-carousel :interval="6000" type="card" height="200px">
      <el-carousel-item v-for="item in bannerList" :key="item.encodeId">
        <div class="banner-list">
          <img class="carousel-img" :src="item.imageUrl" alt="">
          <div class="type-title">{{item.typeTitle}}</div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, toRefs} from 'vue';
import {getAction} from '../../api/common';
import {getBannerListApi} from '../../api/banner';
import {StatusEnum} from '../../common/status.enum';

export default defineComponent({
  name: 'recommend',
  setup() {
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
    return {
      ...toRefs(state),
    }
  }
})
</script>

<style scoped lang="scss">
.recommend-container{
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
    }
  }
}
</style>
