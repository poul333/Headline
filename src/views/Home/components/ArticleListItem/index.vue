<template>
    <div class="article_list_item">
      <template v-if="article.cover.type === 0">
        <!-- 没有图片的结构 -->
        <div class="cover_type_0">
          <div class="title">{{ article.title }}</div>
          <div class="footer">
            <div v-if="article.is_top === 1" style="color: red">置顶</div>
            <div>{{ article.aut_name }}</div>
            <div>{{ article.comm_count }}评论</div>
            <div>{{ article.pubdate | rtime }}</div>
          </div>
        </div>
      </template>
  
      <template v-else-if="article.cover.type === 1">
        <!-- 有一张图片的结构 -->
        <div class="cover_type_1">
          <div class="left">
            <div class="title">{{ article.title }}</div>
            <div class="footer">
              <div v-if="article.is_top === 1" style="color: red">置顶</div>
              <div>{{ article.aut_name }}</div>
              <div>{{ article.comm_count }}评论</div>
              <div>{{ article.pubdate | rtime }}</div>
            </div>
          </div>
          <div class="right">
            <van-image fit="cover" width="3rem" height="3rem" :src="article.cover.images[0]" />
          </div>
        </div>
      </template>
  
      <template v-else>
        <!-- 有三张图片的结构 -->
        <div class="cover_type_3">
          <div class="title">{{ article.title }}</div>
          <div class="images">
            <van-image v-for="(v, i) of article.cover.images" :key="i" fit="cover" :src="v" />
          </div>
          <div class="footer">
            <div v-if="article.is_top === 1" style="color: red">置顶</div>
            <div>{{ article.aut_name }}</div>
            <div>{{ article.comm_count }}评论</div>
            <div>{{ article.pubdate | rtime }}</div>
          </div>
        </div>
      </template>
    </div>
  </template>
  
  <script>
  import dayjs from '@/plugins/dayjs'
  
  export default {
    name: 'ArticleListItem',
    props: {
      article: {
        type: Object,
        required: true,
      },
    },
    // 当前组件的局部过滤器
    filters: {
      // // 一个过滤器其实就是一个函数
      // rtime(data) {
      //   // 处理相对时间的过滤器
      //   return dayjs(data).fromNow() // 返回值 会作为 过滤好之后的 输出结果
      // },
      rtime: data => dayjs(data).fromNow(),
    },
  }
  </script>
  
  <style lang="less" scoped>
  .article_list_item {
    padding: 20px;
  
    .cover_type_3 {
      .images {
        display: flex;
        margin-top: 20px;
        gap: 4px; // 这个属性表示 flex 项 之间的间隙，需设置给 flex 容器
        .van-image {
          flex: 1;
        }
      }
    }
  
    .cover_type_1 {
      display: flex;
      .left {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .footer {
          padding-bottom: 10px;
        }
      }
    }
    .cover_type_0,
    .cover_type_1,
    .cover_type_3 {
      .title {
        font-size: 40px;
        color: #333;
      }
      .footer {
        margin-top: 20px;
        font-size: 20px;
        color: #c1c1c1;
        display: flex;
        div {
          height: 32px;
          line-height: 32px;
          // n 从 0 开始，当 n = 0, n + 2 = 2；当 n = 1, n + 2 = 3；当 ...
          // 选中的元素下标从 1 开始
          // n + 2 的意思是从第二个子元素开始往后的所有元素被选中
          &:nth-child(n + 2) {
            margin-left: 20px;
          }
        }
      }
    }
  }
  </style>
  