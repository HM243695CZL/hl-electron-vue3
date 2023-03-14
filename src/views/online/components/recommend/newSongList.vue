<template>
  <div class="new-song-list-container">
    <el-row :gutter="20">
      <el-col :span="8" v-for="item in state.dataList" :key="item.id">
        <div class="item">
          <div class="thumbnail">
            <img :src="item.picUrl" alt="">
            <div class="play-icon">
              <div class="white-circle">
                <el-icon color="#f40" size="30">
                  <ele-CaretRight />
                </el-icon>
              </div>
            </div>
          </div>
          <div class="info">
            <div class="song-name">{{item.name}}</div>
            <div class="artist">{{item.artistsName.join('/')}}</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive} from 'vue';
  import {getAction} from '../../../../api/common';
  import {getNewSongApi} from '../../../../api/personalized';
  import {StatusEnum} from '../../../../common/status.enum';

  const state = reactive({
    dataList: [] as any,
  });
  const getNewSongList = () => {
    getAction(getNewSongApi + '?limit=12', '').then((res: any) => {
      if (res.code === StatusEnum.SUCCESS) {
        state.dataList = res.result;
        state.dataList.map((item: any) => {
          item.artistsName = [];
          item.song.artists.map((ele: any) => {
            item.artistsName.push(ele.name);
          })
        });
      }
    })
  };
  onMounted(() => {
    getNewSongList();
  });
</script>

<style scoped lang="scss">
  .new-song-list-container{
    margin: 20px 0;
    .item{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 20px;
      cursor: pointer;
      border-radius: 10px;
      &:hover{
        background: #f1f1f1;
      }
      .thumbnail{
        width: 20%;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        img{
          display: block;
          width: 100%;
          height: auto;
        }
        .play-icon{
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          .white-circle{
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
      .info{
        margin-left: 10px;
        .song-name{
          margin-bottom: 20px;
        }
        .artist{
          color: #999;
        }
      }
    }
  }
</style>
