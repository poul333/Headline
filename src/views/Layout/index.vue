<template>
  <div>
    <router-view></router-view>

    <van-tabbar v-model="active" route>
      <van-tabbar-item push :to="{name:'home'}" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item push :to="{name:'qa'}" icon="chat-o">问答</van-tabbar-item>
      <van-tabbar-item push :to="{name:'video'}" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item push :to="{name:'my'}" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {
        active:0
    }
  },
};
</script>

<style scoped></style>
