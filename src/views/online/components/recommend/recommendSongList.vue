<template>
  <div class="recommend-song-list-container">
    <el-row :gutter="20">
      <el-col :span="4" v-for="(item, index) in state.dataList" :key="item.id">
        <div class="item">
          <div class="img-box">
            <img :class="[index === 0 ? 'item-img' : '']" :src="item.picUrl" alt="">
            <div class="current-date" v-if="index === 0">
              <span>{{state.currentDate}}</span>
            </div>
          </div>
          <div class="play-count" v-if="index !== 0">
            <el-icon>
              <ele-CaretRight />
            </el-icon>
            {{(item.playCount + '').length > 4 ? (item.playCount + '').slice(0, 4) + '万' : item.playCount}}
          </div>
          <div class="video-icon" v-if="index !== 0">
            <el-icon>
              <ele-VideoPlay />
            </el-icon>
          </div>
          <div class="name">
            {{item.name}}
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive} from 'vue';
  import {getAction} from '../../../../api/common';
  import {personalizedBaseApi} from '../../../../api/personalized';
import {StatusEnum} from '../../../../common/status.enum';

  const state = reactive({
    dataList: [] as any,
    currentDate: new Date().getDate()
  });
  const getPersonalized = () => {
    getAction(personalizedBaseApi + '?limit=12', '').then((res: any) => {
      if (res.code === StatusEnum.SUCCESS) {
        state.dataList = res.result;
        state.dataList.unshift({
          id: 1,
          picUrl: state.dataList[state.dataList.length - 1].picUrl,
          name: '今日歌曲推荐',
          playCount: ''
        });
        state.dataList.pop();
      }
    })
  };
  onMounted(() => {
    getPersonalized();
  });
</script>

<style scoped lang="scss">
  .recommend-song-list-container{
    .item{
      position: relative;
      margin-top: 10px;
      margin-bottom: 20px;
      cursor: pointer;
      &:hover{
        .video-icon{
          opacity: 1;
        }
      }
      .img-box{
        position: relative;
        .current-date{
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 30px;
          color: #fff;
          font-weight: 700;
          padding: 10px;
          span{
            display: inline-block;
            padding: 10px;
            border: 1px dashed #fff;
            border-radius: 5px;
          }
        }
        img{
          display: block;
          width: 100%;
          height: auto;
          border-radius: 5px;
        }
      }
      .item-img{
        -webkit-filter: blur(6px);
      }
      .play-count{
        position: absolute;
        top: 5px;
        right: 5px;
        color: #fff;
      }
      .video-icon{
        opacity: 0;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #fff;
        position: absolute;
        right: 5px;
        top: 50%;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        .el-icon{
          color: #ec4141;
        }
      }
      .name{
        padding: 5px 0;
      }
    }
  }
</style>
