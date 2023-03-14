<template>
  <div class="recommend-container">
    <h2>个性推荐</h2>
    <CarouselList />
    <h2>
      <span class="title-song-list">
        推荐歌单
        <el-icon>
          <ele-ArrowRight />
        </el-icon>
      </span>
    </h2>
    <RecommendSongList />
    <h2>
      <span class="title-song-list">
        最新音乐
        <el-icon>
          <ele-ArrowRight />
        </el-icon>
      </span>
    </h2>
    <NewSongList />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import CarouselList from './components/recommend/carouselList.vue';
import RecommendSongList from './components/recommend/recommendSongList.vue';
import NewSongList from './components/recommend/newSongList.vue';

export default defineComponent({
  name: 'recommend',
  components: {
    CarouselList,
    RecommendSongList,
    NewSongList
  },
  setup() {
  }
})
</script>

<style scoped lang="scss">
.recommend-container{
  .title-song-list{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
  }
}
</style>
