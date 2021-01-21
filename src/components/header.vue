<!--  -->
<template>
  <div class="app-player-header">
    <div class="title">快斗音乐盒</div>
    <input type="text" v-model="inputVal" @keyup.enter.exact="handleSave" />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      inputVal: "",
      oldVal:"",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleSave: function() {
      if (!this.inputVal) {
        alert("您未输入任何内容");
        return;
      }
      if(this.inputVal==this.oleVal){
        alert("请不要频繁搜索")
        return
      }
      this.oleVal=this.inputVal
      this.$http
        .get("search", {
          // 在main.js中配置了axios.create方法 所以https://apimusic.linweiqin.com/search可简写为search
          params: {
            keywords: this.inputVal,
          },
        })
        .then((res) => {
          this.$emit("getlist", res.data.result.songs);
        });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.$http
        .get("search", {
          // 在main.js中配置了axios.create方法 所以https://apimusic.linweiqin.com/search可简写为search
          params: {
            keywords: "热门",
          },
        })
        .then((res) => {
          this.$emit("getlist", res.data.result.songs);
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
.app-player-header {
  height: 60px;
  padding: 5px 10px;
  background-color: var(--TColor);
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    width: 300px;
    height: 30px;
    text-indent: 15px;
    border: none;
    border-radius: 20px;
    background: url(http://linweiqin.cn/musicplayer/imgs/zoom.png) 270px center no-repeat white;
  }
}
.title {
  color: white;
  text-indent: 10px;
  font-size: 18px;
}
</style>
