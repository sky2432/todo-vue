<template>
  <div id="app">
    <header class="header">
      <h1 class="header-title" @click="$router.push('/')">
        ログインページ
      </h1>
    </header>

    <div class="wrapper">
      <div class="container">
        <b-form @submit.prevent="login" novalidate>
          <b-form-group label="メールアドレス" label-for="email">
            <b-form-input
              id="email"
              type="email"
              v-model="email"
              required
            ></b-form-input>
            <div class="error" v-if="this.errorsEmail">
              <p v-for="(error, index) in this.errorsEmail" :key="index">
                {{ error }}
              </p>
            </div>
          </b-form-group>
          <b-form-group label="パスワード" label-for="password">
            <b-form-input
              id="password"
              v-model="password"
              type="password"
            ></b-form-input>

            <div class="error" v-if="this.errorsPassword">
              <p v-for="(error, index) in this.errorsPassword" :key="index">
                {{ error }}
              </p>
            </div>
          </b-form-group>
          <div class="btn-wrap">
            <b-button type="submit" variant="outline-info">ログイン</b-button>
            <b-button class="ml-4" variant="outline-info" @click="guestLogin"
              >ゲストログイン</b-button
            >
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
      password: "",
      errorsEmail: [],
      errorsPassword: [],
    };
  },

  methods: {
    login() {
      const sendData = {
        email: this.email,
        password: this.password,
      };
      utilRepository
        .loginConfirm(sendData)
        .then(() => {
          this.$store.dispatch("login", sendData);
        })
        .catch((e) => {
          this.errorsEmail = e.response.data.errors.email;
          this.errorsPassword = e.response.data.errors.password;
        });
    },

    guestLogin() {
      const sendData = {
        email: "guest@guest.com",
        password: 1234,
      };
      this.$store.dispatch("login", sendData);
    },
  },
};
</script>

<style scoped>
.btn-wrap {
  text-align: center;
}
</style>
