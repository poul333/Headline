<template>
  <div class="login-container">
    <van-nav-bar title="登录" />

    <van-form ref="form" @submit="onSubmit">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="手机号"
        label-width="20px"
        :rules="[
          { required: true, message: '请填写用户名' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' },
        ]"
      >
        <template #label>
          <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="验证码"
        label-width="20px"
        :rules="[
          { required: true, message: '请填写密码' },
          { pattern: /^\d{6}$/, message: '验证码错误' },
        ]"
      >
        <template #label>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <template #button>
          <van-button
            size="small"
            type="dedault"
            native-type="button"
            @click="handleSendCode"
            :loading="isLoadingOfCode"
            loading-text="加载中..."
            :disabled="sendCode"
          >
            <template v-if="!sendCode"> 发送验证码 </template>
            <van-count-down
              v-else
              @change="handlecountDown"
              :time="5 * 1000"
              format=" ss 秒后重发"
            />
          </van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { sendCode, login } from "@/api/user";
import { Toast } from "vant";
export default {
  name: "LoginPage",
  data() {
    return {
      mobile: "",
      code: "",
      sendCode: false, // 倒计时
      isLoadingOfCode: false, // loading
    };
  },

  methods: {
    async onSubmit(values) {
      console.log("submit", values);
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true,
        duration: 0, // 0 表示一直展示，不关闭，默认 2000 ms
      });

      try {
        const res = await login(values);
        // localStorage.setItem('token', JSON.stringify(res?.data?.data))  //本地存储tokenx

        this.$store.commit('user/changeToken',res.data.data)
        this.$toast.clear();    // 关闭轻提示
        this.$router.push({ name: "home" });
      } catch (error) {
        this.$toast.fail(error.response.data.message)
      }
    },

    async handleSendCode() {
      await this.$refs.form.validate("mobile");
      this.isLoadingOfCode = true; // 验证码loading开启
      try {
        await sendCode(this.mobile);
      } catch (error) {
        Toast.fail("发送失败");
        return;
      } finally {
        this.isLoadingOfCode = false; // 关闭loading
      }
      this.sendCode = true; // 开启倒计时
    },

    handlecountDown({ seconds }) {
      if (seconds === 0) {
        this.sendCode = false;
      }
    },
  },
};
</script>
<style scoped lang="less">
.login-container {
  height: 100vh;
  background-color: #f6f8f9;

  .van-nav-bar {
    background-color: #1989fa;

    :deep(.van-nav-bar__title) {
      color: #fff;
    }
  }

  i.toutiao {
    font-size: 40px;
  }
}
</style>
