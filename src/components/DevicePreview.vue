<template>
  <div class="device-preview">
    <iframe class="inner" src="https://localhost:5173"></iframe>
  </div>
</template>

<script lang="ts" setup>
</script>

<style>
.device-preview {
  position: relative;
  margin: 0 auto;
  border: 8px solid #333;
  border-radius: 24px;
  height: 90vh;
  aspect-ratio: 9 / 19.5;
  box-shadow: 5px 5px 10px 0px #0003;

  .inner {
    border: none;
    border-radius: 16px;
    overflow: hidden;
    width: 100%;
    height: 100%;
    background: white;
  }
}
</style>