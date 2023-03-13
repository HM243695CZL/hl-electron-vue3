<template>
	<div class="layout-navbars-breadcrumb-user">
    <div class="login-state" @click="showQrCodeLogin()">
      <el-icon v-if="!userInfo" class="user-icon" color="#fff">
        <ele-User />
      </el-icon>
      <div v-if="userInfo" class="user-avatar">
        <img :src="userInfo.avatarUrl" alt="">
      </div>
      {{userInfo ? userInfo.nickname : '未登录'}}
    </div>
    <div class="line"></div>
		<el-icon color="#fff" title="最小化" @click="setScreen('min')">
			<ele-Minus />
		</el-icon>
		<el-icon color="#fff" title="最大化" @click="setScreen('max')">
			<ele-FullScreen />
		</el-icon>
		<el-icon color="#fff" title="关闭" @click="setScreen('close')">
			<ele-Close />
		</el-icon>
	</div>
  <QrCodeModal ref="qrCodeModalRef" @getUserStatus="getUserStatus" />
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref, toRefs} from 'vue';
import QrCodeModal from '/@/components/qrCodeLogin/index.vue';
import {getAction, postAction} from '../../../api/common';
import {getLoginStatusApi} from '../../../api/login';
import {Session} from '../../../utils/storage';
import {getUserInfoApi} from '../../../api/user';

export default defineComponent({
	name: 'layoutBreadcrumbUser',
  components: {
    QrCodeModal
  },
	setup() {
    const qrCodeModalRef = ref();
    const state = reactive({
      userInfo: {} as any,
    });
		const setScreen = (value: string) => {
			window.electronAPI.setScreen(value);
		};
    const showQrCodeLogin = () => {
      if (state.userInfo) {
        getAction(getUserInfoApi + '?uid=' + state.userInfo.userId, '').then(res => {
          console.log(res);
        });
      } else {
        qrCodeModalRef.value.openDialog();
      }
    };
    const getUserStatus = () => {
      postAction(getLoginStatusApi + '?timestamp=' + Date.now(), {
        cookie: Session.get('cookie')
      }).then(res => {
        if (res.data.profile) {
          state.userInfo = res.data.profile;
          Session.set('userInfo', res.data.profile);
        }
      })
    };
    onMounted(() => {
      getUserStatus();
    });
		return {
			setScreen,
      showQrCodeLogin,
      qrCodeModalRef,
      getUserStatus,
      ...toRefs(state)
		};
	},
});
</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb-user {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .login-state{
    color: #fff;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    .user-avatar{
      width: 50px;
      height: 50px;
      padding: 10px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .line{
    width: 1px;
    height: 20px;
    background: #fff;
    margin: 0 15px;
  }
	.el-icon{
		margin-right: 20px;
		font-size: 20px;
		cursor: pointer;
    &:hover{
      color: #126ac6;
    }
	}
  .user-icon{
    margin-right: 0;
  }
}
</style>
