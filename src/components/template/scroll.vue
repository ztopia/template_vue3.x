<template>
  <div class="index">
    <scroll
      :data='creditList'
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp"
      ref="scroll"
    >
      <div class="box">
        <div class="top">
          <div class="input-wrap">
            <div class="search">
              <i class="fa fa-bars" aria-hidden="true" v-if="searchVal==''"></i>
              <i
                class="fa fa-arrow-left"
                aria-hidden="true"
                v-if="searchVal!=''"
                @click="searchVal=''"
              ></i>
              <i class="fa fa-times" aria-hidden="true" v-if="searchVal!=''" @click="searchVal=''"></i>
              <input type="text" placeholder="GPlay" v-model="searchVal">
            </div>
          </div>
        </div>
        <div class="list" v-if="searchVal==''">
          <div class="list-item" v-for="(item,n) in creditList" :key="n">
            <div class="list-item-head">
              <div class="head-left">
                <img class="head-left-img" :src="item.icon" alt>
              </div>
              <div class="head-right">
                <div class="title">{{item.product_name}}</div>
                <div class="price">Rp {{item.price_new}}</div>

                <div class="tip">Bisa dicicil dalam 1 Minggu</div>
              </div>
            </div>
            <div class="list-item-foot">
              <div class="btn-1">
                <a
                  :href="item.off_line_status==1?item.off_line_url:item.jump_url"
                  @click="download(item)"
                >PINJAM</a>
              </div>
              <div class="btn-2">
                <a
                  :href="item.off_line_status==1?item.off_line_url:item.jump_url"
                  @click="download(item)"
                >INSTALL</a>
              </div>
            </div>
          </div>
        </div>
        <div class="search-list" v-else>
          <div class="list-item-search" v-for="(item,n) in creditList" :key="n">
            <div class="list-item-head-search">
              <div class="head-left-search">
                <img class="head-left-img-search" :src="item.icon" alt>
              </div>
              <div class="head-right-search">
                <div class="title-search">{{item.product_name}}</div>
                <div class="price-search">Rp {{item.price_new}}</div>
                <div class="tip-search">Bisa dicicil dalam 1 Minggu</div>
                <div class="btn-1-search">
                  <a
                    :href="item.off_line_status==1?item.off_line_url:item.jump_url"
                    @click="download(item)"
                  >INSTALL</a>
                </div>
              </div>
            </div>
          </div>
        </div>
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
        tap: true,
        pullUpLoad: true
      },
      creditList: [],
      searchVal: "",
      start: 0
    };
  },
  props: {},
  filters: {},
  methods: {
    onPullingDown() {
      this.start = 0;
      this._getList("refresh");
    },
    onPullingUp() {
      this.start += 10;
      this._getList("more");
    },
    _getList(refresh) {
      this.axios
        .post("/product-cash-credit/web-list", {
          start: this.start,
          limit: 10
        })
        .then(response => {
          if (refresh == "refresh") {
            this.creditList = response;
            // this.$refs.scroll.forceUpdate();
          } else {
            this.creditList = this.creditList.concat(response);
             console.log(this.creditList);
            // this.options.pullUpLoad = false;
          }
         
        });
    },
    download(item) {
      this.$router.push({
        name: "new_detail",
        params: { icon: item.icon, name: item.product_name }
      });

      fbq("track", "AddToCart");
    }
  },
  mounted() {
    this._getList("refresh");
  },
  components: {
    scroll
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/deep/ .cube-pulldown-wrapper {
  canvas {
    width: 50px !important;
    height: 30px !important;
    margin-top: 10px !important;
  }
}

/deep/.cube-pulldown-loaded {
  margin-top: 10px !important;
  // font-size: 12px !important;
}
a {
  color: #0e9f5b;
  display: block;
  width: 100%;
  height: 100%;
}
.index {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .box {
    background-color: #f1eeef;
    // height: 100%;
    overflow: hidden;
    .top {
      width: 100%;
      height: 215px;
      background-color: #006d4b;
      overflow: hidden;
      .input-wrap {
        width: 100%;
        height: 155px;
        margin-top: 60px;
        background-color: #01895e;
        overflow: hidden;
        position: relative;
        .search {
          display: block;
          margin: 0 auto;
          width: 95%;
          border-radius: 5px;
          height: 118px;
          border: 0;
          margin-top: 20px;
          background-color: white;
          input {
            display: block;
            width: 590px;
            height: 100%;
            border: 0;
            outline: none;
            padding: 0 135px;
            font-size: 45px;
          }
        }
      }
    }
    .list {
      width: 100%;
      .list-item {
        width: 860px;
        height: 490px;
        margin: 15px auto;
        box-shadow: 0px 0px 2px 2px #dedddd;
        border-radius: 8px;
        background-color: #fff;
        /* padding:50px; */
        .list-item-head {
          width: 100%;
          height: 360px;
          .head-left {
            height: 100%;
            width: 240px;
            float: left;
            .head-left-img {
              display: block;
              margin: 40px auto;
              width: 135px;
            }
          }
          .head-right {
            height: 100%;
            width: 620px;
            float: left;
            text-align: left;
            .title {
              font-size: 45px;
              font-weight: bold;
              margin-top: 40px;
            }
            .price {
              font-weight: bolder;
              font-size: 50px;
              margin-top: 65px;
            }
            .tip {
              color: #129564;
              margin-top: 20px;
              font-size: 30px;
            }
          }
        }
        .list-item-foot {
          width: 100%;
          height: 70px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          font-size: 40px;
          .btn-1 {
            border: 5px solid #0e9f5b;
            border-radius: 15px;
            color: #0e9f5b;
            width: 390px;
            height: 80px;
            line-height: 80px;
            text-align: center;
          }
          .btn-2 {
            border: 5px solid #0e9f5b;
            background-color: #0e9f5b;
            color: white;
            width: 390px;
            height: 80px;
            line-height: 80px;
            text-align: center;
            border-radius: 15px;
            a {
              color: white;
            }
          }
        }
      }
    }
    /* search */
    .search-list {
      width: 100%;
      .list-item-search {
        width: 860px;
        height: 255px;
        margin: 15px auto;
        box-shadow: 0px 0px 1px 1px #dedddd;
        border-radius: 8px;
        background-color: #fff;
        /* padding:50px; */
        .list-item-head-search {
          width: 100%;
          height: 255px;
          .head-left-search {
            height: 100%;
            width: 160px;
            float: left;
          }
          .head-left-img-search {
            display: block;
            margin: 45px auto;
            width: 95px;
          }
          .head-right-search {
            height: 100%;
            width: 700px;
            float: left;
            text-align: left;
            position: relative;
            .title-search {
              font-size: 35px;
              font-weight: bold;
              margin-top: 45px;
            }
            .price-search {
              font-weight: bolder;
              font-size: 40px;
              margin-top: 50px;
            }
            .tip-search {
              color: #129564;
              font-size: 25px;
              margin-top: 20px;
            }
            .btn-1-search {
              border: 5px solid #0e9f5b;
              border-radius: 10px;
              color: #0e9f5b;
              width: 218px;
              height: 60px;
              line-height: 60px;
              text-align: center;
              position: absolute;
              font-size: 40px;
              right: 20px;
              bottom: 35px;
            }
          }
        }
      }
    }
  }
}

.fa {
  position: absolute;
  font-size: 50px;
  color: #676767;
  font-weight: 100;
}
.fa-bars {
  top: 52px;
  left: 80px;
}
.fa-arrow-left {
  top: 52px;
  left: 80px;
}
.fa-times {
  top: 52px;
  right: 80px;
}
</style>
