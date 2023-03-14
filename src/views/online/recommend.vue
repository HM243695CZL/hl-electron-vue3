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
    <h2>
      <span class="title-song-list">
        独家放送
        <el-icon>
          <ele-ArrowRight />
        </el-icon>
      </span>
    </h2>
    <PrivateContentList />
    <h2>
      <span class="title-song-list">
        推荐MV
        <el-icon>
          <ele-ArrowRight />
        </el-icon>
      </span>
    </h2>
    <RecommendMvList />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import CarouselList from './components/recommend/carouselList.vue';
import RecommendSongList from './components/recommend/recommendSongList.vue';
import NewSongList from './components/recommend/newSongList.vue';
import PrivateContentList from './components/recommend/privateContentList.vue';
import RecommendMvList from './components/recommend/recommendMvList.vue';

export default defineComponent({
  name: 'recommend',
  components: {
    CarouselList,
    RecommendSongList,
    NewSongList,
    PrivateContentList,
    RecommendMvList
  },
  setup() {
  }
})
</script>

<style scoped lang="scss">
.recommend-container{
  padding-bottom: 20px;
  .title-song-list{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
  }
}
</style>
