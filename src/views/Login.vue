<template>
  <div id="app">
    <header>
      <h1 class="title" @click="$router.push('/')">
        ログインページ
      </h1>
    </header>

    <div class="form">
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
            type="password"
            v-model="password"
            required
          ></b-form-input>
          <div class="error" v-if="this.errorsPassword">
            <p v-for="(error, index) in this.errorsPassword" :key="index">
              {{ error }}
            </p>
          </div>
        </b-form-group>
        <b-form-group>
          <router-link to="/requestPasswordReset">
            パスワードをお忘れですか？
          </router-link>
        </b-form-group>
        <div class="btn-wrap">
          <b-button type="submit" variant="info">ログイン</b-button>
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
        .loginValidate(sendData)
        .then(this.$store.dispatch("login", sendData))
        .catch((e) => {
          this.errorsEmail = e.response.data.errors.email;
          this.errorsPassword = e.response.data.errors.password;
        });
    },
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
}
.btn-wrap {
  text-align: center;
}
</style>
