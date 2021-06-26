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
            <b-button class="mr-4" variant="outline-info" @click="guestLogin"
              ><span v-if="!loading1">ゲストログイン</span
              ><b-spinner variant="primary" small v-if="loading1"></b-spinner
            ></b-button>

            <b-button type="submit" variant="outline-info"
              ><span v-if="!loading2">ログイン</span>
              <b-spinner variant="primary" small v-if="loading2"></b-spinner>
            </b-button>
          </div>
          <div class="text-center mt-4" style="color: #666">
            <p class="mb-0">
              ※ゲストログインでは一部機能が制限されています
            </p>
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
      loading1: false,
      loading2: false,
    };
  },

  methods: {
    async guestLogin() {
      this.loading1 = true;
      const sendData = {
        email: "guest@user.com",
        password: 1234,
      };
      await this.$store.dispatch("login", sendData);
    },

    login() {
      this.loading2 = true;
      const sendData = {
        email: this.email,
        password: this.password,
      };
      utilRepository
        .loginConfirm(sendData)
        .then(() => {
          this.$store.dispatch("login", sendData);
          this.loading2 = false;
        })
        .catch((e) => {
          this.errorsEmail = e.response.data.errors.email;
          this.errorsPassword = e.response.data.errors.password;
          this.loading2 = false;
        });
    },
  },
};
</script>

<style scoped>
.btn-wrap {
  text-align: center;
}
</style>
