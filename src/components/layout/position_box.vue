<template>
  <div class="position-box">
    <slot></slot>
  </div>
</template>

<script>
export default {
  computed: {
   
  }
}
</script>

<style lang="scss" scoped>
.position-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  overflow-y: auto;
}
</style>
