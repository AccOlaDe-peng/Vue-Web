<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<script setup>
// 使用组合式API不需要导出默认对象
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
}

body {
  background-color: #f5f5f5;
  color: #333;
  line-height: 1.6;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
