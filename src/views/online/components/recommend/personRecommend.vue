<template>
  <div class="person-recommend-container">
    <CarouselList/>
    <h2>
      <span class="title-song-list">
        推荐歌单
        <el-icon>
          <ele-ArrowRight/>
        </el-icon>
      </span>
    </h2>
    <RecommendSongList/>
    <h2>
      <span class="title-song-list">
        最新音乐
        <el-icon>
          <ele-ArrowRight/>
        </el-icon>
      </span>
    </h2>
    <NewSongList/>
    <h2>
      <span class="title-song-list">
        独家放送
        <el-icon>
          <ele-ArrowRight/>
        </el-icon>
      </span>
    </h2>
    <PrivateContentList/>
    <h2>
      <span class="title-song-list">
        推荐MV
        <el-icon>
          <ele-ArrowRight/>
        </el-icon>
      </span>
    </h2>
    <RecommendMvList/>
  </div>
</template>

<script lang="ts" setup>
import CarouselList from './carouselList.vue';
import RecommendSongList from './recommendSongList.vue';
import NewSongList from './newSongList.vue';
import PrivateContentList from './privateContentList.vue';
import RecommendMvList from './recommendMvList.vue';
</script>

<style scoped lang="scss">
  .person-recommend-container{
    .title-song-list{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
      width: fit-content;
    }
  }
</style>
