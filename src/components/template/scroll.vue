<template>
  <div class="position-box">
    <scroll :options="options" @pulling-down="onPullingDown" ref="scroll">
      <div class="box">
        <img alt="Vue logo" src="~assets/logo.png">
        <img alt="Vue logo" src="~assets/logo.png">
        <img alt="Vue logo" src="~assets/logo.png">
        <img alt="Vue logo" src="~assets/logo.png">
        <img alt="Vue logo" src="~assets/logo.png">
        <img alt="Vue logo" src="~assets/logo.png">
        <img alt="Vue logo" src="~assets/logo.png">
        <cube-button @click="scrollTo">scrollTo</cube-button>
      </div>
    </scroll>
  </div>
</template>

<script>
import { scroll } from "cube-ui";
export default {
  name: "scrollDemo",
  data() {
    return {
      options: {
        pullDownRefresh: {
          threshold: 60,
          stop: 44,
          stopTime: 1000,
          txt: "Refresh the success"
        },
        tap: true
        // pullUpLoad: true
      }
    };
  },
  props: {},
  filters: {},
  methods: {
    scrollTo() {
      this.$refs.scroll.scrollTo(0, -1000, 1000, "linear");
    },
    onPullingDown() {
      setTimeout(() => {
        //下拉刷新完成
        this.$refs.scroll.forceUpdate();
      }, 2000);
    }
  },
  mounted() {
    this.axios
      .post('/mapi/product-cash-credit/web-list', { start: 0, limit: 50 })
      .then(response => {
          console.log(response,'现金贷列表')
        
      })
      .catch(function(error) {
        console.log(error)
      });
  },
  components: {
    scroll
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.position-box {
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0px;
  overflow-y: auto;
  background-color: white;
  .box {
    background-color: skyblue;
    height: 4000px;
    img {
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
