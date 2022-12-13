<template>
  <div id="app">
    <h1>黑马头条</h1>

    <h2>
      <i class="toutiao toutiao-pinglun"></i>
    </h2>

    <div class="wrapper">

    </div>

    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>

    <van-row>
      <van-col span="8">span: 8</van-col>
      <van-col span="8">span: 8</van-col>
      <van-col span="8">span: 8</van-col>
    </van-row>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang="less">
.wrapper{
  width: 200px;
  height: 200px;
  background-color: #bfa;
}
</style>