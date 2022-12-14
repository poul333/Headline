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
            :disabled="isLoadingOfCode"
          >
            <template v-if="!sendCode"> 发送验证码 </template>
            <van-count-down v-else @change="handlecountDown" :time="6 * 1000" format=" ss 秒后重发" />
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
import { sendCode } from "@/api/user";
import { Toast } from "vant";
export default {
  name: "LoginPage",
  data() {
    return {
      mobile: "",
      code: "",
      sendCode: false, // 倒计时
      isLoadingOfCode: false,
    };
  },

  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },

    async handleSendCode() {
      await this.$refs.form.validate("mobile");
      this.isLoadingOfCode = true; // 验证码loading开启
      try {
        await sendCode(this.mobile);
        this.sendCode = true; // 开启倒计时
      } catch (error) {
        Toast.fail("发送失败");
      }
      this.isLoadingOfCode = false; // 关闭loading
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
