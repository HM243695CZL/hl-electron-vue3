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
      <el-popover placement="bottom-start" trigger="click" width="1000">
        <template #reference>
          <div class="all-list">
            {{state.currentTag ? state.currentTag : '全部歌单'}}
            <el-icon>
              <ele-ArrowRight />
            </el-icon>
          </div>
        </template>
        <div class="all-song-list">
          <div class="title">
            <div class="item">全部歌单</div>
          </div>
          <div class="category-list">
            <div class="category-item" v-for="item in state.allSongList" :key="item.name">
              <div class="type">
                <SvgIcon :name="item.icon" size="16" />
                {{item.name}}
              </div>
              <div class="tag-list">
                <div class="tag" v-for="ele in item.list" :key="ele">
                  <div :class="['text', ele.name === state.currentTag ? 'active' : '']" @click="changeTag(ele)">
                    {{ele.name}}
                    <span class="is-hot" v-if="ele.hot">HOT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-popover>
      <div class="hot-item-box">
        <div :class="['item', state.currentTag === item.name ? 'active' : '']"
             @click="changeTag(item)"
             v-for="item in state.hotList" :key="item.id">
          {{item.name}}
        </div>
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
  import {getCateListApi, getHotCateListApi} from '../../../../api/playlist';

  const state = reactive({
    concentrationMap: {} as any,
    hotList: [] as any,
    currentTag: '',
    songList: [] as any,
    allSongList: [] as any
  })
  const getConcentration = () => {
    getAction(getConcentrationApi + '?limit=1', '').then((res: any) => {
      if (res.code === StatusEnum.SUCCESS) {
        state.concentrationMap = res.playlists[0];
      }
    })
  };
  const getHotCateList = () => {
    getAction(getHotCateListApi , '').then((res: any) => {
      if (res.code === StatusEnum.SUCCESS) {
        state.hotList = res.tags;
      }
    });
  };
  const getSongList = () => {
    getAction(getConcentrationApi + '?cat=' + (state.currentTag ? state.currentTag : '全部') + '&limit=37', '').then((res: any) => {
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
  };
  const getCateList = () => {
    getAction(getCateListApi, '').then((res: any) => {
      if (res.code === StatusEnum.SUCCESS) {
        let categoriesList = [] as any;
        const iconList = ['fa fa-life-ring', 'fa fa-shekel', 'ele-CoffeeCup', 'fa fa-smile-o', 'ele-Menu']
        for (const o in res.categories) {
          categoriesList.push({
            category: o,
            name: res.categories[o],
            list: [],
          });
        }
        iconList.map((item, index) => {
          categoriesList[index].icon = item;
        });
        res.sub.map((item: any) => {
          categoriesList.map((ele: any) => {
            if (item.category + '' === ele.category) {
              ele.list.push(item);
            }
          });
        });
        state.allSongList = categoriesList;
      }
    })
  };
  onMounted(() => {
    getConcentration();
    getHotCateList();
    getSongList();
    getCateList();
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
      justify-content: space-between;
      align-items: center;
      margin: 20px 0;
      .all-list{
        padding: 3px 6px;
        border-radius: 15px;
        border: 1px solid #dcdcdc;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      .hot-item-box{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .item{
          padding: 5px 10px;
          cursor: pointer;
          &:hover{
            color: #ec4141;
          }
          &.active{
            color: #ec4141;
          }
        }
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
  .all-song-list{
    .title{
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;
      color: #ec4141;
      cursor: pointer;
    }
    .category-list{
      padding: 20px;
      .category-item{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-bottom: 10px;
        .type{
          color: #999;
          width: 120px;
          padding: 5px;
          display: flex;
          align-items: center;
          i{
            margin-right: 5px;
          }
        }
        .tag-list{
          flex: 1;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;
          .tag{
            width: 15%;
            cursor: pointer;
            &:hover{
              color: #ec4141;
            }
            .text{
              padding: 5px 15px;
              border-radius: 15px;
              width: fit-content;
              position: relative;
              &.active{
                color: #ec4141;
                background: #fef5f5;
              }
              .is-hot{
                position: absolute;
                top: 0;
                right: -10px;
                transform: scale(.5);
                color: #ec4141;
              }
            }
          }
        }
      }
    }
  }
</style>
