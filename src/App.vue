<template>
  hl243695czyn
  <el-button @click="clickSetTitle">setTitle</el-button>
</template>

<script setup lang="ts">
  const clickSetTitle = () => {
    window.electronAPI.setTitle('hl243695czyn-love');
  }
</script>

<style>

</style>
