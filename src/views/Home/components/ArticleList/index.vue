<template>
  <div class="article-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="我是有底线的"
        @load="onLoad"
      >
        <ArticleListItem
          v-for="v of list"
          :key="v.art_id"
          :article="v"
        ></ArticleListItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getActicles } from "@/api/acticle";
import ArticleListItem from "../ArticleListItem";
export default {
  name: "ArticleList",
  props: {
    channel: {
      type: Object, // 对象
      required: true, // 必传
    },
  },
  data() {
    return {
      timestamp: Date.now(),
      error: false, // 是否加载失败，用来控制在底部是否显示错误提示消息
      list: [], // 文章列表数据
      finished: false, // 列表是否加载完成
      loading: false, // 列表是正在加载中，当 van-list 组件触发加载的时候，会自动将 loading 改成 true，并显示转圈圈（加载中... 文案）
      refreshing: false, // 是否正在刷新
    };
  },
  components: {
    ArticleListItem,
  },
  methods: {
    // 列表加载事件，上拉快触底时，会触发该事件，去加载更多
    // 当你加载后，如列表没有铺满整屏，会继续触发 onLoad，直到 finished 变为 true，表示加载完成，才不会继续触发 onLoad
    async onLoad() {
      try {
        const res = await getActicles(this.channel.id, this.timestamp);
        const { results, pre_timestamp } = res.data.data;
        this.list.push(...results);
        this.timestamp = pre_timestamp;
        if (results.length === 0) {
          this.finished = true;
        }
        this.loading = false;
      } catch (error) {
        this.error = true;
        this.loading = false;
      }
    },
    // 下拉刷新后，触发该函数
    onRefresh() {
      this.list = []; // 先清空当前列表
      this.error = false; // 再将错误消息隐藏
      this.finished = false; // 将已完成状态重置为false
      this.loading = true; // 将 van-list 的加载中状态变成 true，两个目的：① 为了占个坑，撑开列表容器的高度，从而可以显示加载中转圈圈效果；② 为了能够在加载完成后（this.loading = false）时，触发 van-list 是否铺满整屏的检查逻辑，因为 van-list 组件会监听 loading 数据的变化，自动检查是否铺满整屏，如果没有，会自动触发下一次的加载事件，如果上一次 loading 是false，那么此时不会触发，因为数据没变，监听不到数据的变化
      this.onLoad().then(() => {
        // 等加载完成后，加刷新改成false
        this.refreshing = false;
      });
    },
  },
};
</script>
