<template>
  <div id="app" style="max-width: 454px;">
    <position-box>
      <router-view/>
    </position-box>
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

#app {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0) scale3d(1, 1, 1);
  background: white;
}
// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
<script>
import PositionBox from "components/layout/position_box.vue";
export default {
  components: {
    PositionBox
  }
};
</script>
