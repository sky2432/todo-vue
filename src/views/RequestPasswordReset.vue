<template>
  <div id="app">
    <header class="header">
      <h1 class="header-title" @click="$router.push('/')">
        パスワードリセット
      </h1>
    </header>

    <div class="wrapper">
      <div class="container">
        <b-form @submit.prevent="sendMail" novalidate style="">
          <b-icon icon="key" class="key-icon"></b-icon>
          <p class="text">
            パスワードリセット用メールを送信します。<br />パスワードを再設定するアカウントのメールアドレスを入力してください
          </p>
          <b-form-group label-for="email">
            <b-form-input
              id="email"
              type="email"
              placeholder="メールアドレスを入力"
              v-model="email"
              required
            ></b-form-input>
            <div class="error" v-if="this.errorsEmail">
              <p v-for="(error, index) in this.errorsEmail" :key="index">
                {{ error }}
              </p>
            </div>
          </b-form-group>

          <div class="btn-wrap">
            <b-button type="submit" variant="info">送信</b-button>
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import utilRepository from "../repositories/utilRepository";

export default {
  data() {
    return {
      email: "",
      errorsEmail: [],
    };
  },

  methods: {
    async sendMail() {
      const sendData = {
        email: this.email,
      };
      const resData = await utilRepository.sendPasswordResetMail(sendData);
      console.log(resData);
    },
  },
};
</script>

<style scoped>
.container {
  text-align: center;

}

.key-icon {
  width: 120px;
  height: 120px;
}
</style>
