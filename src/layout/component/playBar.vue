<template>
  <div class="play-bar-container">
    播放条
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'playBar'
})
</script>

<style scoped lang="scss">
  .play-bar-container{
    height: 80px;
    background: #fff;
  }
</style>
