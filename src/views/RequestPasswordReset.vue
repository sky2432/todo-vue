<template>
  <div id="app">
    <header>
      <h1 class="title" @click="$router.push('/')">
        パスワードリセット
      </h1>
    </header>

    <div class="form">
      <b-form @submit.prevent="sendMail" novalidate style="">
        <b-icon icon="key" class="key-icon"></b-icon>
          <p class="text">パスワードリセット用メールを送信します。<br>パスワードを再設定するアカウントのメールアドレスを入力してください</p>
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
      }
      const resData = await utilRepository.sendPasswordResetMail(sendData);
      console.log(resData);
    }
  },
};
</script>

<style scoped>
header {
  height: 70px;
  background-color: #16a2b8;
}
.title {
  line-height: 70px;
  text-align: center;
  color: white;
  cursor: pointer;
}
.form {
  width: 50%;
  margin: 0 auto;
  background-color: #dbdbdb;
  margin-top: 100px;
  padding: 20px;
  text-align: center
}

.key-icon {
  width: 120px; 
  height: 120px;
}
</style>
