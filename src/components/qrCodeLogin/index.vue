<template>
  <el-dialog
    v-model="state.visible"
    width="320"
    :modal="false"
    :close-on-click-modal="false"
    @close="closeDialog"
  >
    <div class="qr-code-container">
      <h2>扫码登录</h2>
      <div class="img">
        <img :src="state.imgSrc" alt="">
      </div>
      <div class="status-tip">
        {{state.tipText}}
      </div>
      <div class="tip">
        使用<span>网易云音乐APP</span>扫码登录
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { reactive} from 'vue';
  import { Session } from '../../utils/storage';
  import {checkScanQrCodeApi, createQrCodeApi, createQrCodeKeyApi, getLoginStatusApi} from '../../api/login';
  import {getAction, postAction} from '../../api/common';

  const emits = defineEmits([
      'getUserStatus'
  ]);
  const state = reactive({
    visible: false,
    timestamp: '' as any,
    imgSrc: '',
    timer: null as any,
    tipText: ''
  });
  const openDialog = () => {
    state.visible = true;
    login();
  };
  const closeDialog = () => {
    clearInterval(state.timer);
    state.timer = null;
  };
  const getLoginStatus = async (cookie = '') => {
    await postAction(getLoginStatusApi + '?timestamp=' + Date.now(), {
      cookie
    });
  };
  const getCheckStatus = async (key: string) => {
    return await getAction(checkScanQrCodeApi + '?key=' + key + '&timestamp=' + Date.now(), '');
  };
  const login = async () => {
    state.timestamp = new Date().getTime();
    const cookie = Session.get('cookie');
    await getLoginStatus(cookie);
    const res = await getAction(createQrCodeKeyApi + '?timestamp=' + Date.now(), '');
    const key = res.data.unikey;
    const result = await getAction(createQrCodeApi + '?key=' + key + '&qrimg=true&timestamp=' + Date.now(), '');
    state.imgSrc = result.data.qrimg;
    state.timer = setInterval(async () => {
      const statusRes = await getCheckStatus(key) as any;
      if (statusRes.code === 800) {
        state.tipText = statusRes.message;
        clearInterval(state.timer);
      }
      if (statusRes.code === 803) {
        clearInterval(state.timer);
        state.tipText = '登录成功';
        state.visible = false;
        emits('getUserStatus');
        await getLoginStatus(statusRes.cookie);
        Session.set('cookie', statusRes.cookie);
      }
    }, 3000);
  };
  defineExpose({
    openDialog
  });
</script>

<style scoped lang="scss">
  .qr-code-container{
    text-align: center;
    .img{
      padding: 10px 0;
      margin: 0 auto;
      width: 180px;
      height: 180px;
      border: 1px solid #ccc;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .status-tip{
      padding: 10px 0;
    }
    .tip{
      span{
        color: #126ac6;
      }
    }
  }
</style>
