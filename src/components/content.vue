<!--  -->
<template>
  <div class="app-player-content">
    <div class="player-content-left">
      <div class="content-left-songList">
        <div
          v-for="item in songList"
          :key="item.id"
          class="songlist-item"
          @click="getSong(item.id)"
        >
          <div class="audio"></div>
          <div class="title">{{ item.name }}</div>
          <div
            :class="['play-mv', { hidden: item.mvid === 0 ? true : false }]"
            @click.stop="getMv(item.mvid)"
          ></div>
        </div>
      </div>
    </div>
    <div class="player-content-mid">
      <img src="../assets/003.png" :class="['play-bar', { playing: tag }]" />
      <img :src="pic" class="cover" />
      <img
        src="http://linweiqin.cn/musicplayer/imgs/disc.png"
        :class="['disc', { autorotate: tag }]"
      />
    </div>
    <div class="player-content-right">
      <h3>热门留言</h3>
      <div class="comment">
        <div class="comment-item" v-for="item in res" :key="item.id">
          <div class="images">
            <img :src="item.user.avatarUrl" />
          </div>
          <div class="comment-body">
            <h4>{{ item.user.nickname }}</h4>
            <p>{{ item.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  props: {
    songList: {
      type: Array,
      default: function() {
        return [];
      },
    },
    tag: {
      type: Boolean,
      default: false,
    },
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      pic: "",
      res: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getSong: function(id) {
      this.$http
        .get("song/url", {
          params: {
            id: id,
          },
        })
        .then((res) => {
          this.$emit("geturl", res.data.data[0].url);
        });
      this.$http
        .get("song/detail", {
          params: {
            ids: id,
          },
        })
        .then((res) => {
          this.pic = res.data.songs[0].al.picUrl;
        });
      this.$http
        .get("comment/hot?type=0", {
          params: {
            id: id,
          },
        })
        .then((res) => {
          this.res = res.data.hotComments;
        });
    },
    getMv: function(id) {
      this.$http.get("mv/url", { params: { id: id } }).then((res) => {
        this.$emit("getmv", res.data.data.url);
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.$http
      .get("song/url", {
        params: {
          id: 468513829,
        },
      })
      .then((res) => {
        this.$emit("geturl", res.data.data[0].url);
      });
    this.$http
      .get("song/detail", {
        params: {
          ids: 468513829,
        },
      })
      .then((res) => {
        this.pic = res.data.songs[0].al.picUrl;
      });
    this.$http
      .get("comment/hot?type=0", {
        params: {
          id: 468513829,
        },
      })
      .then((res) => {
        this.res = res.data.hotComments;
      });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.app-player-content {
  height: 480px;
  border-bottom: 1px dashed var(--TColor);
  display: flex;
  background: rgba(255, 255, 255, 0.5);
  .player-content-left {
    width: 200px;
    border-right: 1px solid var(--TColor);
    height: 480px;
    .content-left-songList {
      overflow-y: scroll;
      overflow-x: hidden;
      height: 100%;
      .songlist-item {
        border-radius: 5px;
        padding: 10px;
        height: 40px;
        line-height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:nth-child(odd) {
          background-color: rgba(224, 217, 217, 0.5);
        }
        .audio {
          background: url(http://linweiqin.cn/musicplayer/imgs/table.png) -18px -18px;
          width: 25px;
          height: 25px;
        }
        .title {
          height: 30px;
          width: 150px;
          font-size: 16px;
          color: #f8f1f1;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
          line-height: 30px;
        }
        .play-mv {
          width: 30px;
          height: 20px;
          background: url(http://linweiqin.cn/musicplayer/imgs/table.png) left -45px;
        }
        .hidden {
          display: none;
        }
      }
    }
  }
  .player-content-mid {
    width: 400px;
    border-right: 1px dotted var(--themeColor);
    position: relative;
    .play-bar {
      left: 200px;
      position: absolute;
      z-index: 8;
      transform: rotate(-25deg);
      transform-origin: 12px 12px;
      transition: all 2s;
    }
    .playing {
      transform: rotate(0);
    }
    .disc {
      position: absolute;
      left: 100px;
      top: 100px;
    }
    .autorotate {
      animation: move 5s linear 0s infinite;
    }
    .cover {
      top: 156px;
      left: 156px;
      position: absolute;
      width: 150px;
      height: 150px;
    }
  }
  .player-content-right {
    width: 200px;
  }
  h3 {
    font-weight: 500;
    padding: 5px;
    height: 30px;
    // font-size: 20px;
    color: rgb(49, 45, 49);
  }
  .comment {
    height: 450px;
    overflow-y: scroll;
    overflow-x: hidden;
    .comment-item {
      padding: 5px;
      display: flex;
      align-items: flex-start;
      .images {
        padding: 5px;
        img {
          height: 30px;
          width: 30px;
          border-radius: 50%;
        }
      }
      .comment-body {
        h4 {
          font-size: 16px;
        }
        p {
          color: rgb(155, 23, 23);
          font-weight: 100;
          font-size: 14px;
        }
      }
    }
  }
}
@keyframes move {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
