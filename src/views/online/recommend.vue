<template>
  <div class="recommend-container">
    <div class="tab-list">
      <div :class="['item', item.value === currentTab ? 'active' : '']"
           @click="changeTab(item)"
           v-for="item in tabList" :key="item.value">
        {{item.text}}
      </div>
    </div>
    <Component :is="currentTab"></Component>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue';
import PersonRecommend from './components/recommend/personRecommend.vue';
import SongList from './components/recommend/songList.vue';
import RankList from './components/recommend/rankList.vue';
export default defineComponent({
  name: 'recommend',
  components: {
    PersonRecommend,
    SongList,
    RankList
  },
  setup() {
    const state = reactive({
      tabList: [
        { text: '个性推荐', value: 'personRecommend' },
        { text: '歌单', value: 'songList' },
        { text: '排行榜', value: 'rankList'}
      ],
      currentTab: 'personRecommend'
    });
    const changeTab = (data: any) => {
      if (data.value === state.currentTab) {
        return false;
      }
      state.currentTab = data.value;
    }
    return {
      ...toRefs(state),
      changeTab
    }
  }
})
</script>

<style scoped lang="scss">
.recommend-container{
  padding-bottom: 20px;
  .tab-list{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 999;
    margin-top: -15px;
    .item{
      padding: 10px 5px;
      border-bottom: 2px solid transparent;
      margin-right: 10px;
      cursor: pointer;
      &.active{
        border-color: #126ac6;
        color: #126ac6;
      }
      &:hover{
        border-color: #126ac6;
        color: #126ac6;
      }
    }
  }
}
</style>
