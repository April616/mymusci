<template>
  <div id="app">
    <div class="app-player">
      <div>
        <music-header @getlist="handleGetMusicList"></music-header>
      </div>
      <div>
        <music-content
          :song-list="songList"
          @geturl="handleGetSongUrl"
          @getmv="handleGetMvList"
          :tag="sign"
        ></music-content>
      </div>
      <div>
        <music-footer :song-url="songUrl" @changeflg="changeFlg"></music-footer>
      </div>
      <div :class="['mv', { hide: judge }]">
        <div class="video-close" @click="videoClose">x</div>
        <video
          :src="mvUrl"
          controls="controls"
          loop="loop"
          autoplay="autoplay"
        ></video>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import content from "@/components/content.vue";
import footer from "@/components/footer.vue";
// import axios from "axios"
export default {
  name: "App",
  // created:function(){
  //   //this.$http 相当于原本的axios 因为我们在main.js中将axios挂载到了所有vue原型的$http上,使用时就不需要引入模块 更方便
  //   this.$http.get("https://apimusic.linweiqin.com/search?keywords='热门'").then(res=>{console.log(res)})
  // },
  components: {
    "music-header": Header,
    "music-content": content,
    "music-footer": footer,
  },
  data: function() {
    return {
      songList: [],
      songUrl: "",
      mvUrl: "",
      judge: true,
      sign: false,
    };
  },
  methods: {
    handleGetMusicList: function(i) {
      this.songList = i;
      // console.log(this.songList);
    },
    handleGetSongUrl: function(url) {
      this.songUrl = url;
      // console.log(this.songUrl)
    },
    changeFlg: function(i) {
      this.sign = i;
    },
    handleGetMvList: function(url) {
      this.mvUrl = url;
      this.judge = false;
    },
    videoClose: function() {
      this.judge = true;
    },
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "仿宋";
}
html,
body {
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  width: 100%;
  height: 100%;
}
#app {
  background: url(./assets/001.png) no-repeat;
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  --TColor: #154f97;
}
.app-player {
  width: 800px;
  height: 600px;
  border-radius: 10px;
}
.app-player > .hide {
  display: none;
}
.mv {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 1;
  background: url(./assets/002.jpg) no-repeat 100% 100%;
  z-index: 888;
}
video {
  transform: translate(-50%, -50%);
  left: 50%;
  height: 600px;
  width: 800px;
  position: fixed;
  z-index: 999;
  top: 50%;
  border: none;
  /* object-fit: fill; */
  /* background: rgba(255,255,255,0.1); */
  /* background: url(./assets/002.jpg) no-repeat 100% 100%; */
}
.video-close {
  position: fixed;
  color: white;
  top: 10px;
  right: 10px;
  z-index: 1000;
  font-size: 30px;
}
</style>
