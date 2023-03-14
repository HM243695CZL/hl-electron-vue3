<template>
  <div class="song-list-container">
    <div class="concentration-info">
      <img :src="state.concentrationMap.coverImgUrl" alt="">
      <div class="info">
        <div class="tag">
          <el-icon>
            <ele-Trophy />
          </el-icon>
          精品歌单
        </div>
        <div class="name">{{state.concentrationMap.name}}</div>
        <div class="description">{{state.concentrationMap.copywriter}}</div>
      </div>
    </div>
    <div class="hot-tag">
      <div :class="['item', state.currentTag === item.name ? 'active' : '']"
           @click="changeTag(item)"
           v-for="item in state.hotList" :key="item.id">{{item.name}}</div>
      <div class="all-list">
        {{state.currentTag ? state.currentTag : '全部歌单'}}
        <el-icon>
          <ele-ArrowRight />
        </el-icon>
      </div>
    </div>
    <div class="song-list">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in state.songList" :key="item.id">
          <div class="item">
            <div class="img-box">
              <img :src="item.coverImgUrl" alt="">
              <div class="creator">
                <el-icon>
                  <ele-User />
                </el-icon>
                {{item.creator.nickname}}
              </div>
              <div class="play-count">
                <el-icon>
                  <ele-CaretRight />
                </el-icon>
                {{(item.playCount + '').length > 4 ? (item.playCount + '').slice(0, 4) + '万' : item.playCount}}
              </div>
            </div>
            <div class="name">{{item.name}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {getAction} from '../../../../api/common';
  import {getConcentrationApi} from '../../../../api/top';
  import {onMounted, reactive} from 'vue';
  import {StatusEnum} from '../../../../common/status.enum';
  import {getHotCateListApi} from '../../../../api/playlist';

  const state = reactive({
    concentrationMap: {} as any,
    hotList: [] as any,
    currentTag: '',
    songList: [] as any
  })
  const getConcentration = () => {
    getAction(getConcentrationApi + '?limit=1', '').then((res: any) => {
      if (res.code === StatusEnum.SUCCESS) {
        state.concentrationMap = res.playlists[0];
      }
    })
  };
  const getCateList = () => {
    getAction(getHotCateListApi , '').then((res: any) => {
      if (res.code === StatusEnum.SUCCESS) {
        state.hotList = res.tags;
      }
    });
  };
  const getSongList = () => {
    getAction(getConcentrationApi + '?cat=' + (state.currentTag ? state.currentTag : '全部'), '').then((res: any) => {
      if (res.code === StatusEnum.SUCCESS) {
        state.songList = res.playlists.slice(1);
      }
    });
  };
  const changeTag = (data: any) => {
    if (data.name === state.currentTag) {
      return false;
    }
    state.currentTag = data.name;
    getSongList();
  }
  onMounted(() => {
    getConcentration();
    getCateList();
    getSongList();
  })
</script>

<style scoped lang="scss">
  .song-list-container{
    margin: 20px 0;
    .concentration-info{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 20px;
      border-radius: 10px;
      background: linear-gradient(to right, #a99984, #563727, #a48f77);
      img{
        display: block;
        width: 120px;
        height: auto;
        border-radius: 5px;
      }
      .info{
        margin-left: 10px;
        .tag{
          border: 1px solid #e6aa5a;
          padding: 5px 12px;
          color: #e6aa5a;
          border-radius: 15px;
          width: fit-content;
          margin-bottom: 10px;
        }
        .name{
          color: #fff;
          font-size: 20px;
          margin-bottom: 10px;
        }
        .description{
          color: #FFFFFF99;
        }
      }
    }
    .hot-tag{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 20px 0;
      .item{
        padding: 5px 10px;
        cursor: pointer;
        &:hover{
          color: #126ac6;
        }
        &.active{
          color: #126ac6;
        }
      }
      .all-list{
        padding: 3px 6px;
        border-radius: 15px;
        border: 1px solid #dcdcdc;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .song-list{
      .item{
        cursor: pointer;
        .img-box{
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          img{
            width: 100%;
            display: block;
            height: auto;
          }
          .creator{
            position: absolute;
            bottom: 10px;
            left: 10px;
            color: #fff;
          }
          .play-count{
            position: absolute;
            top: 5px;
            right: 5px;
            color: #fff;
          }
        }
        .name{
          margin: 10px 0;
        }
      }
    }
  }
</style>
