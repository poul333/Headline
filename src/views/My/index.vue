<template>
  <div class="my-container">
    <div class="header">
      <!-- 未登录 -->
      <div v-if="!$store.state.user.token" class="not_login">
        <img
          class="mobile-img"
          src="~@/assets/mobile.png"
          @click="$router.push('/login')"
        />
        <div class="text">登录 / 注册</div>
      </div>

      <!-- 已登录 -->
      <div v-else class="logined">
        <div class="c1">
          <div class="c1_1">
            <div>
              <van-image
                round
                width="2rem"
                height="2rem"
                :src="userBaseInfo.photo"
              />
            </div>
            <div>{{userBaseInfo.name}}</div>
          </div>
          <div class="c1_2">
            <van-button size="mini" round
              >&nbsp;&nbsp;编辑资料&nbsp;&nbsp;</van-button
            >
          </div>
        </div>
        <div class="c2">
          <div class="c2_1">
            <div>{{userBaseInfo.art_count}}</div>
            <div>头条</div>
          </div>
          <div class="c2_1">
            <div>{{userBaseInfo.fans_count}}</div>
            <div>头条</div>
          </div>
          <div class="c2_1">
            <div>{{userBaseInfo.follow_count}}</div>
            <div>头条</div>
          </div>
          <div class="c2_1">
            <div>{{userBaseInfo.like_count}}</div>
            <div>头条</div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid-nav">
      <!-- 如果一个组件的属性值类型是布尔值，并且默认值为false，那么想要设置为true时，只需要添加属性名即可 -->
      <!-- clickable：开启点击反馈 -->
      <van-grid :column-num="2" clickable>
        <van-grid-item>
          <template #icon>
            <van-icon name="star-o" size="0.8rem" color="#ed7172" />
          </template>
          <template #text>
            <div class="text">收 藏</div>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #icon>
            <van-icon name="underway-o" size="0.8rem" color="#ffa22c" />
          </template>
          <template #text>
            <div class="text">历 史</div>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
    <van-cell title="消息通知" is-link url="" />
    <van-cell title="小智同学" is-link url="" />
    <van-cell
      v-if="$store.state.user.token"
      class="logout-cell"
      title="退出登录"
      center
      @click="logout"
    />
  </div>
</template>

<script>
import { getUserBaseInfo } from "@/api/user.js";
export default {
  name: "MyPage",
  data() {
    return {
      userBaseInfo:{}
    }
  },
  methods: {
    async logout() {
      await this.$dialog.confirm({
        message: "确定要退出吗",
      });
      this.$store.commit("user/changeToken");
      this.$router.push({ name: "login" });
    },
  },
  async created() {
   const res =  await getUserBaseInfo();
    this.userBaseInfo = res.data.data
  },
};
</script>

<style scoped lang="less">
.my-container {
  height: 100vh;
  background-color: #f5f7f9;

  .grid-nav {
    .text {
      font-size: 36px;
    }
  }

  .logout-cell {
    height: 100px;
    text-align: center;
    color: #eb5253;
    margin: 10px 0;
    font-size: 30px;
  }
  // .my-container :first-child
  // :first-child {
  // }

  // .my-container:first-child
  // &:first-child {
  // }

  > .header {
    height: 361px;
    background: url("~@/assets/banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile-img {
      width: 132px;
      height: 132px;
    }
    .text {
      color: white;
      font-size: 32px;
      margin-top: 16px;
    }

    .logined {
      width: 100vw;
      display: flex;
      flex-direction: column;
      .c1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 40px;
        .c1_1 {
          display: flex;
          align-items: center;
          .van-image {
            border: 6px solid white;
            border-radius: 50%;
          }
          > div:last-child {
            color: white;
            font-size: 40px;
            margin-left: 20px;
          }
        }
      }
      .c2 {
        display: flex;
        margin-top: 30px;
        .c2_1 {
          flex: 1;
          display: flex;
          flex-direction: column;
          text-align: center;
          color: white;
          > div:nth-child(1) {
            font-size: 50px;
          }
          > div:nth-child(2) {
            font-size: 30px;
          }
        }
      }
    }
  }
}
</style>
